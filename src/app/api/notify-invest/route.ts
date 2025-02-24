import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('Discord webhook URL not configured');
    }

    // Send to Discord
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🚀 New Investment Interest!\n**Name:** ${name}\n**Email:** ${email}\n**Time:** ${new Date().toISOString()}`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to notify:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
