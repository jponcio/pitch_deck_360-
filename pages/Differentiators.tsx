import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Differentiators: React.FC = () => {
  const diffs = [
    { title: "Mapa Territorial Avançado", desc: "Não é apenas um mapa de calor. Cruzamos dados de 3 eleições passadas com IDH e obras públicas." },
    { title: "Dashboard Eleitoral 360", desc: "Visão unificada de redes sociais, finanças de campanha e mobilização de rua." },
    { title: "IA Consill Integrada", desc: "Nosso maior trunfo. Uma IA treinada em regimentos internos e leis orgânicas que atua como consultor jurídico 24/7." },
    { title: "Kanban de Entregas", desc: "Gestão visual de promessas de campanha e obras em andamento por bairro." },
    { title: "Projeção Eleitoral IA", desc: "Algoritmos que estimam o quociente eleitoral e meta de votos por zona." },
    { title: "Gestão de Articuladores", desc: "Controle hierárquico de lideranças de bairro e cabos eleitorais." },
    { title: "Integração Google Sheets", desc: "Edite na planilha, veja no painel. Sem fricção de importação complexa." },
    { title: "Painel Partidário", desc: "Visão macro para presidentes de partido monitorarem o desempenho de toda a chapa." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900">Diferenciais Competitivos</h2>
        <p className="text-gray-500 mt-2">Por que o Mandato 360° vence a concorrência.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diffs.map((item, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
            <CheckCircle2 className="text-indigo-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Differentiators;
