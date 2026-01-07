import React from 'react';
import { Layers, Users, Wallet, Wrench } from 'lucide-react';

const BusinessModel: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900">Business Model Canvas</h2>
        <p className="text-gray-500 mt-2">Estrutura estratégica de geração de valor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Value Prop */}
        <div className="lg:col-span-1 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
           <div className="flex items-center gap-2 mb-4">
             <Layers className="text-indigo-600" />
             <h3 className="font-bold text-indigo-900">Proposta de Valor</h3>
           </div>
           <ul className="space-y-2 text-indigo-800 text-sm">
             <li>• Inteligência Territorial Avançada</li>
             <li>• IA Aplicada a Leis e Estratégia</li>
             <li>• Dados em Tempo Real (Google Sheets)</li>
             <li>• Produtividade Política (Kanban/CRM)</li>
             <li>• Gestão Centralizada de Mandato</li>
           </ul>
        </div>

        {/* Customer Segments */}
        <div className="lg:col-span-1 bg-blue-50 p-6 rounded-xl border border-blue-100">
           <div className="flex items-center gap-2 mb-4">
             <Users className="text-blue-600" />
             <h3 className="font-bold text-blue-900">Segmentos de Clientes</h3>
           </div>
           <ul className="space-y-2 text-blue-800 text-sm">
             <li>• Vereadores (Cidades Médias/Grandes)</li>
             <li>• Prefeitos e Vice-Prefeitos</li>
             <li>• Deputados Estaduais e Federais</li>
             <li>• Partidos Políticos (Diretórios)</li>
             <li>• Consultorias e Marketing Político</li>
           </ul>
        </div>

         {/* Revenue */}
         <div className="lg:col-span-1 bg-green-50 p-6 rounded-xl border border-green-100">
           <div className="flex items-center gap-2 mb-4">
             <Wallet className="text-green-600" />
             <h3 className="font-bold text-green-900">Fontes de Receita</h3>
           </div>
           <ul className="space-y-2 text-green-800 text-sm">
             <li>• Assinatura SaaS Mensal (MRR)</li>
             <li>• Setup e Implementação Avançada</li>
             <li>• Módulos Premium (Jurídico/Big Data)</li>
             <li>• Customização Enterprise</li>
             <li>• Consultoria de Análise Territorial</li>
           </ul>
        </div>

         {/* Cost Structure */}
         <div className="lg:col-span-3 bg-gray-50 p-6 rounded-xl border border-gray-200">
           <div className="flex items-center gap-2 mb-4">
             <Wrench className="text-gray-600" />
             <h3 className="font-bold text-gray-900">Estrutura de Custos</h3>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
             <div className="bg-white p-3 rounded shadow-sm">Desenvolvimento (Dev Team)</div>
             <div className="bg-white p-3 rounded shadow-sm">Infraestrutura Cloud (AWS/Google)</div>
             <div className="bg-white p-3 rounded shadow-sm">API Costs (OpenAI/Gemini/Maps)</div>
             <div className="bg-white p-3 rounded shadow-sm">Marketing & Vendas (CAC)</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BusinessModel;
