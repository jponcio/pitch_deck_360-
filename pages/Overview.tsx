
import React from 'react';
import { TrendingUp, Users, Target, DollarSign, Calculator, Calendar } from 'lucide-react';
import { FinancialYear, PageId } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface OverviewProps {
  financials: FinancialYear[];
  onNavigate: (page: PageId) => void;
  onOpenChat: () => void;
}

const Overview: React.FC<OverviewProps> = ({ financials, onNavigate, onOpenChat }) => {
  // Dados validados para projeção 2030
  const totalRevenue = financials.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = financials.reduce((acc, curr) => acc + curr.profit, 0);
  
  const kpis = [
    { 
      label: 'Valuation (Sugerido)', 
      value: `R$ 4,8M`, 
      icon: <Calculator className="text-purple-600" />, 
      change: 'Seed Round 2025',
      bg: 'bg-purple-50'
    },
    { 
      label: 'Receita 2026', 
      value: `R$ 1.0M`, 
      icon: <DollarSign className="text-green-600" />, 
      change: 'Meta Ano 1',
      bg: 'bg-green-50'
    },
    { 
      label: 'Meta SOM 2030', 
      value: `R$ 18M`, 
      icon: <Target className="text-blue-600" />, 
      change: 'Crescimento Escalável',
      bg: 'bg-blue-50'
    },
    { 
      label: 'TAM Político BR', 
      value: 'R$ 358M', 
      icon: <Users className="text-indigo-600" />, 
      change: '74.750 Clientes',
      bg: 'bg-indigo-50'
    },
    { 
      label: 'Margem Líquida', 
      value: '66%', 
      icon: <TrendingUp className="text-orange-600" />, 
      change: 'Eficiência SaaS',
      bg: 'bg-orange-50'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Painel do Investidor</h2>
          <p className="text-gray-500 mt-1">Visão estratégica e dados validados do projeto MEU MANDATO 360°</p>
        </div>
        <div className="text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold shadow-lg shadow-indigo-200">
          STATUS: RODADA SEED ABERTA
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className={`p-2 w-10 h-10 rounded-lg ${kpi.bg} mb-3 flex items-center justify-center`}>
                {kpi.icon}
            </div>
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{kpi.label}</h3>
            <div className="mt-1">
              <span className="text-2xl font-black text-gray-900">{kpi.value}</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{kpi.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 opacity-10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
           <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Escala prevista: R$ 18M até 2030</h3>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-xl text-sm">
                O Mandato 360° consolidou seu plano de negócios baseando-se no Serviceable Obtainable Market (SOM) de R$ 18 milhões, focando na digitalização dos mandatos RS/SC e posterior expansão nacional.
              </p>
              <div className="flex gap-3">
                 <button onClick={() => onNavigate('investors')} className="bg-white text-indigo-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">Ver Detalhes do Valuation</button>
                 <button onClick={onOpenChat} className="bg-indigo-600/30 border border-indigo-400/50 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-600/50 transition-colors">IA Estratégica</button>
              </div>
           </div>

           {/* Gráfico de Projeção Rápido */}
           <div className="w-full md:w-80 h-48 bg-white/5 rounded-xl border border-white/10 p-4">
              <h4 className="text-[10px] font-bold text-indigo-300 uppercase mb-4 text-center">Curva de Crescimento (5 Anos)</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={financials}>
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px'}} 
                      formatter={(val: number) => [`R$ ${val/1000000}M`, 'Receita']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#818cf8" fill="#818cf8" fillOpacity={0.2} />
                 </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-2">
                 <span>2026: R$ 1M</span>
                 <span className="text-indigo-400 font-bold">2030: R$ 18M</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
