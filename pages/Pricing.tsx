
import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '149',
      users: '1 Usuário',
      features: ['Dashboard Básico', 'CRM até 500 contatos', 'Mapa (Visualização)', 'Exportação PDF'],
      cta: 'Começar Agora',
      highlight: false
    },
    {
      name: 'Padrão',
      price: '399',
      users: '3 Usuários',
      features: ['CRM Ilimitado', 'Consill IA v1', 'Mapa Interativo', 'Suporte Email', 'Integração Google Sheets'],
      cta: 'Escolher Padrão',
      highlight: false
    },
    {
      name: 'Profissional',
      price: '799',
      users: '10 Usuários',
      features: ['IA Preditiva', 'Módulo Jurídico', 'Gestão de Articuladores', 'Suporte WhatsApp', 'API Access'],
      cta: 'Assinar Profissional',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Sob Consulta',
      users: 'Ilimitado',
      features: ['White Label', 'Servidores Dedicados', 'IA Customizada', 'Treinamento In-loco', 'Migração de Dados'],
      cta: 'Falar com Consultor',
      highlight: false,
      isCustom: true
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center pb-5">
        <p className="text-red-600 font-bold text-sm mb-2 animate-pulse">***valores em fase de validação</p>
        <h2 className="text-3xl font-bold text-gray-900">Planos e Investimento</h2>
        <p className="text-gray-500 mt-2">Modelos escaláveis para campanhas de todos os tamanhos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative bg-white rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col
              ${plan.highlight ? 'border-indigo-600 shadow-lg ring-1 ring-indigo-600' : 'border-gray-200 shadow-sm'}
            `}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star size={12} fill="white" /> Recomendado
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.users}</p>
            </div>

            <div className="mb-6">
              {plan.isCustom ? (
                <span className="text-3xl font-bold text-gray-900">Consulte</span>
              ) : (
                <div className="flex items-baseline">
                  <span className="text-sm text-gray-500 mr-1">R$</span>
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">/mês</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
              plan.highlight 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-xl p-6 mt-8 relative border border-gray-200 shadow-sm">
         <div className="absolute -top-3 left-6 bg-gray-100 px-2">
            <p className="text-red-600 font-bold text-[10px] uppercase tracking-tight">valores em validação</p>
         </div>
         <h4 className="font-bold text-gray-800 mb-4">Adicionais por Volume de Dados</h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="block font-bold">Até 5.000 eleitores</span>
              <span className="text-green-600 font-semibold">Incluso</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="block font-bold">Até 20.000 eleitores</span>
              <span className="text-gray-600">+ R$ 49,00/mês</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="block font-bold">Até 100.000 eleitores</span>
              <span className="text-gray-600">+ R$ 199,00/mês</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
