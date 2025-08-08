import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.N8N_WEBHOOK_BOOKING || 'https://jakejames.app.n8n.cloud/webhook/tesseract-booking-new';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Booking creation request received:', {
      meetingType: body.meetingType,
      email: body.contactInfo?.email,
      date: body.selectedDate,
      time: body.selectedTime
    });
    
    // Forward the request to n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('n8n response status:', response.status);
    
    // Get response text first to see what we're dealing with
    const responseText = await response.text();
    console.log('n8n response text:', responseText);

    // Check if the response is ok
    if (!response.ok) {
      console.error('n8n webhook error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: 'Failed to create booking' },
        { status: response.status }
      );
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : { success: true };
    } catch (e) {
      console.log('Could not parse n8n response as JSON, treating as success');
      data = { success: true, message: 'Booking created successfully' };
    }

    // Always return success if we got this far
    return NextResponse.json({ ...data, success: true });
  } catch (error) {
    console.error('Error in booking creation:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Enable CORS for this route
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}