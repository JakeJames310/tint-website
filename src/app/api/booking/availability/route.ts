import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.N8N_WEBHOOK_AVAILABILITY || 'https://jakejames.app.n8n.cloud/webhook/tesseract-check-availability';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Availability check request received:', {
      date: body.date,
      meetingType: body.meetingType,
      timezone: body.timezone
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

    console.log('n8n availability response status:', response.status);
    
    // Get response text first
    const responseText = await response.text();
    console.log('n8n availability response:', responseText);

    // Default availability slots
    const dateKey = body.date?.split('T')[0] || new Date().toISOString().split('T')[0];
    const defaultSlots = {
      success: true,
      slots: {
        [dateKey]: [
          { time: '9:00 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '2:00 PM', available: true },
          { time: '3:00 PM', available: true },
          { time: '4:00 PM', available: true }
        ]
      }
    };

    // Check if the response is ok
    if (!response.ok) {
      console.error('n8n webhook error, using default slots');
      return NextResponse.json(defaultSlots);
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : defaultSlots;
      // Ensure the response has the expected structure
      if (!data.slots) {
        console.log('n8n response missing slots, using defaults');
        data = defaultSlots;
      }
    } catch (e) {
      console.log('Could not parse n8n response, using default slots');
      data = defaultSlots;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error checking availability:', error);
    // Return simulated availability on error
    const dateKey = new Date().toISOString().split('T')[0];
    return NextResponse.json({
      success: true,
      slots: {
        [dateKey]: [
          { time: '9:00 AM', available: true },
          { time: '10:00 AM', available: true },
          { time: '11:00 AM', available: true },
          { time: '2:00 PM', available: true },
          { time: '3:00 PM', available: true },
          { time: '4:00 PM', available: true }
        ]
      }
    });
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