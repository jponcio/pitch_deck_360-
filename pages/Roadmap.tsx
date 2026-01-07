import React from 'react';
import { Flag, Rocket, Shield, Cpu } from 'lucide-react';

const Roadmap: React.FC = () => {
  const steps = [
    {
      quarter: 'Q1',
      title: 'Fundação e Inteligência',
      items: ['Módulo CRM Básico', 'Dashboard Geral de KPIs', 'Consill IA v1 (Beta)', 'Importação de Dados Eleitorais'],
      icon: <Flag className="text-white" />,
      color: 'bg-indigo-600'
    },
    {
      quarter: 'Q2',
      title: 'Expansão e Previsibilidade',
      items: ['IA Preditiva de Votos', 'Módulo Partidário', 'Exportações Profissionais (PDF/XLS)', 'App Mobile (Alpha)'],
      icon: <Cpu className="text-white" />,
      color: 'bg-purple-600'
    },
    {
      quarter: 'Q3',
      title: 'Território e Jurídico',
      items: ['Mapa Nacional Completo', 'Módulo Jurídico Automatizado', 'IA Política Avançada', 'Integração WhatsApp'],
      icon: <Shield className="text-white" />,
      color: 'bg-blue-600'
    },
    {
      quarter: 'Q4',
      title: 'Escala e Consolidação',
      items: ['Mandato 360° v2.0', 'Escala Nacional', 'Marketplace de Consultores', 'API Pública'],
      icon: <Rocket className="text-white" />,
      color: 'bg-green-600'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900">Roadmap 2026</h2>
        <p className="text-gray-500 mt-2">Cronograma estratégico de desenvolvimento para o Ano Eleitoral.</p>
      </div>

      <div className="relative border-l-4 border-gray-200 ml-6 space-y-12 py-4">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-12">
            {/* Dot/Icon */}
            <div className={`absolute -left-[22px] top-0 w-11 h-11 rounded-full ${step.color} flex items-center justify-center border-4 border-white shadow-md`}>
              {step.icon}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${step.color}`}>
                   {step.quarter} 2026
                 </span>
                 <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
               </div>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {step.items.map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
