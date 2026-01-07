
import React, { useState, useEffect } from 'react';
import { 
  Slice, Info, AlertTriangle, Plus, Trash2, Download, FileText, 
  CheckCircle, Shield, Scale, HelpCircle, Lock
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// --- TYPES ---

type ContributionType = 'hours' | 'delivery' | 'capital';

interface Contributor {
  id: string;
  name: string;
  category: string;
  type: ContributionType;
  quantity: number; // hours or unit (1)
  valueUnit: number; // hourly rate or flat fee
  weight: number;
  startDate: string;
  cliffMonths: number;
  vestingMonths: number;
  hasMilestone: boolean;
  milestoneDesc: string;
  milestoneTriggerValue: number;
  isLocked: boolean; // Not eligible for equity
}

interface CategoryCap {
  id: string;
  name: string;
  maxPercent: number;
}

// --- CONSTANTS ---

const DEFAULT_CATEGORIES: CategoryCap[] = [
  { id: 'legal', name: 'Jurídico', maxPercent: 0.5 },
  { id: 'dev', name: 'Devs', maxPercent: 3.0 },
  { id: 'mkt', name: 'Marketing', maxPercent: 0.5 },
  { id: 'advisor', name: 'Advisor', maxPercent: 1.0 },
  { id: 'smart', name: 'Smart Money', maxPercent: 1.0 },
];

const DEFAULT_CONTRIBUTORS: Contributor[] = [
  { 
    id: '1', name: 'Dev Frontend A', category: 'dev', type: 'hours', 
    quantity: 120, valueUnit: 60, weight: 1, startDate: '2025-01-10', 
    cliffMonths: 6, vestingMonths: 24, hasMilestone: false, milestoneDesc: '', milestoneTriggerValue: 0, isLocked: false 
  },
  { 
    id: '2', name: 'Advogado Parceiro', category: 'legal', type: 'delivery', 
    quantity: 1, valueUnit: 5000, weight: 1, startDate: '2025-02-01', 
    cliffMonths: 0, vestingMonths: 12, hasMilestone: false, milestoneDesc: '', milestoneTriggerValue: 0, isLocked: false 
  },
  { 
    id: '3', name: 'Advisor Estratégico', category: 'advisor', type: 'hours', 
    quantity: 10, valueUnit: 300, weight: 2, startDate: '2024-12-01', 
    cliffMonths: 3, vestingMonths: 24, hasMilestone: true, milestoneDesc: 'Receita > 150k', milestoneTriggerValue: 150000, isLocked: false 
  },
  { 
    id: '4', name: 'Agência Mkt', category: 'mkt', type: 'delivery', 
    quantity: 1, valueUnit: 2500, weight: 1, startDate: '2025-03-01', 
    cliffMonths: 3, vestingMonths: 12, hasMilestone: false, milestoneDesc: '', milestoneTriggerValue: 0, isLocked: false 
  },
  { 
    id: '5', name: 'Dev Backend Lead', category: 'dev', type: 'hours', 
    quantity: 160, valueUnit: 80, weight: 1.2, startDate: '2025-01-15', 
    cliffMonths: 6, vestingMonths: 24, hasMilestone: true, milestoneDesc: 'MVP Lançado', milestoneTriggerValue: 0, isLocked: false 
  },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6'];

const SlicePie: React.FC = () => {
  // --- STATE ---
  const [poolSize, setPoolSize] = useState(5.0); // 5% total pool
  const [mode, setMode] = useState<'equity' | 'phantom'>('phantom');
  const [categories, setCategories] = useState<CategoryCap[]>(DEFAULT_CATEGORIES);
  const [contributors, setContributors] = useState<Contributor[]>(DEFAULT_CONTRIBUTORS);

  // --- CALCULATIONS ---

  const calculateEconomicValue = (c: Contributor) => {
    if (c.isLocked) return 0;
    if (c.type === 'hours') return c.quantity * c.valueUnit * c.weight;
    if (c.type === 'delivery') return c.quantity * c.valueUnit * c.weight;
    if (c.type === 'capital') return c.quantity; // Assuming quantity is cash amount
    return 0;
  };

  // Total economic value of all contributions
  const totalEconomicValue = contributors.reduce((acc, c) => acc + calculateEconomicValue(c), 0);

  // Computed data for charts and tables
  const computedContributors = contributors.map(c => {
    const ecoVal = calculateEconomicValue(c);
    // Simple allocation: (My Value / Total Value) * Pool Size
    const sharePercent = totalEconomicValue > 0 ? (ecoVal / totalEconomicValue) * poolSize : 0;
    return { ...c, ecoVal, sharePercent };
  });

  // Aggregations per category
  const categoryUsage = categories.map(cat => {
    const totalShare = computedContributors
      .filter(c => c.category === cat.id)
      .reduce((acc, c) => acc + c.sharePercent, 0);
    return { ...cat, totalShare };
  });

  const totalDistributed = computedContributors.reduce((acc, c) => acc + c.sharePercent, 0);
  const isOverLimit = totalDistributed > poolSize;

  // Chart Data
  const pieData = computedContributors
    .filter(c => c.sharePercent > 0)
    .map((c, i) => ({
      name: c.name,
      value: c.sharePercent,
      color: COLORS[i % COLORS.length]
    }));
  
  const barData = categoryUsage.map(cat => ({
    name: cat.name,
    Uso: cat.totalShare,
    Limite: cat.maxPercent
  }));

  // --- ACTIONS ---

  const addContributor = () => {
    const newId = (Math.max(...contributors.map(c => parseInt(c.id))) + 1).toString();
    setContributors([...contributors, {
      id: newId, name: 'Novo Contribuidor', category: 'dev', type: 'hours',
      quantity: 0, valueUnit: 60, weight: 1, startDate: new Date().toISOString().split('T')[0],
      cliffMonths: 6, vestingMonths: 24, hasMilestone: false, milestoneDesc: '', milestoneTriggerValue: 0, isLocked: false
    }]);
  };

  const removeContributor = (id: string) => {
    setContributors(contributors.filter(c => c.id !== id));
  };

  const updateContributor = (id: string, field: keyof Contributor, value: any) => {
    setContributors(contributors.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const exportCSV = () => {
    const headers = ['Nome', 'Categoria', 'Tipo', 'Qtd', 'ValorUnit', 'Peso', 'ValorEcon', '%Share', 'Vesting(m)', 'Cliff(m)'];
    const rows = computedContributors.map(c => [
      c.name, c.category, c.type, c.quantity, c.valueUnit, c.weight, c.ecoVal, c.sharePercent.toFixed(4), c.vestingMonths, c.cliffMonths
    ].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'slice_pie_simulacao.csv';
    link.click();
  };

  // --- FORMATTERS ---
  const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const percent = (val: number) => `${val.toFixed(2)}%`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. HEADER */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white"><Slice size={24}/></div>
          <h2 className="text-3xl font-bold text-gray-900">Slice Pie Simulator</h2>
        </div>
        <p className="text-gray-500 max-w-3xl">
          Programa de Participação Restrito. Reservamos até <strong className="text-indigo-600">5% do equity</strong> para contribuições estratégicas iniciais. Este simulador garante transparência e governança.
        </p>
      </div>

      {/* 2. EXPLANATORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><Info size={16} className="text-blue-500"/> O que é?</h4>
           <p className="text-xs text-gray-600">
             Modelo dinâmico (Slicing Pie) para alocar participação com base no valor real contribuído (tempo, dinheiro, relacionamento) antes do investimento.
           </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><CheckCircle size={16} className="text-green-500"/> Por que usar?</h4>
           <ul className="text-xs text-gray-600 list-disc ml-4 space-y-1">
             <li>Governança clara desde o dia 1</li>
             <li>Meritocracia (quem entrega mais, ganha mais)</li>
             <li>Protege o caixa da startup</li>
           </ul>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><Scale size={16} className="text-orange-500"/> Regras Chave</h4>
           <ul className="text-xs text-gray-600 list-disc ml-4 space-y-1">
             <li>Teto máximo de 5% do Cap Table</li>
             <li>Caps (limites) por categoria</li>
             <li>Obrigatório contrato de Vesting</li>
           </ul>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
           <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><Shield size={16} className="text-purple-500"/> Opções Legais</h4>
           <p className="text-xs text-gray-600">
             Recomendamos <strong>Phantom Shares</strong> (Direito econômico em evento de liquidez) para evitar complexidade societária inicial.
           </p>
        </div>
      </div>

      {/* 3. MAIN SIMULATOR AREA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: INPUTS (7 cols) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Global Settings */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-wrap gap-6 items-center justify-between">
             <div className="flex items-center gap-3">
               <label className="text-sm font-bold text-gray-700">Pool Reservado (%):</label>
               <input 
                 type="number" value={poolSize} onChange={e => setPoolSize(parseFloat(e.target.value))}
                 className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold text-indigo-600 bg-white"
               />
             </div>
             <div className="flex items-center gap-3">
               <label className="text-sm font-bold text-gray-700">Modelo:</label>
               <div className="flex bg-gray-200 p-1 rounded-lg">
                 <button 
                    onClick={() => setMode('equity')}
                    className={`px-3 py-1 text-xs font-bold rounded ${mode === 'equity' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                 >Equity Real</button>
                 <button 
                    onClick={() => setMode('phantom')}
                    className={`px-3 py-1 text-xs font-bold rounded ${mode === 'phantom' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
                 >Phantom Shares</button>
               </div>
             </div>
             <div className="text-xs text-gray-500 text-right">
                <p>Valor Econômico Total Mapeado:</p>
                <p className="font-bold text-lg text-gray-900">{money(totalEconomicValue)}</p>
             </div>
          </div>

          {/* Contributors List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
               <h3 className="font-bold text-gray-800">Contribuidores e Entregas</h3>
               <button onClick={addContributor} className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                 <Plus size={14} /> Adicionar
               </button>
             </div>
             
             <div className="divide-y divide-gray-100">
               {contributors.map((c) => (
                 <div key={c.id} className={`p-4 hover:bg-gray-50 transition-colors ${c.isLocked ? 'opacity-50 grayscale' : ''}`}>
                    <div className="flex flex-wrap gap-4 items-start mb-3">
                      {/* Name & Cat */}
                      <div className="flex-1 min-w-[200px]">
                         <input 
                           type="text" value={c.name} onChange={e => updateContributor(c.id, 'name', e.target.value)}
                           className="w-full font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 outline-none mb-1"
                           placeholder="Nome do Contribuidor"
                         />
                         <div className="flex gap-2">
                            <select 
                              value={c.category} onChange={e => updateContributor(c.id, 'category', e.target.value)}
                              className="text-xs bg-gray-100 border-none rounded px-2 py-1 cursor-pointer"
                            >
                              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <select 
                              value={c.type} onChange={e => updateContributor(c.id, 'type', e.target.value)}
                              className="text-xs bg-gray-100 border-none rounded px-2 py-1 cursor-pointer"
                            >
                              <option value="hours">Horas</option>
                              <option value="delivery">Entrega Fixa</option>
                              <option value="capital">Capital (R$)</option>
                            </select>
                         </div>
                      </div>

                      {/* Values */}
                      <div className="flex gap-4">
                         <div>
                           <label className="block text-[10px] text-gray-400 uppercase font-bold">Qtd ({c.type === 'hours' ? 'h' : 'un'})</label>
                           <input 
                             type="number" value={c.quantity} onChange={e => updateContributor(c.id, 'quantity', parseFloat(e.target.value))}
                             className="w-16 text-sm border border-gray-200 rounded p-1 bg-white text-right"
                           />
                         </div>
                         {c.type !== 'capital' && (
                           <div>
                             <label className="block text-[10px] text-gray-400 uppercase font-bold">Valor ({c.type === 'hours' ? '/h' : 'Fix'})</label>
                             <input 
                               type="number" value={c.valueUnit} onChange={e => updateContributor(c.id, 'valueUnit', parseFloat(e.target.value))}
                               className="w-20 text-sm border border-gray-200 rounded p-1 bg-white text-right"
                             />
                           </div>
                         )}
                         <div>
                           <label className="block text-[10px] text-gray-400 uppercase font-bold">Peso</label>
                           <input 
                             type="number" step="0.1" value={c.weight} onChange={e => updateContributor(c.id, 'weight', parseFloat(e.target.value))}
                             className="w-12 text-sm border border-gray-200 rounded p-1 bg-white text-center"
                           />
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-auto">
                        <button onClick={() => updateContributor(c.id, 'isLocked', !c.isLocked)} className={`p-2 rounded hover:bg-gray-200 text-gray-400 ${c.isLocked ? 'text-red-500' : ''}`} title="Lock/Unlock">
                           <Lock size={16} />
                        </button>
                        <button onClick={() => removeContributor(c.id)} className="p-2 rounded hover:bg-red-100 text-gray-400 hover:text-red-600">
                           <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Advanced Row (Vesting/Milestones) */}
                    <div className="flex flex-wrap gap-4 items-center bg-gray-50/50 p-2 rounded-lg border border-gray-100 text-xs">
                       <div className="flex items-center gap-2">
                          <span className="text-gray-500">Vesting:</span>
                          <input 
                            type="number" value={c.vestingMonths} onChange={e => updateContributor(c.id, 'vestingMonths', parseFloat(e.target.value))}
                            className="w-10 text-center bg-white border border-gray-200 rounded p-0.5"
                          /> meses
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-gray-500">Cliff:</span>
                          <input 
                            type="number" value={c.cliffMonths} onChange={e => updateContributor(c.id, 'cliffMonths', parseFloat(e.target.value))}
                            className="w-10 text-center bg-white border border-gray-200 rounded p-0.5"
                          /> meses
                       </div>
                       <label className="flex items-center gap-1 cursor-pointer">
                          <input 
                             type="checkbox" checked={c.hasMilestone} onChange={e => updateContributor(c.id, 'hasMilestone', e.target.checked)}
                             className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-600">Milestone Trigger?</span>
                       </label>
                       {c.hasMilestone && (
                         <input 
                            type="text" value={c.milestoneDesc} onChange={e => updateContributor(c.id, 'milestoneDesc', e.target.value)}
                            className="flex-1 bg-white border border-gray-200 rounded p-1 px-2" placeholder="Ex: Receita > 150k"
                         />
                       )}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Legal Checklist */}
          <div className="bg-slate-800 text-slate-200 p-6 rounded-xl">
             <h4 className="font-bold flex items-center gap-2 mb-4 text-white"><Scale size={18}/> Checklist Jurídico Simplificado</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5" /> <span>Contrato de Vesting Assinado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5" /> <span>Cláusula de Cliff (Min. 6 meses)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5" /> <span>Definição de Good/Bad Leaver</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5" /> <span>Propriedade Intelectual Cedida à Empresa</span>
                  </div>
                </div>
             </div>
             <p className="mt-4 text-[10px] text-slate-500 italic">
               *Aviso: esta ferramenta serve para simulação e organização interna. Não substitui avaliação jurídica. Recomenda-se formalizar todos os acordos com advogado especializado.
             </p>
          </div>

        </div>

        {/* RIGHT PANEL: DASHBOARD (5 cols) */}
        <div className="xl:col-span-5 space-y-6">
           
           {/* Alerts */}
           {isOverLimit && (
             <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 animate-pulse">
                <AlertTriangle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-red-800 text-sm">Atenção: Pool Excedido!</h4>
                  <p className="text-xs text-red-600">
                    O total distribuído ({totalDistributed.toFixed(2)}%) supera o limite do pool ({poolSize}%). Reduza contribuições ou aumente o pool.
                  </p>
                </div>
             </div>
           )}

           {/* Pie Chart */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Distribuição do Pool ({poolSize}%)</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                         data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                      >
                         {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(val: number) => percent(val)} />
                      <Legend />
                   </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                 <p className="text-sm text-gray-500">Pool Restante Livre:</p>
                 <p className="text-2xl font-bold text-green-600">{percent(Math.max(0, poolSize - totalDistributed))}</p>
              </div>
           </div>

           {/* Bar Chart (Caps) */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Uso por Categoria vs Caps</h3>
              <div className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{top:0, left:40, right:20, bottom:0}}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/>
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" width={80} tick={{fontSize:10}} interval={0} />
                       <Tooltip formatter={(val: number) => percent(val)} />
                       <Bar dataKey="Uso" fill="#4f46e5" radius={[0,4,4,0]} barSize={10} name="Usado" />
                       <Bar dataKey="Limite" fill="#e2e8f0" radius={[0,4,4,0]} barSize={10} name="Max Cap" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Vesting Table Summary */}
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm">Resumo de Atribuição</h3>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-white text-gray-500">
                  <tr>
                    <th className="px-3 py-2 text-left">Nome</th>
                    <th className="px-3 py-2 text-right">Valor Econ.</th>
                    <th className="px-3 py-2 text-right">% Equity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {computedContributors.map(c => (
                    <tr key={c.id}>
                      <td className="px-3 py-2 font-medium text-gray-900">{c.name}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{money(c.ecoVal)}</td>
                      <td className="px-3 py-2 text-right font-bold text-indigo-600">{percent(c.sharePercent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>

           {/* Export Actions */}
           <div className="flex gap-2">
              <button onClick={exportCSV} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-bold text-sm">
                 <Download size={16} /> Exportar CSV
              </button>
              <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-bold text-sm">
                 <FileText size={16} /> Gerar PDF
              </button>
           </div>

        </div>
      </div>

    </div>
  );
};

export default SlicePie;
