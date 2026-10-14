import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiTutorChatProps {
  initialContext?: string;
}

const SUGGESTED_PROMPTS = [
  "Explain Gradient Descent in plain English",
  "What is the difference between a qubit and a bit?",
  "How do neurons generate action potentials?",
  "What is the Hard Problem of Consciousness?"
];

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      content: initialContext 
        ? `Hello! I'm Sage, your AI tutor. I see you're looking at **${initialContext}**. How can I help clarify this concept for you?`
        : `Hello! I'm Sage, your AI academic tutor at LearnVerse. Ask me anything about Computer Science, Quantum Physics, AI, Neuroscience, or Philosophy!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          courseContext: initialContext || 'General Academy'
        })
      });

      const data = await response.json();
      if (data.reply) {
        const modelMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMsg]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-6rem)] flex flex-col space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-white">Sage AI Tutor</h1>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {initialContext ? `Context: ${initialContext}` : 'Ask questions, request examples, or practice problems'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([{
            id: '1',
            role: 'model',
            content: "Chat cleared! What would you like to explore next?",
            timestamp: new Date()
          }])}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shadow-sm flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 overflow-y-auto space-y-6 shadow-xl">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                isUser ? 'bg-indigo-600 text-white' : 'bg-purple-600 text-white'
              }`}>
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed shadow-md ${
                isUser 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-400 flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></span>
              <span className="ml-2">Sage is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Ask Sage anything about your course..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-5 pr-14 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm shadow-xl"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${
            inputMessage.trim() && !isLoading
              ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
