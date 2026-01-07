
import React from 'react';
import { PageId } from '../types';
import { 
  LayoutDashboard, 
  PieChart, 
  Users, 
  Lightbulb, 
  Briefcase, 
  DollarSign, 
  Map, 
  Calendar, 
  Contact, 
  Settings,
  TrendingUp,
  Presentation,
  Calculator,
  Slice,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
    { id: 'investors', label: 'Investidores', icon: <TrendingUp size={20} /> },
    { id: 'slice_pie', label: 'Slice Pie (Equity)', icon: <Slice size={20} /> },
    { id: 'pitch_deck', label: 'Pitch Deck', icon: <Presentation size={20} /> },
    { id: 'roadmap_calculator', label: 'Simulador 2026', icon: <Calculator size={20} /> },
    { id: 'consill_chat', label: 'Consill IA (Chat)', icon: <Bot size={20} /> }, // New Item
    { id: 'market', label: 'TAM / SAM / SOM', icon: <PieChart size={20} /> },
    { id: 'competitors', label: 'Concorrência', icon: <Users size={20} /> },
    { id: 'differentiators', label: 'Diferenciais', icon: <Lightbulb size={20} /> },
    { id: 'business_model', label: 'Business Model', icon: <Briefcase size={20} /> },
    { id: 'pricing', label: 'Planos e Preços', icon: <DollarSign size={20} /> },
    { id: 'roadmap', label: 'Roadmap 2026', icon: <Calendar size={20} /> },
    { id: 'financials', label: 'Projeções', icon: <Settings size={20} /> },
    { id: 'map', label: 'Mapa Interativo', icon: <Map size={20} /> },
    { id: 'crm', label: 'CRM Político', icon: <Contact size={20} /> },
  ];

  return (
    <aside className="w-64 bg-black text-white flex-shrink-0 flex flex-col h-screen sticky top-0 no-print overflow-y-auto z-40">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-wider">MANDATO 360°</h1>
        <p className="text-xs text-gray-400 mt-1">Inteligência Estratégica</p>
      </div>

      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200
                  ${activePage === item.id 
                    ? 'bg-white text-black border-r-4 border-blue-600' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Sistema Online
        </div>
        <p className="text-[10px] text-gray-600 mt-2">v1.0.4 Enterprise</p>
      </div>
    </aside>
  );
};

export default Sidebar;