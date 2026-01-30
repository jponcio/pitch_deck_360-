
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Plus, Trash2, Edit2, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message { id: string; role: 'user' | 'model'; content: string; timestamp: Date; }
interface Conversation { id: string; title: string; createdAt: Date; messages: Message[]; }

const SYSTEM_PROMPT = "Você é a Consill IA – especialista em estratégia política.";

const ConsillChat: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([{
    id: 'chat_demo',
    title: 'Estratégia Eleitoral 2026',
    createdAt: new Date(),
    messages: [{ id: 'msg_1', role: 'model', content: 'Olá! Sou a Consill IA. Como posso auxiliar hoje?', timestamp: new Date() }]
  }]);
  const [activeChatId, setActiveChatId] = useState<string>('chat_demo');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    let apiKey = null;
    try { apiKey = process.env.API_KEY; } catch {}

    if (!apiKey) {
      const errorMsg: Message = { id: `err_${Date.now()}`, role: 'model', content: '⚠️ IA Offline: API_KEY não encontrada.', timestamp: new Date() };
      setConversations(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, { id: 'u', role: 'user', content: input, timestamp: new Date() }, errorMsg] } : c));
      setInput('');
      return;
    }

    const userMsg: Message = { id: `msg_u_${Date.now()}`, role: 'user', content: input, timestamp: new Date() };
    setConversations(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, userMsg] } : c));
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const model = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...activeChat.messages, userMsg].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: { systemInstruction: SYSTEM_PROMPT }
      });

      const response = await model;
      const aiMsg: Message = { id: `msg_a_${Date.now()}`, role: 'model', content: response.text || '', timestamp: new Date() };
      setConversations(prev => prev.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, aiMsg] } : c));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <aside className="w-80 bg-black text-white flex flex-col border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <button onClick={() => {
            const n = { id: `c_${Date.now()}`, title: 'Novo Chat', createdAt: new Date(), messages: [] };
            setConversations([n, ...conversations]);
            setActiveChatId(n.id);
          }} className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 font-bold"><Plus size={18} /> Novo Chat</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(c => (
            <div key={c.id} onClick={() => setActiveChatId(c.id)} className={`px-4 py-3 cursor-pointer hover:bg-gray-900 border-l-4 ${activeChatId === c.id ? 'border-purple-600 bg-gray-900' : 'border-transparent'}`}>
              <div className="text-sm font-medium truncate">{c.title}</div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-gray-50">
        <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
          <h2 className="text-lg font-bold flex items-center gap-2"><Bot className="text-purple-600" /> {activeChat.title}</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeChat.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-5 text-sm ${msg.role === 'user' ? 'bg-gray-200 text-gray-900' : 'bg-indigo-600 text-white'}`}>{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-6 bg-white border-t border-gray-200 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 outline-none" placeholder="Digite sua mensagem..." />
          <button onClick={handleSendMessage} className="bg-purple-600 text-white p-3 rounded-xl"><Send size={18} /></button>
        </div>
      </main>
    </div>
  );
};

export default ConsillChat;
