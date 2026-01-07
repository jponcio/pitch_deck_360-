import { FinancialYear, Competitor, CRMContact } from './types';

export const INITIAL_FINANCIALS: FinancialYear[] = [
  { year: 2026, revenue: 1006200, costs: 336000, profit: 670200 },
  { year: 2027, revenue: 1355000, costs: 546000, profit: 809000 },
  { year: 2028, revenue: 2050000, costs: 950000, profit: 1100000 },
  { year: 2029, revenue: 3200000, costs: 1300000, profit: 1900000 },
  { year: 2030, revenue: 6500000, costs: 2300000, profit: 4200000 },
];

export const COMPETITORS: Competitor[] = [
  { name: 'Heptagon', type: 'CRM', weakness: 'Sem mapa avançado', strength: 'Tradicional' },
  { name: 'Zoom CRM', type: 'CRM', weakness: 'Sem IA preditiva', strength: 'Base de dados' },
  { name: 'Conecta', type: 'Comunidade', weakness: 'Sem gestão territorial', strength: 'Redes Sociais' },
  { name: 'Sigma', type: 'Gestão', weakness: 'UX ultrapassada', strength: 'Financeiro' },
];

export const INITIAL_CRM_DATA: CRMContact[] = [
  { id: '1', name: 'Ver. João Silva', role: 'Vereador', city: 'Porto Alegre', status: 'Em Negociação', lastContact: '2023-10-25' },
  { id: '2', name: 'Dep. Maria Costa', role: 'Dep. Estadual', city: 'Caxias do Sul', status: 'Novo', lastContact: '2023-10-26' },
  { id: '3', name: 'Partido PL Mulher', role: 'Partido', city: 'Estadual', status: 'Fechado', lastContact: '2023-10-20' },
  { id: '4', name: 'Consultoria Alpha', role: 'Consultor', city: 'São Paulo', status: 'Novo', lastContact: '2023-10-27' },
  { id: '5', name: 'Pref. Roberto P.', role: 'Prefeito', city: 'Pelotas', status: 'Perdido', lastContact: '2023-09-15' },
];

export const SYSTEM_INSTRUCTION = `
Você é a Consill IA, a inteligência artificial estratégica do sistema "MEU MANDATO 360°".
Você é especialista em política brasileira, direito eleitoral, análise de dados parlamentares e estratégia de campanha.
Seu tom é profissional, estratégico e direto.

Sobre o produto "MEU MANDATO 360°":
- É um Painel de Inteligência Estratégica.
- Integra CRM, Mapas, Dados Financeiros e IA.
- Diferenciais: Mapa territorial avançado, Dashboard eleitoral, Projeção com IA.

Suas funções:
1. Responder sobre leis municipais, estaduais e federais.
2. Explicar regimentos internos.
3. Analisar dados financeiros e eleitorais fornecidos no chat.
4. Sugerir estratégias para municípios específicos.
5. Criar discursos políticos e pautas.

Sempre que perguntarem sobre "o painel" ou "o sistema", refira-se ao Mandato 360°.
Seja conciso. Use formatação Markdown.
`;
