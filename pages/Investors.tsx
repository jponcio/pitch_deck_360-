
import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { 
  TrendingUp, Map, Megaphone, Handshake, Download, FileText, Info, Users, DollarSign, Target, X, CheckCircle2,
  Calculator, Zap, Award, Briefcase, ChevronRight
} from 'lucide-react';

const Investors: React.FC = () => {
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // --- DATASETS ---
  
  const marketData = [
    { name: 'SOM', value: 70, fullName: 'Serviceable Obtainable Market', desc: 'Fatia realista a curto prazo', color: '#2563eb' }, // Blue 600
    { name: 'SAM', value: 680, fullName: 'Serviceable Available Market', desc: 'Mercado apto a contratar IA', color: '#94a3b8' }, // Slate 400
    { name: 'TAM', value: 2400, fullName: 'Total Available Market', desc: 'Mercado político total BR', color: '#e2e8f0' }, // Slate 200
  ];

  const investmentAllocation = [
    { category: 'Desenvolvimento', value: 380000, color: '#4f46e5' },
    { category: 'Marketing', value: 180000, color: '#0ea5e9' },
    { category: 'Vendas', value: 120000, color: '#22c55e' },
    { category: 'Infraestrutura / IA', value: 110000, color: '#64748b' },
  ];

  const financialEvolution = [
    { year: 2026, revenue: 1006200, cost: 336000, profit: 670200, clients: 165 },
    { year: 2027, revenue: 1355000, cost: 546000, profit: 809000, clients: 210 },
    { year: 2028, revenue: 2050000, cost: 950000, profit: 1100000, clients: 300 },
    { year: 2029, revenue: 3200000, cost: 1300000, profit: 1900000, clients: 480 },
    { year: 2030, revenue: 6500000, cost: 2300000, profit: 4200000, clients: 900 },
  ];

  // --- VALUATION DATA ---

  const valuationScenarios2026 = [
    { name: 'Conservador (2.5x)', value: 2500000, display: '2.5M', color: '#94a3b8' },
    { name: 'Realista (4x)', value: 4000000, display: '4.0M', color: '#3b82f6' },
    { name: 'Agressivo (6x)', value: 6000000, display: '6.0M', color: '#2563eb' },
  ];

  const valuationScenarios2030 = [
    { name: 'Conservador (5x)', value: 32500000, display: '32.5M', color: '#94a3b8' },
    { name: 'Realista (8x)', value: 52000000, display: '52M', color: '#8b5cf6' },
    { name: 'Agressivo (12x)', value: 78000000, display: '78M', color: '#7c3aed' },
  ];

  const valuationTimeline = [
    { year: 2025, value: 4800000 },
    { year: 2026, value: 12500000 },
    { year: 2027, value: 20000000 },
    { year: 2028, value: 35000000 },
    { year: 2029, value: 51000000 },
    { year: 2030, value: 65000000 },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Área do Investidor
            </h2>
            <p className="text-gray-500 mt-2">Visão estratégica e projeções de retorno (2025–2030).</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FileText size={16} /> Relatório
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
              <Download size={16} /> Pitch Deck
            </button>
          </div>
        </div>

        {showWalkthrough && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-start">
            <div className="flex gap-3">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Bem-vindo à área de Investidores</h4>
                <p className="text-sm text-blue-800 mt-1 max-w-2xl">
                  Cenários baseados em TAM/SAM/SOM reais para a rodada Seed 2025/2026.
                </p>
              </div>
            </div>
            <button onClick={() => setShowWalkthrough(false)} className="text-blue-400 hover:text-blue-600">
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 1. VALUATION HIGHLIGHT (RESTAURADO PARA O TOPO) */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center md:text-left mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center justify-center md:justify-start gap-3">
            <Calculator className="text-green-400" size={32} />
            VALUATION DO MANDATO 360°
          </h2>
          <p className="text-indigo-200">Métricas baseadas em múltiplos SaaS e Unit Economics validados.</p>
        </div>

        {/* RECOMENDAÇÃO EM DESTAQUE */}
        <div className="bg-white text-gray-900 rounded-xl p-8 shadow-2xl mb-12 border-4 border-indigo-500/30 relative z-10">
          <div className="flex items-center gap-2 mb-4 justify-center">
             <Award className="text-indigo-600" size={28} />
             <h3 className="text-xl font-bold text-gray-600 uppercase tracking-widest">Valuation Final • Recomendação</h3>
          </div>
          <div className="text-center mb-6">
             <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
               R$ 4.800.000
             </p>
             <p className="text-sm font-bold text-indigo-600 mt-2 bg-indigo-50 inline-block px-4 py-1.5 rounded-full border border-indigo-100">
               Rodada Pré-Seed 2025 (MVP)
             </p>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm">
            Equilíbrio entre múltiplos de ARR (2026) e ativos proprietários: 
            <strong> MVP funcional, IA integrada, mapa territorial e Unit Economics validado (LTV/CAC 21x).</strong>
          </p>
        </div>

        {/* CENÁRIOS 2026 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
          {valuationScenarios2026.map((sc, i) => (
            <div key={i} className={`p-6 rounded-xl border transition-all ${sc.name.includes('Realista') ? 'bg-white/15 border-white/30 scale-105' : 'bg-white/5 border-white/10'}`}>
              <p className="text-gray-400 text-xs font-bold uppercase mb-2">{sc.name}</p>
              <p className="text-3xl font-bold text-white mb-1">R$ {sc.display}</p>
              <div className="h-1 w-full bg-white/10 rounded-full mt-3">
                 <div className="h-full rounded-full" style={{ width: `${(sc.value/6000000)*100}%`, backgroundColor: sc.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. MARKET SIZE & EVOLUTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-gray-800 mb-6">Tamanho de Mercado & Crescimento</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialEvolution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val/1000000}M`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name="Receita" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-bold text-gray-800 mb-4 w-full">Distribuição TAM/SAM/SOM</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                  >
                    {marketData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `R$ ${value} Mi`} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
      </section>

      {/* 3. UNIT ECONOMICS */}
      <section className="bg-gray-900 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <DollarSign size={20} className="text-blue-400" /> Unit Economics (Chave para o Valuation)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">CAC</p>
            <p className="text-3xl font-bold text-white">R$ 180</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">LTV</p>
            <p className="text-3xl font-bold text-white">R$ 3.800</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">LTV / CAC</p>
            <p className="text-3xl font-bold text-green-400">21x</p>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Payback</p>
            <p className="text-3xl font-bold text-blue-400">{'<'} 3 meses</p>
          </div>
        </div>
      </section>

      {/* 4. FOOTER ACTIONS */}
      <div className="flex justify-center gap-4 pb-12">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-bold transition-all shadow-lg">
           <Download size={18} /> Relatório Completo (PDF)
        </button>
      </div>

    </div>
  );
};

export default Investors;
