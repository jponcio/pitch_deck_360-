
export interface FinancialYear {
  year: number;
  revenue: number;
  costs: number;
  profit: number;
}

export interface Competitor {
  name: string;
  type: string;
  weakness: string;
  strength: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface CRMContact {
  id: string;
  name: string;
  role: string;
  city: string;
  status: 'Novo' | 'Em Negociação' | 'Fechado' | 'Perdido';
  lastContact: string;
}

export type PageId = 
  | 'home' 
  | 'investors'
  | 'slice_pie'
  | 'pitch_deck'
  | 'roadmap_calculator'
  | 'consill_chat'
  | 'market' 
  | 'competitors' 
  | 'differentiators' 
  | 'business_model' 
  | 'pricing' 
  | 'roadmap' 
  | 'financials' 
  | 'map' 
  | 'crm';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}