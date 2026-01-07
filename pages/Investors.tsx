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

  const competitorsComparison = [
    { name: 'Heptagon', crm: 'Forte', map: 'Fraco', intel: 'Fraco', ai: 'Não', focus: 'Empresarial', sheets: 'Médio', kanban: 'Não', price: 297 },
    { name: 'Conecta', crm: 'Forte', map: 'Não', intel: 'Parcial', ai: 'Não', focus: 'Campanhas', sheets: 'Fraco', kanban: 'Não', price: 197 },
    { name: 'Sigma', crm: 'Médio', map: 'Não', intel: 'Fraco', ai: 'Não', focus: 'CRM Puro', sheets: 'Médio', kanban: 'Não', price: 149 },
    { name: 'Mandato 360°', crm: 'Incluso', map: 'Forte', intel: 'Completo', ai: 'Sim', focus: 'Território', sheets: 'Forte', kanban: 'Sim', price: 399, highlight: true },
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

  // --- RENDER HELPERS ---

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <p className="font-bold text-gray-800">{label}</p>
          <p className="text-sm text-indigo-600 font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* HEADER & ONBOARDING */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Área do Investidor
            </h2>
            <p className="text-gray-500 mt-2">Visão estratégica, unit economics e projeções de retorno (2025–2030).</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FileText size={16} /> Relatório (PDF)
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
                <h4 className="font-bold text-blue-900">Bem-vindo à área de Relação com Investidores</h4>
                <p className="text-sm text-blue-800 mt-1 max-w-2xl">
                  Esta seção foi modelada com base em TAM/SAM/SOM reais para apresentar o potencial de escala do Mandato 360°.
                  Todos os indicadores abaixo refletem um cenário conservador-realista para a rodada Seed 2025/2026.
                </p>
              </div>
            </div>
            <button onClick={() => setShowWalkthrough(false)} className="text-blue-400 hover:text-blue-600">
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 1. TAM / SAM / SOM */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-gray-800 mb-6">Tamanho de Mercado (Market Size)</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-xs text-gray-500 font-bold uppercase">TAM (Total)</span>
                <p className="text-2xl font-extrabold text-gray-900 mt-1">R$ 2.4B</p>
                <p className="text-xs text-gray-400">Mercado Político BR</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs text-slate-500 font-bold uppercase">SAM (Alcançável)</span>
                <p className="text-2xl font-extrabold text-slate-700 mt-1">R$ 680M</p>
                <p className="text-xs text-slate-400">Digitalmente Ativos</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-xs text-blue-600 font-bold uppercase">SOM (Obtível)</span>
                <p className="text-2xl font-extrabold text-blue-600 mt-1">R$ 70M</p>
                <p className="text-xs text-blue-400">Meta Curto Prazo</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialEvolution} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val/1000000}M`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name="Receita Projetada" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-bold text-gray-800 mb-2 w-full text-left">Distribuição de Mercado</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {marketData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `R$ ${value} Mi`} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              Foco inicial em capturar <strong className="text-blue-600">10% do SAM</strong> nos próximos 5 anos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. UNIT ECONOMICS */}
      <section className="bg-gray-900 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
          <DollarSign size={20} className="text-blue-400" /> Unit Economics & Eficiência
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase mb-1">CAC (Custo Aquisição)</p>
            <p className="text-3xl font-bold text-white">R$ 180</p>
            <span className="text-xs text-green-400">Baixo atrito (Inbound)</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase mb-1">LTV (Lifetime Value)</p>
            <p className="text-3xl font-bold text-white">R$ 3.800</p>
            <span className="text-xs text-blue-400">Ciclo de 4 anos</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase mb-1">ARR por Cliente</p>
            <p className="text-3xl font-bold text-white">R$ 4.308</p>
            <span className="text-xs text-gray-400">Ticket Médio Anual</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase mb-1">LTV / CAC Ratio</p>
            <p className="text-3xl font-bold text-green-400">21x</p>
            <span className="text-xs text-gray-400">Benchmark SaaS: {'>'}3x</span>
          </div>
        </div>
      </section>

      {/* 3. INVESTMENT & PAYBACK */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="font-bold text-lg text-gray-900">Necessidade de Capital</h3>
               <p className="text-sm text-gray-500">Rodada Seed 2025/2026</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-gray-400 font-bold uppercase">Ask Recomendado</p>
               <p className="text-2xl font-bold text-indigo-600">R$ 790k - 1.2M</p>
             </div>
          </div>
          
          <div className="h-[200px] mb-4">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={investmentAllocation} margin={{top: 0, right: 30, left: 40, bottom: 0}}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/>
                 <XAxis type="number" hide />
                 <YAxis dataKey="category" type="category" width={100} tick={{fontSize: 12}} interval={0} />
                 <Tooltip formatter={(val: number) => `R$ ${(val/1000).toFixed(0)}k`} cursor={{fill: 'transparent'}} />
                 <Bar dataKey="value" barSize={24} radius={[0, 4, 4, 0]}>
                    {investmentAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 border border-gray-100">
            <strong>Destinação:</strong> Garantia de runway até o primeiro ciclo eleitoral, finalização da IA preditiva e expansão para 2 estados-chave.
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <h3 className="font-bold text-lg text-gray-900 mb-2">Payback do Investidor</h3>
           <p className="text-sm text-gray-500 mb-6">Evolução de Receita e Lucro Acumulado</p>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={financialEvolution}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                 <XAxis dataKey="year" axisLine={false} tickLine={false} />
                 <YAxis tickFormatter={(val) => `R$${val/1000000}M`} axisLine={false} tickLine={false} />
                 <Tooltip formatter={(value: number) => formatCurrency(value)} />
                 <Legend />
                 <Area type="monotone" dataKey="revenue" name="Receita" stroke="#2563eb" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                 <Line type="monotone" dataKey="profit" name="Lucro Líquido" stroke="#22c55e" strokeWidth={2} dot={{r: 4}} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-between mt-4 text-xs font-medium text-gray-600 px-2">
             <span>Breakeven: <span className="text-green-600">10-12 meses</span></span>
             <span>Margem Média: <span className="text-green-600">59%</span></span>
           </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="border-t-2 border-dashed border-gray-200 py-4 text-center">
        <span className="bg-gray-50 px-4 text-gray-400 text-sm font-semibold uppercase tracking-widest">Análise de Valuation</span>
      </div>

      {/* 4. VALUATION SECTION */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="relative z-10 mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <Calculator className="text-green-400" size={32} />
            VALUATION DO MANDATO 360°
          </h2>
          <p className="text-indigo-200 text-lg">Como estimamos o valor da startup usando métricas reais do mercado SaaS.</p>
          <div className="mt-2 text-xs bg-white/10 w-fit px-3 py-1 rounded-full text-indigo-100 border border-white/10">
            Baseado em múltiplos SaaS brasileiros, projeções reais e unit economics avançados.
          </div>
        </div>

        {/* METHOD 1: ARR MULTIPLES */}
        <div className="mb-12">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-blue-600 p-2 rounded-lg text-white font-bold">1</div>
             <h3 className="text-xl font-bold">Múltiplos de Receita Futura (ARR Forward)</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {valuationScenarios2026.map((sc, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-2">{sc.name.split(' ')[0]}</p>
                  <p className="text-2xl font-bold text-white mb-1">R$ {sc.display}</p>
                  <p className="text-xs text-indigo-300">Valuation 2026</p>
                </div>
              ))}
           </div>
           
           <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={valuationScenarios2026} layout="vertical" margin={{top:0, left:20, right:30, bottom:0}}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={120} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{background: '#1e293b', border: 'none', color: '#fff'}} />
                    <Bar dataKey="value" barSize={30} radius={[0, 4, 4, 0]}>
                      {valuationScenarios2026.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* METHOD 2: 5-YEAR VISION */}
        <div className="mb-12">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-purple-600 p-2 rounded-lg text-white font-bold">2</div>
             <h3 className="text-xl font-bold">Múltiplos de Receita a 5 anos (Visão 2030)</h3>
           </div>

           <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-[250px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={valuationScenarios2030} margin={{top:20, left:0, right:0, bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => `R$${val/1000000}M`} tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{background: '#1e293b', border: 'none', color: '#fff'}} formatter={(val: number) => `R$ ${(val/1000000).toFixed(1)}M`} />
                    <Bar dataKey="value" barSize={50} radius={[4, 4, 0, 0]}>
                      {valuationScenarios2030.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <p className="text-sm text-gray-400">
             Em startups SaaS GovTech, é comum projetar 5 anos à frente. Com uma receita de R$ 6.5M em 2030, o potencial de exit varia de <strong>R$ 32M a R$ 78M</strong>.
           </p>
        </div>

         {/* METHOD 3: UNIT ECONOMICS */}
         <div className="mb-12">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-green-600 p-2 rounded-lg text-white font-bold">3</div>
             <h3 className="text-xl font-bold">Valuation baseado em Unit Economics</h3>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-800">
                <span className="block text-green-400 text-xs font-bold uppercase">LTV/CAC</span>
                <span className="text-xl font-bold text-white">21x</span>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-800">
                <span className="block text-green-400 text-xs font-bold uppercase">Payback</span>
                <span className="text-xl font-bold text-white">{'<'} 3 meses</span>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-800">
                <span className="block text-green-400 text-xs font-bold uppercase">Margem</span>
                <span className="text-xl font-bold text-white">55-65%</span>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-800">
                <span className="block text-green-400 text-xs font-bold uppercase">Churn</span>
                <span className="text-xl font-bold text-white">Baixo</span>
              </div>
           </div>
           
           <div className="bg-white/10 p-4 rounded-xl text-center border border-white/20">
             <p className="text-sm text-gray-300 uppercase font-bold mb-1">Estimativa Unit Economics (MVP)</p>
             <p className="text-2xl font-bold text-white">R$ 4.000.000 — R$ 7.000.000</p>
           </div>
        </div>

        {/* RECOMMENDATION CARD */}
        <div className="bg-white text-gray-900 rounded-xl p-8 shadow-2xl mb-12 transform scale-105 border-4 border-indigo-500/30">
          <div className="flex items-center gap-2 mb-4 justify-center">
             <Award className="text-indigo-600" size={28} />
             <h3 className="text-xl font-bold text-gray-600 uppercase tracking-widest">Valuation Final • Recomendação</h3>
          </div>
          <div className="text-center mb-6">
             <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
               R$ 4.800.000
             </p>
             <p className="text-sm font-bold text-indigo-600 mt-2 bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-100">
               Pré-Seed 2025 (MVP)
             </p>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Este valor representa o equilíbrio entre os 3 métodos de avaliação, considerando ativos proprietários já desenvolvidos: 
            <strong> MVP funcional, IA integrada, mapa territorial proprietário e Unit Economics validado.</strong>
          </p>
        </div>

        {/* EVOLUTION CHART */}
        <div className="mb-8">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
             <TrendingUp className="text-blue-400" /> Evolução do Valuation (Projeção)
           </h3>
           <div className="h-[300px] bg-white/5 p-4 rounded-xl border border-white/10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={valuationTimeline}>
                    <defs>
                       <linearGradient id="valGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)"/>
                    <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(val) => `R$${val/1000000}M`} stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <Tooltip cursor={{stroke: 'rgba(255,255,255,0.2)'}} contentStyle={{background: '#1e293b', border: 'none', color: '#fff'}} formatter={(val: number) => formatCurrency(val)} />
                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#valGradient)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 p-3 rounded text-xs text-indigo-200">
                🚀 O valuation dobra em anos eleitorais (2026/2028).
              </div>
              <div className="bg-white/5 p-3 rounded text-xs text-indigo-200">
                🌍 Expansão para outros estados amplia o múltiplo.
              </div>
              <div className="bg-white/5 p-3 rounded text-xs text-indigo-200">
                💰 Potencial de R$ 80M em 2030.
              </div>
           </div>
        </div>

        {/* SUMMARY TABLE */}
        <div className="overflow-hidden rounded-xl border border-white/10 mb-8">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-white/10 uppercase text-xs font-bold text-white">
              <tr>
                <th className="px-6 py-4">Cenário</th>
                <th className="px-6 py-4">Múltiplo</th>
                <th className="px-6 py-4">Valuation Atual (2025)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium">Conservador</td>
                <td className="px-6 py-4">2.5x ARR</td>
                <td className="px-6 py-4 text-white font-bold">R$ 2.500.000</td>
              </tr>
              <tr className="hover:bg-white/5 bg-white/5">
                <td className="px-6 py-4 font-medium text-blue-400">Realista</td>
                <td className="px-6 py-4 text-blue-400">4x ARR</td>
                <td className="px-6 py-4 text-blue-400 font-bold">R$ 4.000.000</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium">Agressivo</td>
                <td className="px-6 py-4">6x ARR</td>
                <td className="px-6 py-4 text-white font-bold">R$ 6.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* 6. HIGHLIGHTS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            <Zap size={20} />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Oportunidade</h4>
          <p className="text-sm text-gray-600">GovTech político com IA, mapa territorial e gestão integrada em um mercado carente de inovação.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-purple-600">
            <Map size={20} />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Diferencial</h4>
          <p className="text-sm text-gray-600">Concorrentes são apenas CRMs de cadastro. Mandato 360° é inteligência territorial + IA preditiva.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-green-600">
            <TrendingUp size={20} />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Escalabilidade</h4>
          <p className="text-sm text-gray-600">Modelo SaaS replicável para qualquer estado sem custo de desenvolvimento proporcional.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
            <Briefcase size={20} />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Tese</h4>
          <p className="text-sm text-gray-600">Alta margem (65%), CAC baixo, payback acelerado e mercado gigante e recorrente.</p>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-center gap-4 pb-12">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors">
           <Download size={18} /> Exportar Valuation (PDF)
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
           <FileText size={18} /> Baixar Planilha (CSV)
        </button>
      </div>

    </div>
  );
};

export default Investors;