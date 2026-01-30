
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, TrendingUp, CheckCircle, Shield, Users, 
  DollarSign, Calculator, Target, Rocket, MousePointerClick, 
  ChevronRight, ChevronLeft
} from 'lucide-react';

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Problema",
      subtitle: "O Caos da Gestão Política Atual",
      icon: <AlertTriangle size={48} className="text-red-500" />,
      content: (
        <ul className="space-y-6 text-xl text-gray-700">
          <li className="flex items-start gap-4">
            <span className="bg-red-100 p-1.5 rounded text-red-600 mt-1 shadow-sm">❌</span>
            <span><strong>Mandatos sem visão territorial:</strong> Decisões baseadas em "achismo", não em dados.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-red-100 p-1.5 rounded text-red-600 mt-1 shadow-sm">❌</span>
            <span><strong>Dados dispersos:</strong> Informações perdidas em planilhas offline, WhatsApp e cadernos.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-red-100 p-1.5 rounded text-red-600 mt-1 shadow-sm">❌</span>
            <span><strong>Falta de estratégia:</strong> Ações reativas, sem planejamento de longo prazo.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-red-100 p-1.5 rounded text-red-600 mt-1 shadow-sm">❌</span>
            <span><strong>Sistemas genéricos:</strong> CRMs básicos que ignoram o contexto eleitoral brasileiro.</span>
          </li>
        </ul>
      ),
      bgColor: "bg-white"
    },
    {
      id: 2,
      title: "Oportunidade",
      subtitle: "O Momento Perfeito é Agora",
      icon: <TrendingUp size={48} className="text-blue-500" />,
      content: (
        <ul className="space-y-6 text-xl text-gray-700">
          <li className="flex items-center gap-4">
            <CheckCircle className="text-blue-500 w-8 h-8" />
            <span><strong>Ano Eleitoral 2026:</strong> Demanda explosiva por tecnologia política.</span>
          </li>
          <li className="flex items-center gap-4">
            <CheckCircle className="text-blue-500 w-8 h-8" />
            <span><strong>Carência de Inteligência:</strong> O mercado clama por dados georreferenciados.</span>
          </li>
          <li className="flex items-center gap-4">
            <CheckCircle className="text-blue-500 w-8 h-8" />
            <span><strong>Exigência Profissional:</strong> Mandatos buscam visual moderno e praticidade.</span>
          </li>
          <li className="flex items-center gap-4">
            <CheckCircle className="text-blue-500 w-8 h-8" />
            <span><strong>IA + Mapas:</strong> O diferencial que eleva o nível da tomada de decisão.</span>
          </li>
        </ul>
      ),
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      title: "Solução: Meu Mandato 360°",
      subtitle: "Inteligência Política + Territorial + IA",
      icon: <CheckCircle size={48} className="text-green-500" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 mb-2 text-xl">Recursos-Chave:</h4>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-2xl">🗺️</span> Mapa Inteligente (Georreferenciado)
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-2xl">📊</span> Dashboard Eleitoral Completo
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-2xl">⚡</span> Diagnósticos Automáticos
            </div>
          </div>
          <div className="space-y-4 pt-10 md:pt-0">
             {/* Spacer for alignment or subtitle if needed */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-2xl">📋</span> Kanban de Entregas e Projetos
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-2xl">📈</span> Projeções Eleitorais com IA
            </div>
            <div className="bg-indigo-600 text-white p-5 rounded-xl shadow-lg border border-indigo-500 font-bold flex items-center gap-3 transform scale-105">
              <span className="text-2xl">🤖</span> Consill IA: Assistente Integrado
            </div>
          </div>
        </div>
      ),
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      title: "Diferenciais",
      subtitle: "Por que somos únicos?",
      icon: <Shield size={48} className="text-indigo-600" />,
      content: (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex gap-4 items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm opacity-70">
              <div className="bg-indigo-100 p-2 rounded text-indigo-700 font-bold text-xs uppercase">NÃO É</div>
              <div className="flex flex-col">
                <span className="text-gray-600 line-through text-lg">Apenas um CRM de contatos</span>
                <span className="text-gray-600 line-through text-lg">Um BI genérico complexo</span>
              </div>
            </div>
            <div className="flex-1 flex gap-4 items-center bg-indigo-600 p-6 rounded-2xl shadow-xl text-white transform md:scale-105">
              <div className="bg-white/20 p-2 rounded text-white font-bold text-xs uppercase">É</div>
              <span className="font-bold text-2xl">Gestão Completa + Território + Estratégia</span>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-6 mt-6 text-lg font-medium text-gray-700">
            <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"><CheckCircle className="text-indigo-600" /> Conecta Google Sheets</li>
            <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"><CheckCircle className="text-indigo-600" /> IA Integrada Nativa</li>
            <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"><CheckCircle className="text-indigo-600" /> Interface Moderna (UX)</li>
            <li className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"><CheckCircle className="text-indigo-600" /> Comparativo imbatível</li>
          </ul>
        </div>
      ),
      bgColor: "bg-indigo-50"
    },
    {
      id: 5,
      title: "Mercado (TAM / SAM / SOM)",
      subtitle: "Potencial Gigante e Recorrente",
      icon: <Users size={48} className="text-slate-600" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center h-full items-center">
          <div className="bg-gray-100 p-8 rounded-2xl border border-gray-200">
            <p className="text-sm font-bold text-gray-500 uppercase mb-3 tracking-widest">TAM</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-2">74.750</p>
            <p className="text-base text-gray-600">Mandatos + 29 Partidos no Brasil</p>
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase">Fonte: TSE (Dados 2024)</p>
          </div>
          <div className="bg-gray-200 p-8 rounded-2xl border border-gray-300">
            <p className="text-sm font-bold text-gray-600 uppercase mb-3 tracking-widest">SAM</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-2">9.500</p>
            <p className="text-base text-gray-700">Mandatos Sul + Partidos Estaduais</p>
          </div>
          <div className="bg-indigo-600 text-white p-8 rounded-2xl shadow-2xl transform scale-110 relative z-10 border-4 border-white/20">
            <p className="text-sm font-bold text-indigo-200 uppercase mb-3 tracking-widest">SOM</p>
            <p className="text-5xl font-extrabold mb-2">350</p>
            <p className="text-lg text-indigo-100">Mandatos RS/SC em 2026</p>
          </div>
          <div className="col-span-full mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 text-center font-medium">
            💡 Mercado altamente recorrente (ciclos de 4 anos) com forte exigência e budget eleitoral.
          </div>
        </div>
      ),
      bgColor: "bg-white"
    },
    {
      id: 6,
      title: "Projeção Financeira Simplificada",
      subtitle: "Números Sólidos e Unit Economics Validado",
      icon: <DollarSign size={48} className="text-green-600" />,
      content: (
        <div className="space-y-8 w-full">
          <div className="grid grid-cols-2 gap-8">
             <div className="bg-white border-l-8 border-green-500 p-6 shadow-sm rounded-r-xl">
               <p className="text-gray-500 font-bold uppercase text-xs mb-1">Receita 2026</p>
               <p className="text-4xl font-bold text-gray-900">R$ 1.006.200</p>
             </div>
             <div className="bg-white border-l-8 border-indigo-500 p-6 shadow-sm rounded-r-xl">
               <p className="text-gray-500 font-bold uppercase text-xs mb-1">Receita 2030</p>
               <p className="text-4xl font-bold text-gray-900">R$ 6.500.000</p>
             </div>
          </div>
          
          <div className="bg-gray-900 text-white p-8 rounded-2xl grid grid-cols-3 gap-6 text-center shadow-xl">
            <div className="border-r border-gray-700 last:border-0">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Margem Média</p>
              <p className="text-3xl font-bold text-green-400">55% - 65%</p>
            </div>
            <div className="border-r border-gray-700 last:border-0">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">LTV / CAC</p>
              <p className="text-3xl font-bold text-blue-400">21x</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Payback</p>
              <p className="text-3xl font-bold text-yellow-400">{'<'} 3 meses</p>
            </div>
          </div>
        </div>
      ),
      bgColor: "bg-green-50"
    },
    {
      id: 7,
      title: "Valuation",
      subtitle: "Metodologia Baseada em Múltiplos SaaS",
      icon: <Calculator size={48} className="text-purple-600" />,
      content: (
        <div className="space-y-8 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Method 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 text-lg">Método 1 — Múltiplo ARR 2026</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Conservador (2.5x)</span>
                  <span className="font-bold text-gray-900 text-xl">R$ 2.5M</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                  <span className="text-blue-700 font-bold">Realista (4x)</span>
                  <span className="font-bold text-blue-700 text-2xl">R$ 4.0M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Agressivo (6x)</span>
                  <span className="font-bold text-gray-900 text-xl">R$ 6.0M</span>
                </div>
              </div>
            </div>

            {/* Method 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 text-lg">Método 2 — Múltiplo Visão 2030</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-gray-500">Conservador</span>
                   <span className="font-bold text-gray-900 text-xl">R$ 32.5M</span>
                </div>
                <div className="flex justify-between items-center bg-purple-50 p-2 rounded-lg">
                   <span className="text-purple-700 font-bold">Realista</span>
                   <span className="font-bold text-purple-700 text-2xl">R$ 52.0M</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-500">Agressivo</span>
                   <span className="font-bold text-gray-900 text-xl">R$ 78.0M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl text-center shadow-xl transform scale-105 border-4 border-white/20">
            <p className="text-sm opacity-80 uppercase tracking-[0.2em] font-bold mb-2">Valuation Pré-Seed Sugerido</p>
            <p className="text-5xl font-extrabold">R$ 4.800.000</p>
          </div>
        </div>
      ),
      bgColor: "bg-purple-50"
    },
    {
      id: 8,
      title: "Concorrência",
      subtitle: "A Evolução do Mercado",
      icon: <Target size={48} className="text-orange-500" />,
      content: (
        <div className="space-y-8 w-full">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Old Way */}
            <div className="bg-gray-100 p-8 rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <h4 className="font-bold text-gray-600 mb-6 text-center border-b border-gray-300 pb-3 text-xl">Eles (CRMs / BIs)</h4>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex gap-3">❌ Entregam apenas contatos</li>
                <li className="flex gap-3">❌ Sem visão territorial</li>
                <li className="flex gap-3">❌ Interface complexa</li>
                <li className="flex gap-3">❌ Sem contexto político</li>
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-white border-2 border-indigo-500 p-8 rounded-2xl shadow-2xl relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-md tracking-wider">
                NÓS
              </div>
              <h4 className="font-bold text-indigo-700 mb-6 text-center border-b border-indigo-100 pb-3 text-2xl">Mandato 360°</h4>
              <ul className="space-y-4 text-gray-800 text-lg font-medium">
                <li className="flex gap-3 items-center"><CheckCircle size={24} className="text-indigo-600"/> Entregam Estratégia</li>
                <li className="flex gap-3 items-center"><CheckCircle size={24} className="text-indigo-600"/> Inteligência Territorial</li>
                <li className="flex gap-3 items-center"><CheckCircle size={24} className="text-indigo-600"/> IA Preditiva Integrada</li>
                <li className="flex gap-3 items-center"><CheckCircle size={24} className="text-indigo-600"/> Gestão Completa</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      bgColor: "bg-orange-50"
    },
    {
      id: 9,
      title: "Roadmap 2026",
      subtitle: "Execução Clara e Definida",
      icon: <Rocket size={48} className="text-blue-600" />,
      content: (
        <div className="relative w-full max-w-5xl">
          <div className="absolute left-8 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full"></div>
          <div className="space-y-8 relative">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10 shrink-0 shadow-lg text-xl border-4 border-white">Q1</div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow group-hover:border-blue-200">
                <span className="font-bold text-gray-900 block text-xl mb-1">MVP Completo</span>
                <span className="text-base text-gray-600">Finalização MVP + Mapa + IA + Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold z-10 shrink-0 shadow-lg text-xl border-4 border-white">Q2</div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow group-hover:border-purple-200">
                <span className="font-bold text-gray-900 block text-xl mb-1">Expansão</span>
                <span className="text-base text-gray-600">Módulo Partidos + Exportações Avançadas</span>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold z-10 shrink-0 shadow-lg text-xl border-4 border-white">Q3</div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow group-hover:border-indigo-200">
                <span className="font-bold text-gray-900 block text-xl mb-1">Escala</span>
                <span className="text-base text-gray-600">Estados Adicionais + Ranking Eleitoral</span>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center font-bold z-10 shrink-0 shadow-lg text-xl border-4 border-white">Q4</div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow group-hover:border-green-200">
                <span className="font-bold text-gray-900 block text-xl mb-1">Automação</span>
                <span className="text-base text-gray-600">Integração WhatsApp + IA Política v2</span>
              </div>
            </div>
          </div>
        </div>
      ),
      bgColor: "bg-blue-50"
    },
    {
      id: 10,
      title: "Call to Action",
      subtitle: "Seja Nosso Parceiro",
      icon: <MousePointerClick size={48} className="text-indigo-600" />,
      content: (
        <div className="text-center space-y-8 w-full max-w-4xl">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100">
             <h4 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-widest">Buscando Investimento Pré-Seed</h4>
             <div className="text-6xl font-extrabold text-indigo-600 mb-2">R$ 4,8 Milhões</div>
             <p className="text-gray-500 font-medium">Valuation (Post-Money)</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-left">
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
              <span className="block font-bold text-gray-800 mb-3 text-lg">🎯 Uso do Recurso:</span>
              <ul className="text-base text-gray-600 space-y-2">
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div> Infraestrutura e Dev Team</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div> Mapas e Inteligência de Dados</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div> Marketing Eleitoral (CAC)</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 flex flex-col justify-center">
               <span className="block font-bold text-gray-800 mb-2 text-lg">🚀 Meta 2026:</span>
               <div className="text-4xl font-extrabold text-green-600">ARR R$ 1M</div>
               <p className="text-sm text-gray-500 mt-1">Já no primeiro ano de operação</p>
            </div>
          </div>

          <button className="w-full bg-black text-white py-5 rounded-xl font-bold text-2xl hover:bg-gray-800 transition-all shadow-2xl transform hover:scale-[1.02]">
            Agendar Reunião com Founders
          </button>
        </div>
      ),
      bgColor: "bg-indigo-50"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in duration-500 w-full h-full py-2">
      
      {/* Container Principal - Widescreen */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] border border-gray-200 relative">
        
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Top Bar Label */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center text-xs text-gray-400 font-medium">
          <span className="tracking-[0.2em] uppercase">MEU MANDATO 360° • PITCH DECK</span>
          <span>SLIDE {currentSlide + 1} / {slides.length}</span>
        </div>

        {/* Main Slide Body */}
        <div className={`flex-1 flex flex-col ${slide.bgColor} transition-colors duration-500 overflow-hidden`}>
            
            {/* 1. FIXED HEADER (Título sempre visível) */}
            <div className="flex-shrink-0 px-12 pt-10 pb-6 border-b border-black/5 bg-opacity-50 backdrop-blur-sm z-10">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
                        {slide.icon}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h1>
                        <p className="text-xl text-gray-500 font-medium">{slide.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* 2. SCROLLABLE CONTENT (Conteúdo rola se necessário) */}
            <div className="flex-1 overflow-y-auto px-12 py-8 flex justify-center">
                <div className="w-full max-w-5xl">
                    {slide.content}
                </div>
            </div>
        </div>

        {/* Footer / Controls */}
        <div className="p-5 bg-white border-t border-gray-100 flex justify-between items-center shrink-0 z-20">
          <button 
            onClick={handlePrev} 
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-sm
              ${currentSlide === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`}
          >
            <ChevronLeft size={20} /> Anterior
          </button>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all rounded-full ${currentSlide === idx ? 'bg-indigo-600 w-8 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all text-sm shadow-md
              ${currentSlide === slides.length - 1
                ? 'text-gray-300 cursor-not-allowed bg-gray-50 shadow-none' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'}`}
          >
            {currentSlide === slides.length - 1 ? 'Finalizar' : 'Próximo'} <ChevronRight size={20} />
          </button>
        </div>

      </div>
      
      <p className="mt-4 text-xs text-gray-400 font-medium">Use as setas do teclado para navegar ← →</p>
    </div>
  );
};

export default PitchDeck;
