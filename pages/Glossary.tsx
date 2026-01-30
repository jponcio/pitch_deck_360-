
import React from 'react';
import { BookOpen, Target, DollarSign, Cpu, Search } from 'lucide-react';

const Glossary: React.FC = () => {
  const sections = [
    {
      title: "Métricas de Mercado",
      icon: <Target className="text-blue-600" />,
      terms: [
        { term: "TAM (Total Addressable Market)", desc: "Mercado Total Endereçável. Representa a oportunidade total de receita disponível para um produto ou serviço se atingisse 100% de market share." },
        { term: "SAM (Serviceable Available Market)", desc: "Mercado Endereçável Útil. A fatia do TAM que pode ser atendida pelo seu modelo de negócio, geografia e canal." },
        { term: "SOM (Serviceable Obtainable Market)", desc: "Mercado Acessível e Obtível. A fatia do mercado que você projeta capturar realisticamente nos primeiros anos." },
        { term: "Market Share", desc: "A fatia de mercado que uma empresa detém em relação ao total do setor." }
      ]
    },
    {
      title: "Investimento e Finanças",
      icon: <DollarSign className="text-green-600" />,
      terms: [
        { term: "Valuation", desc: "O valor estimado de uma empresa. Pode ser 'Pre-Money' (antes do investimento) ou 'Post-Money' (depois)." },
        { term: "Equity", desc: "Participação societária. Representa a propriedade de uma parte da empresa." },
        { term: "Cap Table", desc: "Tabela de Capitalização. Registro que mostra quem são os donos da empresa e qual a porcentagem de cada um." },
        { term: "SaaS (Software as a Service)", desc: "Software como Serviço. Modelo de negócio onde o cliente paga uma assinatura (mensal/anual) para usar o sistema." },
        { term: "MRR / ARR", desc: "Monthly Recurring Revenue / Annual Recurring Revenue. Receita recorrente mensal ou anual da empresa." },
        { term: "Seed Round", desc: "Rodada Semente. O primeiro investimento significativo para provar o modelo de negócio e iniciar a tração." },
        { term: "Slice Pie", desc: "Metodologia de divisão de participação (equity) baseada na contribuição relativa de cada membro antes do investimento." }
      ]
    },
    {
      title: "Tecnologia e Performance",
      icon: <Cpu className="text-purple-600" />,
      terms: [
        { term: "CAC (Customer Acquisition Cost)", desc: "Custo de Aquisição de Cliente. Quanto a empresa gasta em marketing e vendas para conquistar um novo cliente." },
        { term: "LTV (Lifetime Value)", desc: "Valor do Tempo de Vida. O lucro total estimado que um cliente gera para a empresa durante todo o período de relacionamento." },
        { term: "Churn Rate", desc: "Taxa de Rotatividade. A porcentagem de clientes que cancelam a assinatura em um determinado período." },
        { term: "Vesting", desc: "Processo onde um sócio ou funcionário ganha o direito à sua participação societária gradualmente ao longo do tempo ou metas." },
        { term: "Cliff", desc: "Período mínimo de permanência (geralmente 1 ano) antes que o processo de Vesting comece a contar." },
        { term: "BI (Business Intelligence)", desc: "Inteligência de Negócios. Coleta, organização e análise de dados para suporte à tomada de decisão estratégica." }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-indigo-600" /> Glossário Mandato 360°
        </h2>
        <p className="text-gray-500 mt-2">Guia prático para entender os termos de tecnologia e investimento utilizados neste projeto.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              {section.icon}
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">{section.title}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {section.terms.map((item, tIdx) => (
                <div key={tIdx} className="group">
                  <h4 className="font-bold text-indigo-700 text-lg mb-2 group-hover:translate-x-1 transition-transform">{item.term}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-bold mb-2">Ficou com alguma dúvida?</h3>
        <p className="text-indigo-200 mb-6">Nossa IA está treinada para explicar qualquer termo em profundidade.</p>
        <button className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
          Perguntar para Consill IA
        </button>
      </div>
    </div>
  );
};

export default Glossary;
