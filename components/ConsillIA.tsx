
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

interface ConsillIAProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ConsillIA: React.FC<ConsillIAProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou a Consill IA. Especialista em inteligência política. Como posso ajudar seu mandato hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Safe mode check
  const getSafeApiKey = () => {
    try {
      return process.env.API_KEY || null;
    } catch {
      return null;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const apiKey = getSafeApiKey();
    if (!apiKey) {
      setMessages(prev => [...prev, {
        id: 'error-key',
        role: 'model',
        text: '⚠️ Consill IA em modo offline: API Key não configurada.',
        timestamp: new Date()
      }]);
      setInput('');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || 'Sem resposta.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: "Erro na conexão com a IA.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 flex items-center gap-2 no-print"
      >
        <Bot size={24} />
        <span className="font-semibold hidden md:inline">Consill IA</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 z-50 animate-in slide-in-from-bottom-5 duration-300 no-print">
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-bold text-sm">Consill IA</h3>
        </div>
        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border border-gray-100'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <Loader2 className="animate-spin text-indigo-600 mx-auto" />}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte algo..."
          className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
        />
        <button onClick={handleSend} className="bg-indigo-600 text-white p-2 rounded-lg"><Send size={18} /></button>
      </div>
    </div>
  );
};

export default ConsillIA;
