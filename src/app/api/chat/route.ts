import { NextRequest, NextResponse } from 'next/server';

// Types for request/response
interface ChatRequest {
  message: string;
  conversationId?: string;
  userId?: string;
}

interface ChatResponse {
  reply: string;
  conversationId: string;
  metadata?: Record<string, unknown>;
}

// Get webhook URL from environment variable
const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  console.log('Chat API called');
  
  try {
    // Validate webhook URL is configured
    if (!WEBHOOK_URL) {
      console.error('N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }
    
    console.log('Webhook URL:', WEBHOOK_URL);

    // Parse request body
    const body: ChatRequest = await request.json();

    // Validate message
    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Prepare webhook payload
    const webhookPayload = {
      message: body.message.trim(),
      conversationId: body.conversationId || generateConversationId(),
      userId: body.userId || 'anonymous',
      timestamp: new Date().toISOString(),
      source: 'website-chatbot'
    };

    // Call n8n webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
      // Set timeout to prevent hanging
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    // Check if webhook call was successful
    if (!webhookResponse.ok) {
      console.error('Webhook error:', webhookResponse.status, webhookResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to process message' },
        { status: 502 }
      );
    }

    // Parse webhook response
    const webhookData = await webhookResponse.json();

    // Prepare response
    const response: ChatResponse = {
      reply: webhookData.reply || webhookData.message || 'I received your message but could not generate a response.',
      conversationId: webhookPayload.conversationId,
      metadata: webhookData.metadata
    };

    return NextResponse.json(response, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle timeout specifically
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred processing your message' },
      { status: 500 }
    );
  }
}

// Helper function to generate conversation ID
function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}