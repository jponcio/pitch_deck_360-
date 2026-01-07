import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const MarketAnalysis: React.FC = () => {
  const data = [
    { name: 'TAM', value: 358, label: 'Mercado Total', users: '74.750', color: '#94a3b8' }, // Slate 400
    { name: 'SAM', value: 94.7, label: 'Mercado Alcançável', users: '22.000', color: '#6366f1' }, // Indigo 500
    { name: 'SOM', value: 18, label: 'Mercado Obtível', users: '900', color: '#22c55e' }, // Green 500
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="border-b border-gray-200 pb-5">
        <h2 className="text-3xl font-bold text-gray-900">Análise de Mercado</h2>
        <p className="text-gray-500 mt-2">Potencial de Receita e Penetração de Mercado (TAM / SAM / SOM)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
            <div className={`absolute top-0 left-0 w-2 h-full`} style={{ backgroundColor: item.color }}></div>
            <h3 className="text-lg font-bold text-gray-900 pl-4">{item.name}</h3>
            <p className="text-sm text-gray-500 pl-4 mb-4">{item.label}</p>
            <div className="pl-4">
               <p className="text-3xl font-extrabold text-gray-800">R$ {item.value}M</p>
               <p className="text-sm font-medium text-gray-400 mt-1">/ ano</p>
               <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Potencial:</span>
                 <span className="text-sm font-semibold text-gray-700">{item.users} usuários</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[400px]">
        <h3 className="text-lg font-bold mb-6">Comparativo de Valor de Mercado (Em Milhões de R$)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e2e8f0"/>
            <XAxis type="number" stroke="#64748b" />
            <YAxis dataKey="name" type="category" stroke="#64748b" width={50} fontWeight="bold"/>
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-indigo-900 text-white p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-2">Insight Estratégico</h4>
        <p className="text-indigo-200 text-sm">
          Apesar do TAM ser de R$ 358 milhões, nossa estratégia foca agressivamente no SOM de R$ 18 milhões nos primeiros 36 meses, atacando principalmente vereadores de cidades médias e deputados estaduais, onde a dor de gestão é mais latente e a concorrência é tecnologicamente inferior.
        </p>
      </div>
    </div>
  );
};

export default MarketAnalysis;
