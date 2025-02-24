import { NextResponse } from 'next/server';
import { requireSession, extractUserInfo } from '@/lib/session';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST() {
  try {
    // Verify user session
    const session = await requireSession();
    const userInfo = extractUserInfo(session);

    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('Discord webhook URL not configured');
    }

    // Send to Discord with verified user info
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🚀 New Investment Interest!\n**Name:** ${userInfo.name || 'Not provided'}\n**Email:** ${userInfo.email}\n**Company:** ${userInfo.company || 'Not provided'}\n**Role:** ${userInfo.role || 'Not provided'}\n**Time:** ${new Date().toISOString()}`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to notify:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
