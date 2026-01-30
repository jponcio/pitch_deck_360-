
import React, { useState, useEffect } from 'react';
import { 
  Rocket, Flag, Users, Globe, Download, RefreshCcw, FileText, 
  DollarSign, TrendingUp, Calendar, Zap, Layers, Briefcase, PieChart as PieIcon,
  CheckCircle2, Target, Calculator, ShieldCheck, AreaChart as AreaIcon
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
  AreaChart, Area, BarChart, Bar
} from 'recharts';

interface LevelInput {
  id: string;
  name: string;
  ticket: number;
  implantation: number;
  clients: number;
  goal?: number;
}

const RoadmapCalculator: React.FC = () => {
  // --- STATE ---
  const [startMonth, setStartMonth] = useState(0); 
  const [churnRate, setChurnRate] = useState(3);
  const [operationalCosts, setOperationalCosts] = useState(25000); 
  const [annualGoal2026] = useState(1006200); 
  const [target2030] = useState(18000000); // Meta Validada SOM 2030
  const [targetValuation] = useState(4800000); 

  const [levels, setLevels] = useState<LevelInput[]>([
    { id: 'ver', name: 'Vereador', ticket: 149, implantation: 0, clients: 120, goal: 100 },
    { id: 'est', name: 'Dep. Estadual', ticket: 399, implantation: 500, clients: 30, goal: 5 },
    { id: 'fed', name: 'Dep. Federal', ticket: 799, implantation: 1500, clients: 10, goal: 5 },
    { id: 'pref', name: 'Prefeito', ticket: 1200, implantation: 3000, clients: 5, goal: 10 },
    { id: 'vice_pref', name: 'Vice-prefeito', ticket: 600, implantation: 1500, clients: 0, goal: 10 },
    { id: 'sen', name: 'Senador', ticket: 2500, implantation: 5000, clients: 0 },
    { id: 'gov', name: 'Governador', ticket: 5000, implantation: 15000, clients: 0 },
    { id: 'vice', name: 'Vice-Governador', ticket: 2000, implantation: 5000, clients: 0 },
  ]);

  // --- CALCULATIONS ---

  const calculateKPIs = () => {
    let totalMRR = 0;
    let totalImplementation = 0;
    let totalClients = 0;
    let annualRevenue = 0;
    
    levels.forEach(lvl => {
      totalMRR += lvl.ticket * lvl.clients;
      totalImplementation += lvl.implantation * lvl.clients;
      totalClients += lvl.clients;
      
      const monthsActive = 12 - startMonth;
      const subRev = lvl.ticket * lvl.clients * monthsActive;
      const implRev = lvl.implantation * lvl.clients;
      annualRevenue += (subRev + implRev);
    });

    const weightedTicket = totalClients > 0 ? totalMRR / totalClients : 0;
    const arr = totalMRR * 12;
    const cac = 150; 
    const ltv = churnRate > 0 ? weightedTicket * (1 / (churnRate / 100)) : 0;
    const currentValuation = (arr * 4) + 1200000;

    return { totalMRR, arr, totalClients, annualRevenue, ltv, cac, currentValuation };
  };

  const kpis = calculateKPIs();

  // --- CHART DATA GENERATION (3 SCENARIOS 2026) ---
  const generateChartData2026 = () => {
    const data = [];
    let cumulativeRealist = 0;
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (let i = 0; i < 12; i++) {
      let monthRevenueBase = 0;
      if (i >= startMonth) {
        monthRevenueBase = levels.reduce((acc, lvl) => acc + (lvl.ticket * lvl.clients), 0);
        if (i === startMonth) {
          monthRevenueBase += levels.reduce((acc, lvl) => acc + (lvl.implantation * lvl.clients), 0);
        }
      }
      cumulativeRealist += monthRevenueBase;
      
      data.push({
        name: months[i],
        Conservador: Math.round(cumulativeRealist * 0.8),
        Realista: Math.round(cumulativeRealist),
        Agressivo: Math.round(cumulativeRealist * 1.35),
        Goal: annualGoal2026,
      });
    }
    return data;
  };

  // --- LONG TERM DATA (2026-2030) ---
  const longTermData = [
    { year: '2026', value: kpis.annualRevenue, target: annualGoal2026 },
    { year: '2027', value: 2800000, target: 2800000 },
    { year: '2028', value: 6500000, target: 6500000 },
    { year: '2029', value: 12000000, target: 12000000 },
    { year: '2030', value: 18000000, target: 18000000 },
  ];

  const chartData2026 = generateChartData2026();

  const handleLevelChange = (id: string, field: keyof LevelInput, value: number) => {
    setLevels(prev => prev.map(lvl => lvl.id === id ? { ...lvl, [field]: value } : lvl));
  };

  const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div>
          <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider mb-1 block">Aqui você pode simular diversos cenários</span>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Rocket className="text-indigo-600" /> Simulador Estratégico
          </h2>
          <p className="text-gray-500 mt-2">Validação de tração para 2026 e escala até 2030 (R$ 18M SOM).</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
             <Download size={16} /> Exportar
           </button>
        </div>
      </div>

      {/* 1. TOP KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-indigo-700 text-white p-6 rounded-2xl shadow-xl">
              <p className="text-indigo-200 text-xs font-bold uppercase mb-1">Valuation Sugerido</p>
              <p className="text-3xl font-black">{formatMoney(kpis.currentValuation)}</p>
              <p className="text-[10px] opacity-60 mt-2 italic">Base: {formatMoney(kpis.arr)} ARR x 4</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">Receita Projetada 2026</p>
              <p className="text-3xl font-bold text-gray-900">{formatMoney(kpis.annualRevenue)}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600" style={{ width: `${Math.min(100, (kpis.annualRevenue/annualGoal2026)*100)}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">{((kpis.annualRevenue/annualGoal2026)*100).toFixed(0)}%</span>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">Meta SOM 2030</p>
              <p className="text-3xl font-bold text-gray-900">18M</p>
              <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-wider">900 Usuários</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase mb-1">Unit Economics</p>
              <p className="text-3xl font-bold text-blue-600">{(kpis.ltv / kpis.cac).toFixed(1)}x</p>
              <p className="text-[10px] text-gray-500 mt-2">LTV/CAC (Alvo > 3x)</p>
          </div>
      </div>

      {/* 2. CALCULATION & 2026 SCENARIOS CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              {/* Table Inputs */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Layers size={20} className="text-indigo-600" /> Matriz de Crescimento RS/SC
                    </h3>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-tight">valores e metas a serem validados</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3">Cargo</th>
                                <th className="px-4 py-3 text-right">Mensalidade</th>
                                <th className="px-4 py-3 text-right">Setup</th>
                                <th className="px-4 py-3 text-center">Clientes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {levels.map((lvl) => (
                                <tr key={lvl.id} className="hover:bg-indigo-50/30">
                                    <td className="px-4 py-4 font-bold text-gray-900">{lvl.name}</td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                          <input type="number" value={lvl.ticket} onChange={(e) => handleLevelChange(lvl.id, 'ticket', parseFloat(e.target.value))} className="w-20 text-right border-none bg-gray-100 rounded px-2 py-1" />
                                          <span className="text-[10px] font-bold text-gray-400 uppercase">Recorrência</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                          <input type="number" value={lvl.implantation} onChange={(e) => handleLevelChange(lvl.id, 'implantation', parseFloat(e.target.value))} className="w-20 text-right border-none bg-gray-100 rounded px-2 py-1" />
                                          <span className="text-[10px] font-bold text-gray-400 uppercase">Ativação</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                          <input type="number" value={lvl.clients} onChange={(e) => handleLevelChange(lvl.id, 'clients', parseFloat(e.target.value))} className="w-16 text-center border-2 border-indigo-100 rounded px-2 py-1 font-black text-indigo-700 bg-indigo-50" />
                                          {lvl.goal !== undefined && (
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                              <span>meta</span>
                                              <span className="bg-gray-100 px-1.5 rounded text-gray-600">{lvl.goal}</span>
                                            </div>
                                          )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
              </div>

              {/* 2026 Chart with 3 Scenarios */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-[400px]">
                  <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" /> Curva de Receita 2026 (Cenários)
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData2026}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                          <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <YAxis tickFormatter={(val) => `R$${val/1000}k`} tick={{fontSize: 10}} axisLine={false} tickLine={false} width={60} />
                          <Tooltip formatter={(val: number) => formatMoney(val)} />
                          <Legend />
                          <Area type="monotone" dataKey="Agressivo" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                          <Area type="monotone" dataKey="Realista" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={3} />
                          <Area type="monotone" dataKey="Conservador" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.05} strokeWidth={2} strokeDasharray="5 5" />
                          <ReferenceLine y={annualGoal2026} label={{ value: 'Meta 2026', position: 'insideBottomRight', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>

              {/* 3. SIMULAÇÃO DE RISCO (MOVED TO BOTTOM AS PER SCREENSHOT) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-6 text-xs uppercase tracking-widest border-b border-gray-100 pb-3">Simulação de Risco</h4>
                  <div className="space-y-8">
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Churn Rate: {churnRate}%</label>
                          <input type="range" min="0" max="10" step="0.5" value={churnRate} onChange={(e) => setChurnRate(parseFloat(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                      <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Início Operação: Mês {startMonth + 1}</label>
                          <input type="range" min="0" max="5" step="1" value={startMonth} onChange={(e) => setStartMonth(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      </div>
                  </div>
              </div>
          </div>

          {/* RIGHT SIDE: LONG TERM PROJECTION */}
          <div className="space-y-6 flex flex-col">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col min-h-[420px]">
                  <h3 className="font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest text-indigo-400">
                    <Target size={18} /> Projeção até 2030 (18M)
                  </h3>
                  <div className="flex-1 min-h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={longTermData}>
                            <XAxis dataKey="year" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Receita Projetada" />
                        </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 text-center shrink-0">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Objetivo SOM Final</p>
                    <p className="text-xl font-black text-indigo-400">18M / ano</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default RoadmapCalculator;
