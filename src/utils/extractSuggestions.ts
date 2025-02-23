type Topic = {
  label: string;  // User-friendly label
  value: string;  // Full query to send
};

export function extractSuggestions(content: string): Topic[] {
  // Common topics we want to identify
  const topics = {
    technology: ['technology', 'IoT', 'data', 'devices', 'app', 'platform', 'software', 'automation'],
    riskManagement: ['risk', 'management', 'assessment', 'analysis', 'monitoring', 'prevention'],
    insurance: ['insurance', 'coverage', 'policy', 'premium', 'claims', 'underwriting'],
    business: ['business model', 'market', 'strategy', 'growth', 'revenue', 'pricing'],
    compliance: ['compliance', 'regulatory', 'regulations', 'legal', 'requirements'],
  };

  // Initialize suggestions
  const suggestions: Topic[] = [];

  // Check for explicit questions or options in the message
  const questionMatch = content.match(/would you like to (know|learn|hear) more about ([^?]+)\??/i);
  if (questionMatch) {
    const topic = questionMatch[2].trim();
    suggestions.push({
      label: `Tell me more about ${topic}`,
      value: `Please explain more about ${topic}`,
    });
  }

  // Look for bullet points and convert them to better suggestions
  const bulletPoints = content.match(/[-•]\s*([^\n]+)/g);
  if (bulletPoints) {
    bulletPoints.forEach(point => {
      const cleanPoint = point.replace(/[-•]\s*/, '').trim();
      
      // Convert long points into concise buttons
      if (cleanPoint.length > 50) {
        // Find the main topic
        const topic = Object.entries(topics).find(([_, keywords]) =>
          keywords.some(keyword => cleanPoint.toLowerCase().includes(keyword.toLowerCase()))
        );

        if (topic) {
          suggestions.push({
            label: `Learn about our ${topic[0].replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`,
            value: `Tell me more about your ${topic[0].replace(/([A-Z])/g, ' $1').toLowerCase().trim()} approach`,
          });
        }
      } else {
        suggestions.push({
          label: cleanPoint,
          value: `Tell me more about ${cleanPoint}`,
        });
      }
    });
  }

  // Add contextual suggestions based on keywords
  Object.entries(topics).forEach(([topic, keywords]) => {
    if (keywords.some(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    ) && !suggestions.some(s => s.label.toLowerCase().includes(topic.toLowerCase()))) {
      suggestions.push({
        label: `Tell me about your ${topic.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}`,
        value: `Can you explain your approach to ${topic.replace(/([A-Z])/g, ' $1').toLowerCase().trim()}?`,
      });
    }
  });

  // Deduplicate and limit suggestions
  return Array.from(new Set(suggestions.map(s => JSON.stringify(s))))
    .map(s => JSON.parse(s))
    .slice(0, 4); // Limit to 4 suggestions to avoid cluttering
}
