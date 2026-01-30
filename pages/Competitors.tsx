
import React from 'react';
import { 
  // Alias Radar to RechartsRadar to avoid conflict with Lucide icon
  Radar as RechartsRadar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip
} from 'recharts';
import { Shield, Zap, Target, Cpu, Map, Award, CheckCircle2, AlertTriangle, Radar } from 'lucide-react';

const Competitors: React.FC = () => {
  // 1. DADOS REAIS DO MERCADO
  const competitorsList = [
    { 
      name: 'CRM Gabinete', 
      focus: 'CRM político / Gestão de gabinete', 
      weakness: 'Sem BI, sem mapa, visual limitado, sem IA', 
      strength: 'Forte em demandas e ofícios', 
      obs: 'Player tradicional' 
    },
    { 
      name: 'Conecta Gabinete', 
      focus: 'CRM + Atendimento', 
      weakness: 'Mapa fraco, sem preditivo', 
      strength: 'UX moderna, automações', 
      obs: 'Forte em gabinetes municipais' 
    },
    { 
      name: 'Campanha Ativa', 
      focus: 'Gestão de campanha', 
      weakness: 'Focado só em eleição, sem mandato', 
      strength: 'Ferramentas de mobilização', 
      obs: 'Atua apenas no período eleitoral' 
    },
    { 
      name: 'SigPolítico', 
      focus: 'Gestão de mandato', 
      weakness: 'UX ultrapassada, baixa tecnologia', 
      strength: 'Abrange gabinete, agenda, demandas', 
      obs: 'Presença antiga no setor' 
    },
    { 
      name: 'E-politic@', 
      focus: 'BI eleitoral', 
      weakness: 'Interface desatualizada', 
      strength: 'Dados históricos robustos', 
      obs: 'Referência acadêmica' 
    },
    { 
      name: 'Voxin', 
      focus: 'CRM eleitoral', 
      weakness: 'Sem territorial, sem BI avançado', 
      strength: 'Foco em base de apoiadores', 
      obs: 'Performance forte em ativação' 
    },
    { 
      name: 'Mandato Online', 
      focus: 'CRM básico', 
      weakness: 'Sem IA, sem mapa', 
      strength: 'Preço acessível', 
      obs: 'Voltado para vereadores iniciantes' 
    }
  ];

  // 2. DADOS DO RADAR
  const radarData = [
    { subject: 'Tecnologia', A: 9, B: 5, fullMark: 10 },
    { subject: 'UX/UI', A: 9, B: 6, fullMark: 10 },
    { subject: 'Integração IA', A: 10, B: 1, fullMark: 10 },
    { subject: 'Mapa Territorial', A: 10, B: 2, fullMark: 10 },
    { subject: 'Profundidade CRM', A: 9, B: 5, fullMark: 10 },
    { subject: 'Preço/Valor', A: 9, B: 6, fullMark: 10 },
    { subject: 'Suporte', A: 8, B: 5, fullMark: 10 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER */}
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Target className="text-indigo-600" /> Análise de Concorrência
        </h2>
        <p className="text-gray-500 mt-2">Comparativo com players reais do mercado brasileiro.</p>
      </div>

      {/* 1. TABELA DE CONCORRENTES */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Concorrentes Reais (Verificados)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-500 font-bold uppercase text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Foco Principal</th>
                <th className="px-6 py-4 text-red-600">Pontos Fracos</th>
                <th className="px-6 py-4 text-green-600">Pontos Fortes</th>
                <th className="px-6 py-4">Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {competitorsList.map((comp, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{comp.name}</td>
                  <td className="px-6 py-4 text-gray-600">{comp.focus}</td>
                  <td className="px-6 py-4 text-red-600 bg-red-50/30 flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" /> {comp.weakness}
                  </td>
                  <td className="px-6 py-4 text-green-700">{comp.strength}</td>
                  <td className="px-6 py-4 text-gray-500 italic">{comp.obs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* CONCLUSÃO COMPETITIVA */}
        <div className="p-6 bg-indigo-50 border-t border-indigo-100 text-center md:text-left">
           <h4 className="font-bold text-indigo-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
             <Award size={18} /> Conclusão Competitiva:
           </h4>
           <p className="text-indigo-800 text-sm leading-relaxed">
             Nenhum dos concorrentes mapeados combina <strong>CRM + BI + Análise Territorial + IA + Gestão de Campanha</strong>. 
             O Mandato 360° se posiciona como a única plataforma completa de inteligência política integrada para mandatos e campanhas.
           </p>
        </div>
      </div>

      {/* 2. RADAR CHART & VISUAL COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* CHART */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
           <h3 className="text-lg font-bold text-gray-800 mb-6 w-full text-left flex items-center gap-2">
             {/* Use Radar icon from lucide-react */}
             <Radar size={20} className="text-indigo-600" /> Radar de Valor: Mandato 360° vs Mercado
           </h3>
           <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                
                {/* Mandato 360 - Using RechartsRadar alias */}
                <RechartsRadar
                  name="Mandato 360°"
                  dataKey="A"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fill="#4f46e5"
                  fillOpacity={0.4}
                />
                
                {/* Average Market - Using RechartsRadar alias */}
                <RechartsRadar
                  name="Média do Mercado"
                  dataKey="B"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="#94a3b8"
                  fillOpacity={0.2}
                  strokeDasharray="4 4"
                />
                
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* 3. RESUMO CARDS (SIDEBAR) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-600 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Award size={20} /></div>
                  <h4 className="font-bold text-gray-900">Posição no Mercado</h4>
               </div>
               <p className="text-gray-600 text-sm">
                 O Mandato 360° supera a média do mercado em <strong>7 de 7 dimensões avaliadas</strong>, consolidando liderança tecnológica.
               </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600"><Zap size={20} /></div>
                  <h4 className="font-bold text-gray-900">Diferencial Central</h4>
               </div>
               <p className="text-gray-600 text-sm">
                 Única plataforma com <strong>CRM + BI + IA + Territorial + Gestão de Campanha</strong> integrados nativamente.
               </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Cpu size={20} /></div>
                  <h4 className="font-bold text-gray-900">Estratégia Competitiva</h4>
               </div>
               <p className="text-gray-600 text-sm">
                 Enquanto concorrentes focam em banco de dados simples, o Mandato 360° foca em <strong>inteligência política acionável</strong>.
               </p>
            </div>
        </div>
      </div>

      {/* 4. CONCLUSÃO FINAL */}
      <div className="bg-gray-900 rounded-xl p-8 text-white relative overflow-hidden shadow-xl text-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <Shield className="text-indigo-400" /> Resumo Estratégico
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              O Mandato 360° não concorre com CRMs tradicionais. Ele <strong>redefine o mercado</strong> ao integrar dados, IA e território em um único ecossistema de inteligência política, criando uma nova categoria de produto.
            </p>
         </div>
      </div>

    </div>
  );
};

export default Competitors;
