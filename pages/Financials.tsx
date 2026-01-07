import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, ComposedChart, Area
} from 'recharts';
import { FinancialYear } from '../types';
import { Download, Upload, Save, FileText } from 'lucide-react';

interface FinancialsProps {
  data: FinancialYear[];
  setData: (data: FinancialYear[]) => void;
}

const Financials: React.FC<FinancialsProps> = ({ data, setData }) => {
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (index: number, field: keyof FinancialYear, value: string) => {
    const newData = [...data];
    const numValue = parseFloat(value) || 0;
    newData[index] = { ...newData[index], [field]: numValue };
    
    // Auto-calculate profit
    if (field === 'revenue' || field === 'costs') {
      newData[index].profit = newData[index].revenue - newData[index].costs;
    }
    setData(newData);
  };

  const exportCSV = () => {
    const headers = ['Ano', 'Receita', 'Custos', 'Lucro'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => `${row.year},${row.revenue},${row.costs},${row.profit}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mandato360_financeiro.csv';
    link.click();
  };

  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        const lines = text.split('\n').slice(1); // Skip header
        const newData: FinancialYear[] = lines
          .filter(line => line.trim() !== '')
          .map(line => {
            const [year, revenue, costs, profit] = line.split(',');
            return {
              year: parseInt(year),
              revenue: parseFloat(revenue),
              costs: parseFloat(costs),
              profit: parseFloat(profit)
            };
          });
        if (newData.length > 0) setData(newData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div>
           <h2 className="text-3xl font-bold text-gray-900">Projeções Financeiras</h2>
           <p className="text-gray-500 mt-2">2026 – 2030 (Simulação de Cenário)</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FileText size={16} /> PDF
          </button>
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download size={16} /> XLS/CSV
          </button>
          <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Upload size={16} /> Importar
            <input type="file" accept=".csv" onChange={importCSV} className="hidden" />
          </label>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[350px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Evolução de Receita vs Custos</h3>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `R$${val/1000}k`} tickLine={false} axisLine={false} width={80} />
              <Tooltip formatter={(val: number) => `R$ ${val.toLocaleString('pt-BR')}`} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Receita" fill="#e0e7ff" stroke="#4f46e5" strokeWidth={3} />
              <Bar dataKey="costs" name="Custos" fill="#cbd5e1" barSize={20} radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-[350px]">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Crescimento do Lucro Líquido</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(val) => `R$${val/1000}k`} tickLine={false} axisLine={false} width={80} />
              <Tooltip formatter={(val: number) => `R$ ${val.toLocaleString('pt-BR')}`} />
              <Legend />
              <Line type="monotone" dataKey="profit" name="Lucro" stroke="#22c55e" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Editable Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold">Detalhamento Financeiro</h3>
          <button 
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${editMode ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {editMode ? <><Save size={16} /> Salvar Alterações</> : 'Editar Tabela'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4 text-left">Ano</th>
                <th className="px-6 py-4">Receita (R$)</th>
                <th className="px-6 py-4">Custos (R$)</th>
                <th className="px-6 py-4 font-bold text-gray-800">Lucro (R$)</th>
                <th className="px-6 py-4">Margem (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, idx) => (
                <tr key={row.year} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-left font-medium">{row.year}</td>
                  <td className="px-6 py-4">
                    {editMode ? (
                      <input 
                        type="number" 
                        value={row.revenue}
                        onChange={(e) => handleInputChange(idx, 'revenue', e.target.value)}
                        className="w-32 p-1 border rounded text-right"
                      />
                    ) : (
                      row.revenue.toLocaleString('pt-BR')
                    )}
                  </td>
                  <td className="px-6 py-4 text-red-500">
                    {editMode ? (
                      <input 
                        type="number" 
                        value={row.costs}
                        onChange={(e) => handleInputChange(idx, 'costs', e.target.value)}
                        className="w-32 p-1 border rounded text-right"
                      />
                    ) : (
                      `- ${row.costs.toLocaleString('pt-BR')}`
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    {row.profit.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {((row.profit / row.revenue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;
