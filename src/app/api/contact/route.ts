import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Email template function
function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Tesseract Integrations</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #25FC11, #0C8102); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #25FC11; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #25FC11; }
        .footer { margin-top: 20px; padding: 15px; background: #eee; border-radius: 5px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Contact Form Submission</h1>
          <p>Tesseract Integrations - AI Transformation Inquiry</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">${data.email}</div>
          </div>
          
          <div class="field">
            <div class="label">🏢 Company:</div>
            <div class="value">${data.company}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Submission Details:</strong></p>
          <p>📅 Date: ${new Date().toLocaleString()}</p>
          <p>🌐 IP Address: ${process.env.NODE_ENV === 'production' ? '[Protected]' : '127.0.0.1'}</p>
          <p>🔗 Source: Tesseract Integrations Website Contact Form</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email sending function
async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    // For now, just log the submission (development mode)
    console.log('📧 Contact Form Submission:');
    console.log('Name:', data.name);
    console.log('Email:', data.email);
    console.log('Company:', data.company);
    console.log('Message:', data.message);
    console.log('HTML Email:', generateEmailHTML(data));
    
    // TODO: Implement actual email sending
    // You can add Resend, Nodemailer, or any other email service here
    
    return true;
    
  } catch (error) {
    console.error('Email sending error:', error);
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
    
    // Send email
    const emailSent = await sendEmail(sanitizedData);
    
    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email. Please try again later.' 
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
