'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { SuggestionButtons } from './SuggestionButtons';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  suggestions?: Suggestion[];
}


interface Suggestion {
  label: string;
  value: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  
  useEffect(() => {
    console.log('Auth status:', loading ? 'loading' : 'ready');
    console.log('User data:', user);
  }, [user, loading]);
  const sessionIdRef = useRef<string>(`user-${user?.id || 'anonymous'}-${Date.now()}`);
  
  // Update sessionId when user changes
  useEffect(() => {
    if (user?.id) {
      sessionIdRef.current = `user-${user.id}-${Date.now()}`;
    }
  }, [user]);

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: messageContent.trim(),
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    // Scroll after a brief delay to ensure message is rendered
    setTimeout(scrollToLastMessage, 50);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: userMessage.content,
          context: undefined,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          sessionId: sessionIdRef.current,
          user: user ? {
            name: user.firstName,
            email: user.email,
            id: user.id
          } : {
            name: 'Guest',
            email: null,
            id: null
          }
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: data.output || 'I apologize, but I encountered an error processing your request.',
        role: 'assistant',
        timestamp: Date.now(),
        suggestions: data.suggestions || []
      };

      setMessages(prev => [...prev, aiMessage]);
      // Scroll after AI message with a longer delay for suggestions
      setTimeout(scrollToLastMessage, 100);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: 'I apologize, but I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const scrollToLastMessage = () => {
    setTimeout(() => {
      if (!chatContainerRef.current) return;
      
      // Find the last message element
      const messages = chatContainerRef.current.children;
      const lastMessage = messages[messages.length - 2]; // -2 because last child is the dummy div
      
      if (lastMessage) {
        // Get the position of the last message relative to the container
        const containerRect = chatContainerRef.current.getBoundingClientRect();
        const messageRect = lastMessage.getBoundingClientRect();
        
        // Calculate the scroll position to show the top of the message
        const scrollTop = messageRect.top - containerRect.top + chatContainerRef.current.scrollTop;
        
        chatContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Scroll on any message change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToLastMessage, 50);
    }
  }, [messages]);

  useEffect(() => {
    // Add initial welcome message
    if (messages.length === 0) {
      setMessages([{
        id: crypto.randomUUID(),
        content: "Hello! I'm Aika, the AI Cofounder of Aiko. How may I assist you today?",
        role: 'assistant',
        timestamp: Date.now()
      }]);
    }
  }, [messages.length]);

  return (
    <div className="flex flex-col h-screen pt-16">

      {/* Chat Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Avatar */}
        <div className="relative w-24 h-24 mb-8">
          {/* Glow ring - only shows when loading */}
          <div className={`absolute -inset-2 rounded-full ${isLoading ? 'animate-glow-spin bg-white/20' : ''}`} />
          {/* Avatar container */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm relative z-10">
            <Image
              src="/images/Aika.png"
              alt="Aika Avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Chat Box */}
        <div className="w-[600px] bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
          <div ref={chatContainerRef} className="h-[400px] overflow-y-auto space-y-4 mb-4 pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-white/90 backdrop-blur-sm text-blue-900 shadow-md'
                      : 'bg-blue-100/90 backdrop-blur-sm text-blue-900 shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {message.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className={index > 0 ? 'mt-4' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                {message.role === 'assistant' && message.suggestions && (
                  <SuggestionButtons
                    suggestions={message.suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 p-3 rounded-l-lg bg-white/80 backdrop-blur-sm text-blue-900 placeholder-blue-400 focus:outline-none focus:bg-white/90 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-r-lg hover:bg-white/90 focus:outline-none disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
