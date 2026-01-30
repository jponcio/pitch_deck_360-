
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area
} from 'recharts';
import { 
  Users, Target, Globe, Info, InfoIcon, TrendingUp, Landmark, ShieldCheck, 
  ChevronRight, Calculator, Calendar
} from 'lucide-react';

const MarketAnalysis: React.FC = () => {
  // Dados de Mandatos Ativos (TAM)
  const mandatesByLevel = [
    { name: 'Vereadores', value: 58000, color: '#6366f1' },
    { name: 'Prefeitos', value: 5569, color: '#4f46e5' },
    { name: 'Estaduais', value: 1059, color: '#4338ca' },
    { name: 'Federais', value: 513, color: '#3730a3' },
  ];

  // Cenários SOM (2026)
  const somScenarios = [
    { name: 'Conservador (10%)', value: 1200, color: '#94a3b8' },
    { name: 'Realista (15%)', value: 1800, color: '#6366f1' },
    { name: 'Agressivo (25%)', value: 3000, color: '#22c55e' },
  ];

  const mainKpis = [
    { 
      label: 'TAM - Mercado Total', 
      value: '~65.000', 
      sub: 'Mandatos Ativos no Brasil', 
      icon: <Globe className="text-slate-500" />,
      bg: 'bg-slate-50'
    },
    { 
      label: 'SAM - Mercado Alcançável', 
      value: '13.500', 
      sub: 'Perfil Tech/Digitalizado', 
      icon: <Target className="text-indigo-600" />,
      bg: 'bg-indigo-50'
    },
    { 
      label: 'SOM - Meta 2026', 
      value: '1.800', 
      sub: 'Cenário Realista (SOM)', 
      icon: <TrendingUp className="text-green-600" />,
      bg: 'bg-green-50'
    }
  ];

  const timelineData = [
    { year: '2022', label: 'Eleições Gerais', demand: 40 },
    { year: '2024', label: 'Eleições Municipais', demand: 65 },
    { year: '2026', label: 'Expansão Nacional', demand: 95 },
  ];

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* 1. CONTEXTO INICIAL */}
      <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Landmark size={120} />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Análise de Mercado (TAM / SAM / SOM)</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            O Brasil possui um dos maiores sistemas democráticos do mundo. Cada mandato funciona como uma 
            <strong> unidade de gestão autônoma</strong>, com equipe, orçamento e necessidade constante de organização territorial.
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-xl">
             <p className="text-indigo-900 text-sm italic">
               "O Meu Mandato 360º profissionaliza essa gestão, trazendo dados, território e IA para o centro da tomada de decisão política, 
               substituindo planilhas analógicas e intuição por inteligência eleitoral."
             </p>
          </div>
        </div>
      </section>

      {/* 2. TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainKpis.map((kpi, idx) => (
          <div key={idx} className={`${kpi.bg} p-6 rounded-2xl border border-black/5 flex flex-col items-center text-center group hover:shadow-lg transition-all`}>
             <div className="bg-white p-3 rounded-full shadow-sm mb-4">
                {kpi.icon}
             </div>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
             <p className="text-4xl font-black text-gray-900">{kpi.value}</p>
             <p className="text-xs text-gray-400 mt-2 font-medium">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* 3. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* TAM: Mandatos por Nível */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <Landmark size={20} className="text-indigo-600" /> TAM: Mandatos Ativos por Cargo
            </h3>
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">Fonte: TSE</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mandatesByLevel} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} style={{ fontSize: '12px', fontWeight: '600' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} formatter={(val: number) => formatNumber(val)} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={35}>
                    {mandatesByLevel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-50 grid grid-cols-2 gap-4 text-xs">
             <div className="text-gray-500">• <strong>5.569</strong> Prefeituras</div>
             <div className="text-gray-500">• <strong>~58.000</strong> Vereadores</div>
             <div className="text-gray-500">• <strong>1.059</strong> Dep. Estaduais</div>
             <div className="text-gray-500">• <strong>513</strong> Dep. Federais</div>
          </div>
        </div>

        {/* SOM: Cenários 2026 */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-8 flex items-center gap-2">
            <Calculator size={20} className="text-green-600" /> SOM 2026: Cenários de Obtenção
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                    data={somScenarios}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {somScenarios.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
               </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Base de SAM Estimada: 12k - 15k mandatos</p>
          </div>
        </div>

      </div>

      {/* 4. STRATEGIC TIMELINE & REVENUE CONTEXT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
                <Calendar size={20} className="text-indigo-600" /> Curva de Demanda Tecnológica
             </h3>
             <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="grid grid-cols-3 gap-4 mt-6">
                {timelineData.map((d, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xs font-black text-gray-900">{d.year}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{d.label}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
             <div>
                <h3 className="text-indigo-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-4">Relação com Receita</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                   A receita decorre de: <br/>
                   <span className="text-white font-bold">• Implantação (Setup)</span> <br/>
                   <span className="text-white font-bold">• Assinatura Mensal (MRR)</span> <br/>
                   <span className="text-white font-bold">• Módulos Premium (IA/Leis)</span>
                </p>
             </div>
             <div className="mt-8 border-t border-slate-800 pt-6">
                <p className="text-xs text-slate-500 mb-1">Nota de Viabilidade:</p>
                <p className="text-lg font-medium text-slate-200">
                   Atingir R$ 1M em 2026 exige apenas uma fração do <strong>SOM Realista</strong>, reforçando a robustez do modelo.
                </p>
             </div>
             <div className="mt-8">
               <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
                 <ShieldCheck size={18} /> Dados Verificados: TSE
               </div>
             </div>
          </div>

      </div>

      {/* 5. FINAL MESSAGE */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
         <h4 className="text-xl font-bold text-gray-900">O Meu Mandato 360º não disputa um mercado hipotético.</h4>
         <p className="text-gray-500 text-sm">
           Atuamos em um ecossistema real, grande, recorrente e historicamente mal atendido por tecnologia profissional. 
           O TAM é grande. O SAM é claro. E o SOM é plenamente alcançável.
         </p>
         <button className="text-indigo-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
           Acessar Projeções Financeiras <ChevronRight size={18} />
         </button>
      </div>

    </div>
  );
};

export default MarketAnalysis;
