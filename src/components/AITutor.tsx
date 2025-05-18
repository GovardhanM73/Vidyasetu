import React, { useState, useEffect, useRef } from 'react';
import { Brain, Send, Book, Lightbulb, History, MessageSquare, Zap } from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  timestamp?: string;
}

interface AITutorProps {
  isVisible: boolean;
}

const AITutor: React.FC<AITutorProps> = ({ isVisible }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'ai', 
      text: "Hello! I'm your AI study assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestedTopics = [
    { id: 1, name: 'Physics', icon: <Zap className="w-4 h-4" /> },
    { id: 2, name: 'Chemistry', icon: <Book className="w-4 h-4" /> },
    { id: 3, name: 'Mathematics', icon: <Lightbulb className="w-4 h-4" /> }
  ];

  const studyHistory = [
    { id: 1, topic: "Wave Motion", duration: "45 mins", date: "Today" },
    { id: 2, topic: "Chemical Bonding", duration: "30 mins", date: "Today" },
    { id: 3, topic: "Integration", duration: "60 mins", date: "Yesterday" }
  ];

  useEffect(() => {
    if (isVisible && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isVisible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { 
        id: Date.now(), 
        type: 'user', 
        text: input,
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: generateAIResponse(input),
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      `I understand you're asking about ${userInput}. Let me help you break this down...`,
      `Great question about ${userInput}! Here's what you need to know...`,
      `I can help you understand ${userInput}. Let's start with the basics...`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickQuestion = (topic: string) => {
    setInput(`Can you explain ${topic}?`);
  };

  return (
    <div ref={containerRef} className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">AI Study Assistant</h2>
        <Brain className="w-6 h-6 text-purple-600" />
      </div>

      {/* Quick Topics */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Topics</h3>
        <div className="flex gap-2">
          {suggestedTopics.map(topic => (
            <button
              key={topic.id}
              onClick={() => handleQuickQuestion(topic.name)}
              className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
            >
              {topic.icon}
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
        {messages.map(message => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your study question..."
          className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Study History */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <History className="w-4 h-4" />
          Recent Study Sessions
        </h3>
        <div className="space-y-2">
          {studyHistory.map(session => (
            <div key={session.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-800">{session.topic}</span>
              <span className="text-gray-500">{session.duration} • {session.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITutor;