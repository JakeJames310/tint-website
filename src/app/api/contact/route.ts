import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import React from 'react';
import { ContactFormEmail } from '../../../../emails/ContactFormEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Simple in-memory email queue
const emailQueue: Array<{ data: ContactFormData; sanitizedData: ContactFormData; ip: string; submittedAt: string }> = [];
let isProcessingQueue = false;

async function processEmailQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  while (emailQueue.length > 0) {
    const { sanitizedData, ip, submittedAt } = emailQueue.shift()!;
    try {
      const emailHtml = await renderEmailTemplate(sanitizedData, ip, submittedAt);
      const result = await resend.emails.send({
        from: 'noreply@tesseractintegrations.com',
        to: ['info@tesseractintegrations.com'],
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: emailHtml,
      });
      if (result.error) {
        console.error('Resend API error:', result.error);
      } else {
        console.log('✅ Email sent via Resend:', result);
      }
    } catch (error) {
      console.error('Email queue processing error:', error);
    }
  }
  isProcessingQueue = false;
}

async function renderEmailTemplate(data: ContactFormData, ip: string, submittedAt: string) {
  // Render the React email template to HTML
  const { renderToStaticMarkup } = await import('react-dom/server');
  return renderToStaticMarkup(
    React.createElement(ContactFormEmail, {
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      submittedAt,
      ip,
    })
  );
}

// Email sending function (now queues email)
async function sendEmail(data: ContactFormData, ip: string): Promise<boolean> {
  try {
    const submittedAt = new Date().toLocaleString();
    // Queue the email for sending
    emailQueue.push({ data, sanitizedData: data, ip, submittedAt });
    processEmailQueue();
    return true;
  } catch (error) {
    console.error('Email queueing error:', error);
    return false;
  }
}

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }
    // Parse request body
    const body = await request.json();
    // Validate input data
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }
    const formData = validationResult.data;
    // Sanitize data (basic XSS protection)
    const sanitizedData = {
      name: formData.name.replace(/[<>]/g, ''),
      email: formData.email.toLowerCase().trim(),
      company: formData.company.replace(/[<>]/g, ''),
      message: formData.message.replace(/[<>]/g, ''),
    };
    // Send email (now queues email)
    const emailSent = await sendEmail(sanitizedData, ip);
    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to queue email. Please try again later.' 
        },
        { status: 500 }
      );
    }
    // Log successful submission
    console.log(`✅ Contact form submitted by ${sanitizedData.name} (${sanitizedData.email}) from ${sanitizedData.company}`);
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit the contact form.' 
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit the contact form.' 
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit the contact form.' 
    },
    { status: 405 }
  );
}
