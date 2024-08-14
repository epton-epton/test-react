import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-3B',
      { inputs: message },
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching response from model:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
