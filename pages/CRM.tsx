
import React, { useState } from 'react';
import { Search, Plus, Phone, Calendar, MoreHorizontal, Filter } from 'lucide-react';
import { CRMContact } from '../types';
import { INITIAL_CRM_DATA } from '../constants';

const CRM: React.FC = () => {
  const [contacts, setContacts] = useState<CRMContact[]>(INITIAL_CRM_DATA);
  const [search, setSearch] = useState('');

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-700';
      case 'Em Negociação': return 'bg-yellow-100 text-yellow-700';
      case 'Fechado': return 'bg-green-100 text-green-700';
      case 'Perdido': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
       <div className="flex justify-between items-center border-b border-gray-200 pb-5 flex-shrink-0">
        <div>
           <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider mb-1 block">* destinado equipe interna</span>
           <h2 className="text-3xl font-bold text-gray-900">CRM Político</h2>
           <p className="text-gray-500 mt-2">Gestão de relacionamento com mandatários e partidos.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Novo Lead
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou cidade..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 flex items-center gap-2">
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Cargo / Função</th>
                <th className="px-6 py-4">Cidade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Último Contato</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.role}</td>
                  <td className="px-6 py-4 text-gray-600">{contact.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(contact.lastContact).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Phone size={16} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Calendar size={16} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={16} /></button>
                    </div>
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

export default CRM;
