
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ConsillIA from './components/ConsillIA';
import Overview from './pages/Overview';
import MarketAnalysis from './pages/MarketAnalysis';
import Competitors from './pages/Competitors';
import Differentiators from './pages/Differentiators';
import BusinessModel from './pages/BusinessModel';
import Pricing from './pages/Pricing';
import Roadmap from './pages/Roadmap';
import Financials from './pages/Financials';
import MapDemo from './pages/MapDemo';
import CRM from './pages/CRM';
import Investors from './pages/Investors';
import PitchDeck from './pages/PitchDeck';
import RoadmapCalculator from './pages/RoadmapCalculator';
import SlicePie from './pages/SlicePie';
import ConsillChat from './pages/ConsillChat';
import { PageId } from './types';
import { INITIAL_FINANCIALS } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [financialData, setFinancialData] = useState(INITIAL_FINANCIALS);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'home': return (
        <Overview 
          financials={financialData} 
          onNavigate={(page) => setActivePage(page)}
          onOpenChat={() => setIsChatOpen(true)}
        />
      );
      case 'investors': return <Investors />;
      case 'slice_pie': return <SlicePie />;
      case 'pitch_deck': return <PitchDeck />;
      case 'roadmap_calculator': return <RoadmapCalculator />;
      case 'consill_chat': return <ConsillChat />;
      case 'market': return <MarketAnalysis />;
      case 'competitors': return <Competitors />;
      case 'differentiators': return <Differentiators />;
      case 'business_model': return <BusinessModel />;
      case 'pricing': return <Pricing />;
      case 'roadmap': return <Roadmap />;
      case 'financials': return <Financials data={financialData} setData={setFinancialData} />;
      case 'map': return <MapDemo />;
      case 'crm': return <CRM />;
      default: return (
        <Overview 
          financials={financialData} 
          onNavigate={(page) => setActivePage(page)}
          onOpenChat={() => setIsChatOpen(true)}
        />
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1 overflow-y-auto h-screen p-8 relative">
        <div className="max-w-7xl mx-auto pb-24">
          {renderContent()}
        </div>
      </main>

      <ConsillIA isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;