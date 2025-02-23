import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const { input, history, context, sessionId } = await request.json();
    console.log('Received payload:', { input, history, context, sessionId });

    const payload = {
      input,
      history,
      context,
      sessionId
    };

    console.log('Sending request to n8n:', {
      url: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
      payload
    });
    
    const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    console.log('N8N response status:', response.status);
    const responseText = await response.text();
    console.log('N8N response body:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to get response from n8n: ${response.status} ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      throw new Error('Invalid JSON response from n8n');
    }

    // Check if we have a valid response from n8n
    if (!data?.output) {
      console.error('No output received from n8n');
      return NextResponse.json({ output: '', suggestions: [] });
    }

    // Process the response to extract and format suggestions
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    let suggestionData;
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Generate 1-3 follow-up questions an investor might ask about this response, prioritizing the most important questions. Return ONLY a JSON array with objects containing "label" (concise button text) and "value" (complete question). Example format: [{"label":"How does your IoT technology work?","value":"Can you explain how your IoT devices collect and process data in real-time?"}]. 

Requirements:
- Return only the 1-3 most important questions
- Focus on business value and investor perspective ("your" not "our")
- Do not use abbreviations (e.g. use "management" not "mgmt")
- Keep labels clear but concise

Response to analyze: "${data.output}"`
        }],
        system: 'You are an AI that generates follow-up questions for investors. ONLY output a valid JSON array - no other text. Each object must have "label" (short button text, no abbreviations) and "value" (complete question) properties.'
      });
      suggestionData = response;
    } catch (error) {
      console.error('Failed to get suggestions from Anthropic:', error);
      return NextResponse.json({
        output: data.output,
        suggestions: []
      });
    }
    let suggestions = [];
    
    try {
      // Extract text content from Anthropic response
      const text = suggestionData.content[0].text;
      
      // Parse the response as JSON
      suggestions = JSON.parse(text);
      
      // Validate and clean up suggestions
      if (Array.isArray(suggestions)) {
        suggestions = suggestions
          .filter(s => 
            s.label && 
            s.value && 
            typeof s.label === 'string' && 
            typeof s.value === 'string'
          )
          .map(s => ({
            label: s.label.slice(0, 35), // Ensure label is not too long
            value: s.value
          }));
      }
    } catch (e) {
      console.error('Failed to process suggestions:', e);
      console.error('Anthropic response:', suggestionData);
    }

    return NextResponse.json({
      output: data.output,
      suggestions
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
}
