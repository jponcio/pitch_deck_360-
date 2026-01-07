
import React, { useState, useEffect } from 'react';
import { 
  Rocket, Flag, Users, Globe, Download, RefreshCcw, FileText, 
  DollarSign, TrendingUp, Calendar, Zap, Layers, Briefcase, PieChart as PieIcon,
  CheckCircle2, Target, Info
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

interface LevelInput {
  id: string;
  name: string;
  ticket: number;
  implantation: number;
  clients: number;
  target: number;
}

const RoadmapCalculator: React.FC = () => {
  // --- STATE ---
  const [startMonth, setStartMonth] = useState(0); // 0 = Jan, 1 = Feb...
  const [churnRate, setChurnRate] = useState(3);
  const [operationalCosts, setOperationalCosts] = useState(25000); // Fixed monthly cost
  const [annualGoal] = useState(1000000);

  const [levels, setLevels] = useState<LevelInput[]>([
    { id: 'ver', name: 'Vereador', ticket: 149, implantation: 0, clients: 120, target: 100 },
    { id: 'est', name: 'Dep. Estadual', ticket: 399, implantation: 5000, clients: 5, target: 5 },
    { id: 'fed', name: 'Dep. Federal', ticket: 799, implantation: 5000, clients: 5, target: 5 },
    { id: 'pref', name: 'Prefeito', ticket: 1200, implantation: 3000, clients: 5, target: 5 },
    { id: 'vpref', name: 'Vice-Prefeito', ticket: 800, implantation: 2000, clients: 0, target: 5 },
    { id: 'sen', name: 'Senador', ticket: 2500, implantation: 5000, clients: 0, target: 1 },
    { id: 'gov', name: 'Governador', ticket: 5000, implantation: 15000, clients: 0, target: 0 },
    { id: 'vice', name: 'Vice-Governador', ticket: 2000, implantation: 5000, clients: 0, target: 0 },
  ]);

  // --- CALCULATIONS ---

  const calculateKPIs = () => {
    let totalMRR = 0;
    let totalImplementation = 0;
    let totalClients = 0;
    let annualRevenue = 0; // Total (Sub + Impl)
    let annualSubscriptionRevenue = 0; // Just Sub
    
    levels.forEach(lvl => {
      totalMRR += lvl.ticket * lvl.clients;
      totalImplementation += lvl.implantation * lvl.clients;
      totalClients += lvl.clients;
      
      const monthsActive = 12 - startMonth;
      const subRev = lvl.ticket * lvl.clients * monthsActive;
      const implRev = lvl.implantation * lvl.clients;

      annualSubscriptionRevenue += subRev;
      annualRevenue += (subRev + implRev);
    });

    const weightedTicket = totalClients > 0 ? totalMRR / totalClients : 0;

    // Formulas
    const cac = 150; // Fixed from prompt
    const ltv = churnRate > 0 ? weightedTicket * (1 / (churnRate / 100)) : 0;
    const payback = weightedTicket > 0 ? cac / weightedTicket : 0;
    
    // Total Costs (Annual)
    const totalCosts = operationalCosts * 12;
    const profit = annualRevenue - totalCosts;
    const margin = annualRevenue > 0 ? (profit / annualRevenue) * 100 : 0;

    return {
      totalMRR,
      totalImplementation,
      totalClients,
      annualRevenue,
      annualSubscriptionRevenue,
      weightedTicket,
      ltv,
      cac,
      payback,
      margin
    };
  };

  const kpis = calculateKPIs();

  // --- IMPLEMENTATION SCENARIOS CALCULATION ---
  const calculateScenarios = () => {
    // Subscription Only
    const subRealist = kpis.annualSubscriptionRevenue;
    const subModerate = subRealist * 0.7;
    const subAggressive = subRealist * 1.3;

    // Implementation Only
    const implRealist = kpis.totalImplementation;
    const implModerate = implRealist * 0.7;
    const implAggressive = implRealist * 1.3;

    // Totals
    return {
      impl: {
        moderate: implModerate,
        realist: implRealist,
        aggressive: implAggressive
      },
      sub: {
        moderate: subModerate,
        realist: subRealist,
        aggressive: subAggressive
      },
      total: {
        moderate: subModerate + implModerate,
        realist: subRealist + implRealist,
        aggressive: subAggressive + implAggressive
      }
    };
  };

  const scenarios = calculateScenarios();

  const implChartData = [
    { name: 'Moderado', value: scenarios.impl.moderate, fill: '#EAB308' }, // Yellow
    { name: 'Realista', value: scenarios.impl.realist, fill: '#3B82F6' }, // Blue
    { name: 'Agressivo', value: scenarios.impl.aggressive, fill: '#A855F7' } // Purple
  ];

  // --- PIE CHART DATA ---
  const pieData = levels
    .filter(l => l.clients > 0)
    .map((lvl, index) => {
      const monthsActive = 12 - startMonth;
      const val = (lvl.implantation * lvl.clients) + (lvl.ticket * lvl.clients * monthsActive);
      // Generate colors
      const colors = ['#4f46e5', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6'];
      return {
        name: lvl.name,
        value: val,
        color: colors[index % colors.length]
      };
    });

  // --- CHART DATA GENERATION (MRR/Revenue) ---
  const generateChartData = () => {
    const data = [];
    let cumulativeModerate = 0;
    let cumulativeRealist = 0;
    let cumulativeAggressive = 0;

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (let i = 0; i < 12; i++) {
      let monthRevenueBase = 0;

      if (i >= startMonth) {
        // Base MRR
        monthRevenueBase = levels.reduce((acc, lvl) => acc + (lvl.ticket * lvl.clients), 0);
        
        // Add Implementation only in start month (simplified for simulation)
        if (i === startMonth) {
          monthRevenueBase += levels.reduce((acc, lvl) => acc + (lvl.implantation * lvl.clients), 0);
        }
      }

      const modFactor = 0.7;
      const aggFactor = 1.3;

      cumulativeRealist += monthRevenueBase;
      cumulativeModerate += monthRevenueBase * modFactor;
      cumulativeAggressive += monthRevenueBase * aggFactor;

      data.push({
        name: months[i],
        Moderado: cumulativeModerate,
        Realista: cumulativeRealist,
        Agressivo: cumulativeAggressive
      });
    }
    return data;
  };

  const chartData = generateChartData();

  // --- MIX IDEAL DATA ---
  const idealMixPercentages: Record<string, number> = {
    'Vereador': 0.55,
    'Dep. Estadual': 0.25,
    'Dep. Federal': 0.12,
    'Senador': 0.03,
    'Prefeito': 0.05
  };
  
  // Helper to match level name to mix key (simple mapping)
  const getMixPercent = (name: string) => idealMixPercentages[name] || 0;


  // --- HANDLERS ---
  const handleLevelChange = (id: string, field: keyof LevelInput, value: number) => {
    setLevels(prev => prev.map(lvl => lvl.id === id ? { ...lvl, [field]: value } : lvl));
  };

  const resetCalculator = () => {
    setLevels([
        { id: 'ver', name: 'Vereador', ticket: 149, implantation: 0, clients: 120, target: 100 },
        { id: 'est', name: 'Dep. Estadual', ticket: 399, implantation: 5000, clients: 5, target: 5 },
        { id: 'fed', name: 'Dep. Federal', ticket: 799, implantation: 5000, clients: 5, target: 5 },
        { id: 'pref', name: 'Prefeito', ticket: 1200, implantation: 3000, clients: 5, target: 5 },
        { id: 'vpref', name: 'Vice-Prefeito', ticket: 800, implantation: 2000, clients: 0, target: 5 },
        { id: 'sen', name: 'Senador', ticket: 2500, implantation: 5000, clients: 0, target: 1 },
        { id: 'gov', name: 'Governador', ticket: 5000, implantation: 15000, clients: 0, target: 0 },
        { id: 'vice', name: 'Vice-Governador', ticket: 2000, implantation: 5000, clients: 0, target: 0 },
    ]);
    setStartMonth(0);
    setChurnRate(3);
  };

  // --- FORMATTERS ---
  const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Rocket className="text-indigo-600" /> Roadmap 2026 + Calculadora Financeira
          </h2>
          <p className="text-gray-500 mt-2">Ferramenta de planejamento estratégico para o Pitch Deck.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
             <Download size={16} /> Exportar PDF
           </button>
           <button onClick={resetCalculator} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-300 rounded-lg hover:bg-red-50">
             <RefreshCcw size={16} /> Resetar
           </button>
        </div>
      </div>

      {/* 1. ROADMAP SECTION */}
      <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
         <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Calendar className="text-gray-400" /> Cronograma de Execução 2026
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
            {[
                { q: 'Q1 2026', title: 'Lançamento & MVP', desc: 'Estabilização MVP, primeiros 50 parlamentares.', color: 'text-blue-600', bg: 'bg-blue-50', icon: <Flag size={20}/> },
                { q: 'Q2 2026', title: 'Escala Nacional', desc: 'Integração TSE, IA Estratégica, +80 clientes.', color: 'text-purple-600', bg: 'bg-purple-50', icon: <Globe size={20}/> },
                { q: 'Q3 2026', title: 'Pré-Eleição', desc: 'Últimos ajustes, +100 parlamentares ativos.', color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <Zap size={20}/> },
                { q: 'Q4 2026', title: 'Pico Eleitoral', desc: 'Módulo campanha completo, expansão 5 estados.', color: 'text-green-600', bg: 'bg-green-50', icon: <Users size={20}/> },
            ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all group">
                    <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.q}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* 2. CALCULATOR SECTION */}
      <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
         <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="text-gray-400" /> Painel de Simulação Financeira
         </h3>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mês de Início (Entrada)</label>
                    <select 
                        value={startMonth}
                        onChange={(e) => setStartMonth(parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                        <option value={0}>Janeiro</option>
                        <option value={1}>Fevereiro</option>
                        <option value={2}>Março</option>
                        <option value={3}>Abril</option>
                        <option value={4}>Maio</option>
                        <option value={5}>Junho</option>
                    </select>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Churn Rate (%)</label>
                    <input 
                        type="range" min="0" max="10" step="0.5" 
                        value={churnRate}
                        onChange={(e) => setChurnRate(parseFloat(e.target.value))}
                        className="w-full mb-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span className="font-bold text-indigo-600">{churnRate}%</span>
                        <span>10%</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Custo Operacional Mensal</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-400">R$</span>
                        <input 
                            type="number"
                            value={operationalCosts}
                            onChange={(e) => setOperationalCosts(parseFloat(e.target.value))}
                            className="w-full pl-8 p-2 border border-gray-300 rounded-lg bg-white"
                        />
                    </div>
                </div>
            </div>

            {/* Matrix Inputs */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 bg-blue-50/50 flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">valores ainda em fase de validação, você pode alterar.</p>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 text-left">NÍVEL</th>
                            <th className="px-4 py-3 text-right">TICKET (MENSAL)</th>
                            <th className="px-4 py-3 text-right">IMPLANTAÇÃO</th>
                            <th className="px-4 py-3 text-center">CLIENTES</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {levels.map((lvl) => (
                            <tr key={lvl.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{lvl.name}</td>
                                <td className="px-4 py-3 text-right">
                                    <input 
                                        type="number" 
                                        value={lvl.ticket} 
                                        onChange={(e) => handleLevelChange(lvl.id, 'ticket', parseFloat(e.target.value))}
                                        className="w-24 text-right border border-gray-300 rounded p-1 bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <input 
                                        type="number" 
                                        value={lvl.implantation} 
                                        onChange={(e) => handleLevelChange(lvl.id, 'implantation', parseFloat(e.target.value))}
                                        className="w-24 text-right border border-gray-300 rounded p-1 bg-white"
                                    />
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex flex-col items-center">
                                        <input 
                                            type="number" 
                                            value={lvl.clients} 
                                            onChange={(e) => handleLevelChange(lvl.id, 'clients', parseFloat(e.target.value))}
                                            className="w-16 text-center border border-gray-300 rounded p-1 font-bold text-indigo-600 bg-white"
                                        />
                                        <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                            Meta 2026: {lvl.target}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      </section>

      {/* 3. RESULTS & SCENARIOS */}
      <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform">
                  <p className="text-indigo-200 text-xs font-bold uppercase mb-1">Receita Anual Projetada</p>
                  <p className="text-3xl font-extrabold">{formatMoney(kpis.annualRevenue)}</p>
                  <div className="mt-2 text-xs bg-white/20 inline-block px-2 py-1 rounded">
                      Meta: {((kpis.annualRevenue / annualGoal) * 100).toFixed(0)}%
                  </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">MRR (Recorrente)</p>
                  <p className="text-3xl font-bold text-gray-800">{formatMoney(kpis.totalMRR)}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> {kpis.totalClients} Clientes</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">LTV / CAC</p>
                  <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-blue-600">{(kpis.ltv / kpis.cac).toFixed(1)}x</p>
                      <span className="text-xs text-gray-400">Payback: {kpis.payback.toFixed(1)} m</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">LTV: {formatMoney(kpis.ltv)}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Margem Líquida</p>
                  <p className={`text-3xl font-bold ${kpis.margin > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {kpis.margin.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Após custos operacionais</p>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px]">
                  <h3 className="font-bold text-gray-800 mb-6">Cenários de Receita Acumulada (2026)</h3>
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickFormatter={(val) => `R$${val/1000}k`} tickLine={false} axisLine={false} width={80} />
                          <Tooltip formatter={(val: number) => formatMoney(val)} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Legend />
                          <ReferenceLine y={annualGoal} label="Meta R$ 1M" stroke="red" strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="Moderado" stroke="#94a3b8" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="Realista" stroke="#4f46e5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                          <Line type="monotone" dataKey="Agressivo" stroke="#22c55e" strokeWidth={2} dot={false} />
                      </LineChart>
                  </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <h4 className="font-bold text-gray-800 text-sm">Resumo por Nível</h4>
                  </div>
                  <div className="flex-1 overflow-auto">
                      <table className="w-full text-xs">
                          <tbody className="divide-y divide-gray-100">
                              {levels.filter(l => l.clients > 0).map((lvl) => {
                                  const lvlRevenue = (lvl.implantation * lvl.clients) + (lvl.ticket * lvl.clients * (12 - startMonth));
                                  return (
                                      <tr key={lvl.id}>
                                          <td className="px-4 py-3 font-medium text-gray-900">{lvl.name}</td>
                                          <td className="px-4 py-3 text-right text-gray-500">{lvl.clients} clientes</td>
                                          <td className="px-4 py-3 text-right font-bold text-indigo-600">{formatMoney(lvlRevenue)}</td>
                                      </tr>
                                  );
                              })}
                          </tbody>
                          <tfoot className="bg-gray-50">
                              <tr>
                                  <td className="px-4 py-3 font-bold">TOTAL</td>
                                  <td className="px-4 py-3 text-right font-bold">{kpis.totalClients}</td>
                                  <td className="px-4 py-3 text-right font-bold text-green-600">{formatMoney(kpis.annualRevenue)}</td>
                              </tr>
                          </tfoot>
                      </table>
                  </div>
                  <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                     <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                        Gerar Relatório Completo
                     </button>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. MODULE: IMPLEMENTATION REVENUE */}
      <section className="border-t-2 border-dashed border-gray-200 pt-8 mt-12">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-gray-100 p-2 rounded-lg">
             <Briefcase className="text-gray-700" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-gray-900">Receita de Implantação — Cenários Isolados (2026)</h3>
              <p className="text-gray-500">Projeção exclusiva de setup e onboarding, independente do MRR.</p>
           </div>
        </div>

        {/* 4.1 INPUTS FOR IMPLEMENTATION */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
               <h4 className="text-xs font-bold text-gray-500 uppercase">Configuração de Implantação</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-6">
                {levels.map(lvl => (
                   <div key={lvl.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs font-bold text-gray-700 mb-2 truncate" title={lvl.name}>{lvl.name}</p>
                      <div className="space-y-2">
                         <div>
                            <label className="text-[10px] text-gray-400 uppercase">Ticket (R$)</label>
                            <input 
                              type="number" 
                              value={lvl.implantation}
                              onChange={(e) => handleLevelChange(lvl.id, 'implantation', parseFloat(e.target.value))}
                              className="w-full text-sm font-bold text-gray-900 bg-white border border-gray-200 rounded px-2 py-1"
                            />
                         </div>
                         <div>
                            <label className="text-[10px] text-gray-400 uppercase">Clientes</label>
                            <input 
                              type="number" 
                              value={lvl.clients}
                              onChange={(e) => handleLevelChange(lvl.id, 'clients', parseFloat(e.target.value))}
                              className="w-full text-sm font-bold text-indigo-600 bg-white border border-gray-200 rounded px-2 py-1"
                            />
                         </div>
                      </div>
                   </div>
                ))}
            </div>
        </div>

        {/* 4.2 IMPLEMENTATION SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 relative">
               <div className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Cenário Conservador</div>
               <p className="text-yellow-800 font-bold text-sm mb-2">Implantação Moderada (70%)</p>
               <p className="text-3xl font-extrabold text-yellow-900">{formatMoney(scenarios.impl.moderate)}</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative shadow-sm">
               <div className="absolute top-4 right-4 bg-blue-200 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Meta Principal</div>
               <p className="text-blue-800 font-bold text-sm mb-2">Implantação Realista (100%)</p>
               <p className="text-3xl font-extrabold text-blue-900">{formatMoney(scenarios.impl.realist)}</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 relative">
               <div className="absolute top-4 right-4 bg-purple-200 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Alta Demanda</div>
               <p className="text-purple-800 font-bold text-sm mb-2">Implantação Agressiva (130%)</p>
               <p className="text-3xl font-extrabold text-purple-900">{formatMoney(scenarios.impl.aggressive)}</p>
            </div>
        </div>

        {/* 4.3 CHART & DETAILED TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Chart */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px]">
               <h4 className="font-bold text-gray-800 text-sm mb-6">Comparativo de Receita de Implantação</h4>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={implChartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: 'transparent'}} formatter={(val: number) => formatMoney(val)} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {implChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
               <div className="overflow-x-auto">
                 <table className="w-full text-xs text-right">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
                       <tr>
                          <th className="px-4 py-3 text-left">Nível</th>
                          <th className="px-4 py-3">Ticket Imp.</th>
                          <th className="px-4 py-3 text-center">Clientes</th>
                          <th className="px-4 py-3 text-yellow-600">Moderado</th>
                          <th className="px-4 py-3 text-blue-600">Realista</th>
                          <th className="px-4 py-3 text-purple-600">Agressivo</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {levels.map((lvl) => {
                          const total = lvl.implantation * lvl.clients;
                          return (
                             <tr key={lvl.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-left font-medium text-gray-900">{lvl.name}</td>
                                <td className="px-4 py-3 text-gray-500">{formatMoney(lvl.implantation)}</td>
                                <td className="px-4 py-3 text-center text-gray-500">{lvl.clients}</td>
                                <td className="px-4 py-3 text-yellow-700 font-medium">{formatMoney(total * 0.7)}</td>
                                <td className="px-4 py-3 text-blue-700 font-bold bg-blue-50/50">{formatMoney(total)}</td>
                                <td className="px-4 py-3 text-purple-700 font-medium">{formatMoney(total * 1.3)}</td>
                             </tr>
                          );
                       })}
                    </tbody>
                    <tfoot className="bg-gray-100 font-bold text-gray-900">
                       <tr>
                          <td className="px-4 py-3 text-left" colSpan={3}>TOTAL GERAL</td>
                          <td className="px-4 py-3 text-yellow-700">{formatMoney(scenarios.impl.moderate)}</td>
                          <td className="px-4 py-3 text-blue-700">{formatMoney(scenarios.impl.realist)}</td>
                          <td className="px-4 py-3 text-purple-700">{formatMoney(scenarios.impl.aggressive)}</td>
                       </tr>
                    </tfoot>
                 </table>
               </div>
               
               <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100">
                     <FileText size={14} /> Exportar Implantação (PDF)
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100">
                     <Layers size={14} /> Exportar Implantação (CSV)
                  </button>
               </div>
            </div>
        </div>

        {/* 5. NEW SECTIONS (EXTENSION) */}
        
        {/* 5.1 TOTAL REVENUE (SUB + IMPL) */}
        <div className="border-t-2 border-dashed border-gray-200 pt-8 mb-12">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Target className="text-indigo-700" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Receita Total 2026 — Assinatura + Implantação</h3>
                <p className="text-gray-500">Visão consolidada do potencial financeiro.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-yellow-200 shadow-sm rounded-xl p-6 border-l-4 border-l-yellow-400">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-800 font-bold text-sm">Total Moderado (70%)</p>
                   <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Conservador</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-3">MRR + Implantação</p>
                 <p className="text-3xl font-extrabold text-gray-900">{formatMoney(scenarios.total.moderate)}</p>
              </div>

              <div className="bg-white border border-blue-200 shadow-sm rounded-xl p-6 border-l-4 border-l-blue-600">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-800 font-bold text-sm">Total Realista (100%)</p>
                   <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Meta Central</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-3">MRR + Implantação</p>
                 <p className="text-3xl font-extrabold text-gray-900">{formatMoney(scenarios.total.realist)}</p>
              </div>

              <div className="bg-white border border-purple-200 shadow-sm rounded-xl p-6 border-l-4 border-l-purple-600">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-gray-800 font-bold text-sm">Total Agressivo (130%)</p>
                   <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Alta Demanda</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-3">MRR + Implantação</p>
                 <p className="text-3xl font-extrabold text-gray-900">{formatMoney(scenarios.total.aggressive)}</p>
              </div>
           </div>
        </div>

        {/* 5.2 IDEAL MIX & PIE CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Ideal Mix */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 border-b border-gray-100">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <PieIcon size={20} className="text-indigo-600"/> Mix Ideal de Clientes — Estratégia 2026
                 </h3>
                 <p className="text-xs text-gray-500 mt-1">
                    Distribuição recomendada de parlamentares baseada em maturidade política.
                 </p>
               </div>
               <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-xs text-right">
                    <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">Nível</th>
                        <th className="px-4 py-3 text-center">% Mix</th>
                        <th className="px-4 py-3 text-yellow-600">Mod (70%)</th>
                        <th className="px-4 py-3 text-blue-600">Real (100%)</th>
                        <th className="px-4 py-3 text-purple-600">Agr (130%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {['Vereador', 'Dep. Estadual', 'Dep. Federal', 'Senador', 'Prefeito'].map((levelName, idx) => {
                         const percent = getMixPercent(levelName);
                         const baseQty = kpis.totalClients * percent;
                         return (
                           <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-left font-medium text-gray-900">{levelName}</td>
                              <td className="px-4 py-3 text-center text-gray-500">{(percent * 100).toFixed(0)}%</td>
                              <td className="px-4 py-3 text-yellow-700">{(baseQty * 0.7).toFixed(0)}</td>
                              <td className="px-4 py-3 text-blue-700 font-bold">{(baseQty).toFixed(0)}</td>
                              <td className="px-4 py-3 text-purple-700">{(baseQty * 1.3).toFixed(0)}</td>
                           </tr>
                         );
                      })}
                    </tbody>
                 </table>
               </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
               <h3 className="font-bold text-gray-900 mb-2">Participação por Nível no Resultado Total 2026</h3>
               <p className="text-xs text-gray-500 mb-4">Contribuição de receita por cargo parlamentar.</p>
               <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                       >
                          {pieData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#fff" />
                          ))}
                       </Pie>
                       <Tooltip formatter={(val: number) => formatMoney(val)} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                       <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
            </div>

        </div>

        {/* 6. EXECUTIVE SUMMARY */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
           
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <Briefcase size={24} className="text-indigo-400" /> Resumo Executivo do Cenário 2026
           </h3>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                 <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Total Moderado</p>
                 <p className="text-lg font-bold">{formatMoney(scenarios.total.moderate)}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                 <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Total Realista</p>
                 <p className="text-lg font-bold text-white border-b-2 border-green-400 inline-block pb-1">
                    {formatMoney(scenarios.total.realist)}
                 </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                 <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Total Agressivo</p>
                 <p className="text-lg font-bold">{formatMoney(scenarios.total.aggressive)}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                 <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Ticket Médio (Real)</p>
                 <p className="text-lg font-bold">{formatMoney(kpis.weightedTicket)}</p>
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm relative z-10">
              <div className="flex items-center gap-2 text-indigo-200">
                 <CheckCircle2 size={16} /> Mix Ideal Mapeado (5 níveis)
              </div>
              <p className="font-medium italic text-indigo-100">
                 “Meta de fechamento: maio/junho 2026. Agosto focado em consultoria e aceleração de resultados.”
              </p>
           </div>
        </div>

      </section>

    </div>
  );
};

export default RoadmapCalculator;
