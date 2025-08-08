import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.N8N_WEBHOOK_FOLLOWUP || 'https://jakejames.app.n8n.cloud/webhook/tesseract-followup-sequence';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the response is ok
    if (!response.ok) {
      console.error('n8n followup webhook error:', response.status, response.statusText);
      // Don't fail the booking if followup fails
      return NextResponse.json({ success: true, message: 'Followup queued' });
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch {
      // If n8n doesn't return JSON, create a success response
      data = { success: true, message: 'Followup sequence initiated' };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in followup sequence:', error);
    // Don't fail the booking if followup fails
    return NextResponse.json({ success: true, message: 'Followup queued' });
  }
}

// Enable CORS for this route
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}