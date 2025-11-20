import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactSubmissions } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    await db.insert(contactSubmissions).values({
      name,
      email,
      phone: phone || null,
      message,
      status: 'pending',
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

