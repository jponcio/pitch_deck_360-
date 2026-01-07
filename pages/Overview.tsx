import React from 'react';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { FinancialYear, PageId } from '../types';

interface OverviewProps {
  financials: FinancialYear[];
  onNavigate: (page: PageId) => void;
  onOpenChat: () => void;
}

const Overview: React.FC<OverviewProps> = ({ financials, onNavigate, onOpenChat }) => {
  // Calculate aggregate stats
  const totalRevenue = financials.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = financials.reduce((acc, curr) => acc + curr.profit, 0);
  const growthRate = ((financials[4].revenue - financials[0].revenue) / financials[0].revenue * 100).toFixed(0);

  const kpis = [
    { 
      label: 'Receita Projetada (5 anos)', 
      value: `R$ ${(totalRevenue / 1000000).toFixed(1)}M`, 
      icon: <DollarSign className="text-green-600" />, 
      change: '+120% vs anterior',
      bg: 'bg-green-50'
    },
    { 
      label: 'Lucro Estimado', 
      value: `R$ ${(totalProfit / 1000000).toFixed(1)}M`, 
      icon: <TrendingUp className="text-indigo-600" />, 
      change: `Margem média ${(totalProfit/totalRevenue*100).toFixed(0)}%`,
      bg: 'bg-indigo-50'
    },
    { 
      label: 'TAM (Brasil)', 
      value: '74.750', 
      sub: 'Potenciais Clientes',
      icon: <Users className="text-blue-600" />, 
      change: 'R$ 358M Mercado Total',
      bg: 'bg-blue-50'
    },
    { 
      label: 'SOM (Meta 36 Meses)', 
      value: '900', 
      sub: 'Mandatos Ativos',
      icon: <Target className="text-purple-600" />, 
      change: 'R$ 18M Receita Anual',
      bg: 'bg-purple-50'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Visão Geral</h2>
          <p className="text-gray-500 mt-1">Status atual do projeto MEU MANDATO 360°</p>
        </div>
        <div className="text-sm bg-black text-white px-3 py-1 rounded-full">
          Ano Eleitoral 2026: Em foco
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${kpi.bg}`}>
                {kpi.icon}
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {kpi.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{kpi.label}</h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
              {kpi.sub && <span className="text-xs text-gray-400">{kpi.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section / Description */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">A Revolução da Inteligência Política</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            O Mandato 360° não é apenas um CRM. É um ecossistema completo que une gestão territorial, inteligência artificial preditiva e análise financeira para garantir a longevidade e o sucesso de mandatos políticos em todo o Brasil.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('roadmap')}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Roadmap 2026
            </button>
            <button 
              onClick={onOpenChat}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              Explorar Consill IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;