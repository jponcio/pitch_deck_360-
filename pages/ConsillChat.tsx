
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  MessageSquare, Plus, Trash2, Edit2, Download, Copy, Send, 
  Search, Bot, User, MoreVertical, Sparkles 
} from 'lucide-react';

// --- TYPES ---

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

// --- CONSTANTS ---

const SYSTEM_PROMPT = `
Você é a Consill IA – uma inteligência política especializada em campanhas, legislação eleitoral, estratégias regionais, marketing político e análise territorial.
Seu papel é:
- interpretar dados da tela
- orientar o candidato ou investidor
- analisar cenários
- montar estratégias municipais, estaduais e federais

Seja objetiva, estratégica, habilidosa e de visão. Quando necessário, explique com exemplos.
Use formatação Markdown para listas, tabelas e destaques.
`;

const ConsillChat: React.FC = () => {
  // --- STATE ---
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'chat_demo',
      title: 'Estratégia Eleitoral 2026',
      createdAt: new Date(),
      messages: [
        {
          id: 'msg_1',
          role: 'model',
          content: 'Olá! Sou a Consill IA. Estou pronta para definir sua estratégia para 2026. Podemos começar analisando o cenário local ou discutindo legislação eleitoral.',
          timestamp: new Date()
        }
      ]
    }
  ]);
  const [activeChatId, setActiveChatId] = useState<string>('chat_demo');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- DERIVED STATE ---
  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];
  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- EFFECTS ---
  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, activeChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- ACTIONS ---

  const handleNewChat = () => {
    const newChat: Conversation = {
      id: `chat_${Date.now()}`,
      title: 'Nova Conversa',
      createdAt: new Date(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          role: 'model',
          content: 'Olá! Iniciei um novo contexto. Como posso auxiliar estrategicamente agora?',
          timestamp: new Date()
        }
      ]
    };
    setConversations([newChat, ...conversations]);
    setActiveChatId(newChat.id);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // Optimistic Update
    const updatedConversations = conversations.map(c => 
      c.id === activeChatId 
        ? { ...c, messages: [...c.messages, userMsg] }
        : c
    );
    
    // Auto-rename if it's the first user message and title is generic
    const currentChat = conversations.find(c => c.id === activeChatId);
    if (currentChat && currentChat.title === 'Nova Conversa' && currentChat.messages.length <= 1) {
       const newTitle = input.length > 25 ? input.substring(0, 25) + '...' : input;
       const chatIndex = updatedConversations.findIndex(c => c.id === activeChatId);
       if (chatIndex >= 0) updatedConversations[chatIndex].title = newTitle;
    }

    setConversations(updatedConversations);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct history for API
      // We take the existing messages of the ACTIVE chat
      const chatHistory = activeChat.messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const model = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: SYSTEM_PROMPT },
        history: chatHistory
      });

      const result = await model.sendMessage({ message: userMsg.content });
      const responseText = result.text;

      const aiMsg: Message = {
        id: `msg_a_${Date.now()}`,
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };

      setConversations(prev => prev.map(c => 
        c.id === activeChatId 
          ? { ...c, messages: [...c.messages, userMsg, aiMsg] }
          : c
      ));

    } catch (error) {
      console.error("AI Error", error);
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        role: 'model',
        content: '⚠️ Ocorreu um erro ao processar sua solicitação. Verifique sua conexão ou chave de API.',
        timestamp: new Date()
      };
      setConversations(prev => prev.map(c => 
        c.id === activeChatId 
          ? { ...c, messages: [...c.messages, userMsg, errorMsg] }
          : c
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newChats = conversations.filter(c => c.id !== id);
    setConversations(newChats);
    if (activeChatId === id && newChats.length > 0) {
      setActiveChatId(newChats[0].id);
    } else if (newChats.length === 0) {
      handleNewChat(); // Ensure at least one chat exists
    }
  };

  const startRename = (e: React.MouseEvent, chat: Conversation) => {
    e.stopPropagation();
    setEditingTitleId(chat.id);
    setTempTitle(chat.title);
  };

  const saveRename = () => {
    if (editingTitleId) {
      setConversations(prev => prev.map(c => 
        c.id === editingTitleId ? { ...c, title: tempTitle } : c
      ));
      setEditingTitleId(null);
    }
  };

  const exportChat = () => {
    const text = activeChat.messages.map(m => 
      `[${m.role === 'user' ? 'USUÁRIO' : 'CONSILL IA'} - ${m.timestamp.toLocaleString()}]\n${m.content}\n`
    ).join('\n-------------------\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consill-chat-${activeChat.id}.txt`;
    link.click();
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in duration-500">
      
      {/* 1. SIDEBAR (Black) */}
      <aside className="w-80 bg-black text-white flex flex-col border-r border-gray-800">
        
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Sparkles size={18} />
            <span className="font-bold tracking-wider text-xs uppercase">Consill IA • Multichat</span>
          </div>
          <button 
            onClick={handleNewChat}
            className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-gray-200 transition-colors"
          >
            <Plus size={18} /> Novo Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
             <input 
               type="text" 
               placeholder="Buscar conversas..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-gray-900 text-white text-sm rounded-lg pl-9 pr-3 py-2 border border-gray-800 focus:border-purple-500 focus:outline-none placeholder-gray-600"
             />
           </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto py-2">
          {filteredConversations.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`group px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-900 transition-colors border-l-4 ${
                activeChatId === chat.id ? 'border-purple-600 bg-gray-900' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className={activeChatId === chat.id ? 'text-purple-500' : 'text-gray-500'} />
                
                {editingTitleId === chat.id ? (
                  <input 
                    type="text" 
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onBlur={saveRename}
                    onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                    autoFocus
                    className="bg-transparent border-b border-purple-500 text-white text-sm focus:outline-none w-32"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="flex flex-col overflow-hidden">
                    <span className={`text-sm font-medium truncate ${activeChatId === chat.id ? 'text-white' : 'text-gray-400'}`}>
                      {chat.title}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      {chat.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions (Hover) */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => startRename(e, chat)}
                  className="p-1.5 text-gray-500 hover:text-white rounded"
                >
                  <Edit2 size={12} />
                </button>
                <button 
                  onClick={(e) => deleteChat(e, chat.id)}
                  className="p-1.5 text-gray-500 hover:text-red-500 rounded"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col bg-gray-50 relative">
        
        {/* Chat Header */}
        <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bot className="text-purple-600" /> 
              {activeChat ? activeChat.title : 'Nova Conversa'}
            </h2>
            <p className="text-xs text-gray-500">Consill IA – Consultor Político Inteligente</p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={exportChat}
               className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
               title="Exportar TXT"
             >
               <Download size={16} /> Exportar
             </button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeChat && activeChat.messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar */}
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg mt-1">
                  <Bot size={18} />
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-[80%] rounded-2xl p-5 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-gray-200 text-gray-900 rounded-tr-none' 
                  : 'bg-[#6B2FFF] text-white rounded-tl-none shadow-md'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 shrink-0 mt-1">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
             <div className="flex gap-4 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 mt-1">
                  <Bot size={18} />
                </div>
                <div className="bg-gray-200 h-10 w-24 rounded-2xl rounded-tl-none"></div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
           <div className="relative max-w-4xl mx-auto">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Pergunte sobre estratégia, leis, análise de dados..."
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none shadow-sm min-h-[60px]"
                rows={2}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 bottom-3 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
           </div>
           <p className="text-center text-[10px] text-gray-400 mt-2">
             A Consill IA pode cometer erros. Verifique informações jurídicas importantes.
           </p>
        </div>

      </main>
    </div>
  );
};

export default ConsillChat;