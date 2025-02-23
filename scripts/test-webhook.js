// Test webhook URL
const url = 'https://aiko.app.n8n.cloud/webhook-test/08ec5b13-e887-42ed-9aa7-a72b6b2f9c58';

// User profile - Edit these values to test different scenarios
const userProfile = {
  // Basic Info
  name: 'Henry',
  email: 'henry@techstartup.co',
  id: 'bdc76c93-74f1-4647-8783-d3e01f44a8dd',

  // Professional Info
  company: 'TechStartup Inc.',
  role: 'Founder & CEO',
  industry: 'Software Development',
  companySize: '10-50',
  department: 'Executive',

  // Location
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',

  // Business Context
  interests: [
    'AI/ML',
    'Startup Growth', 
    'Tech Innovation',
    'Risk Management'
  ],
  expertise: [
    'Software Development',
    'Product Strategy',
    'Team Leadership'
  ],
  businessGoals: [
    'Scale Operations',
    'Enhance Security',
    'Optimize Insurance Coverage'
  ],

  // Preferences
  preferences: {
    communicationStyle: 'direct',
    riskTolerance: 'moderate',
    primaryConcerns: [
      'cyber security',
      'professional liability',
      'business interruption'
    ],
    notificationPreferences: 'email'
  }
};

// Chat context - Edit this to guide the AI's behavior
const context = `You are Aika, an AI insurance assistant. Personalize your responses based on the user's profile:
- Address ${userProfile.name} by name and reference their role as ${userProfile.role} at ${userProfile.company}
- Consider their industry (${userProfile.industry}) and company size (${userProfile.companySize})
- Focus on their primary concerns: ${userProfile.preferences.primaryConcerns.join(', ')}
- Match their ${userProfile.preferences.communicationStyle} communication style
- Reference their business goals when relevant
- Use their timezone (${userProfile.timezone}) for any time-sensitive information

Be friendly, professional, and concise.`;

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
        context: context,
        history: [{
          role: 'assistant',
          content: `Hi ${userProfile.name}! I'm Aika, your AI insurance assistant. I understand you're the ${userProfile.role} at ${userProfile.company}. I'd be happy to help you understand insurance, particularly focusing on your interests in ${userProfile.preferences.primaryConcerns.join(', ')}. How can I assist you today?`
        }],
        sessionId: `user-${userProfile.id}-${Date.now()}`,
        user: userProfile
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
