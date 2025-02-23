'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SuggestionButtons } from './SuggestionButtons';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  suggestions?: Suggestion[];
}

import { extractSuggestions } from '@/utils/extractSuggestions';

interface Suggestion {
  label: string;
  value: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const sessionIdRef = useRef<string>(`user-${session?.user?.id || 'anonymous'}-${Date.now()}`);
  const router = useRouter();

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
          sessionId: sessionIdRef.current
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Image
          src="/images/aiko_logo_white.svg"
          alt="Aiko Logo"
          width={100}
          height={40}
          priority
        />
        <div className="flex gap-4">
          <button className="text-white hover:text-gray-200">Meet Aika</button>
          <button className="text-white hover:text-gray-200">Learn More</button>
          <button 
            onClick={() => router.push('/')}
            className="text-white hover:text-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

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
          <div className="h-[400px] overflow-y-auto space-y-4 mb-4 pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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
                  {message.content}
                </div>
                {message.role === 'assistant' && message.suggestions && (
                  <SuggestionButtons
                    suggestions={message.suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
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
