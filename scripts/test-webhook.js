const url = 'https://aiko.app.n8n.cloud/webhook-test/08ec5b13-e887-42ed-9aa7-a72b6b2f9c58';

async function testWebhook() {
  try {
    console.log('Testing webhook...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '176.34.33.16',
        'x-forwarded-host': 'aiko.app.n8n.cloud',
        'x-forwarded-port': '443',
        'x-forwarded-proto': 'https',
        'x-forwarded-server': 'localhost',
      },
      body: JSON.stringify({
        input: 'Hello Aika, can you help me understand how insurance works?',
        context: "You are Aika, an AI insurance assistant. You help users understand insurance products and provide guidance on insurance-related matters. Be friendly, professional, and concise.",
        history: [{
          role: 'assistant',
          content: "Hi! I'm Aika, your AI insurance assistant. How can I help you today?"
        }],
        sessionId: 'user-test123-' + Date.now()
      }),
    });

    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response body:', text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testWebhook();
