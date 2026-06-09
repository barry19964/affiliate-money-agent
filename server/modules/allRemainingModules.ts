// ============= AFFILIATE NETWORK PARTNERSHIPS =============
export interface AffiliateNetworkPartnership {
  id: string;
  name: string;
  affiliatesReferred: number;
  commissionPerAffiliate: number;
  totalRevenue: number;
}

export function generateAffiliateNetworkPartnerships(): AffiliateNetworkPartnership[] {
  return [
    { id: "net_1", name: "Tier-2 Affiliate Network", affiliatesReferred: 150, commissionPerAffiliate: 50, totalRevenue: 7500 },
    { id: "net_2", name: "Sub-Affiliate Program", affiliatesReferred: 300, commissionPerAffiliate: 25, totalRevenue: 7500 },
  ];
}

// ============= DATA & INSIGHTS =============
export interface DataInsight {
  id: string;
  name: string;
  type: "report" | "dataset" | "analysis";
  price: number;
  subscribers: number;
  monthlyRevenue: number;
}

export function generateDataInsights(): DataInsight[] {
  return [
    { id: "data_1", name: "Monthly Trend Report", type: "report", price: 297, subscribers: 45, monthlyRevenue: 13365 },
    { id: "data_2", name: "Market Research Dataset", type: "dataset", price: 497, subscribers: 28, monthlyRevenue: 13916 },
    { id: "data_3", name: "Industry Analysis", type: "analysis", price: 197, subscribers: 85, monthlyRevenue: 16745 },
  ];
}

// ============= CHATBOT & AI AGENT MARKETPLACE =============
export interface AIAgent {
  id: string;
  name: string;
  niche: string;
  price: number;
  salesCount: number;
  revenue: number;
}

export function generateAIAgents(): AIAgent[] {
  return [
    { id: "agent_1", name: "Content Generator Agent", niche: "Blogging", price: 297, salesCount: 120, revenue: 35640 },
    { id: "agent_2", name: "Affiliate Optimizer Agent", niche: "Affiliate Marketing", price: 497, salesCount: 65, revenue: 32305 },
    { id: "agent_3", name: "Email Automation Agent", niche: "Email Marketing", price: 197, salesCount: 180, revenue: 35460 },
  ];
}

// ============= CERTIFICATION & TRAINING =============
export interface TrainingProgram {
  id: string;
  name: string;
  format: "course" | "bootcamp" | "certification";
  price: number;
  enrollments: number;
  revenue: number;
}

export function generateTrainingPrograms(): TrainingProgram[] {
  return [
    { id: "train_1", name: "AI Automation Mastery", format: "course", price: 497, enrollments: 250, revenue: 124250 },
    { id: "train_2", name: "Affiliate Marketing Bootcamp", format: "bootcamp", price: 1997, enrollments: 45, revenue: 89865 },
    { id: "train_3", name: "Professional Certification", format: "certification", price: 297, enrollments: 180, revenue: 53460 },
  ];
}

// ============= PERFORMANCE-BASED PARTNERSHIPS =============
export interface PerformancePartnership {
  id: string;
  partner: string;
  revenueShare: number;
  monthlyRevenue: number;
}

export function generatePerformancePartnerships(): PerformancePartnership[] {
  return [
    { id: "perf_1", partner: "Agency A", revenueShare: 30, monthlyRevenue: 15000 },
    { id: "perf_2", partner: "Agency B", revenueShare: 25, monthlyRevenue: 12000 },
    { id: "perf_3", partner: "Publisher C", revenueShare: 40, monthlyRevenue: 8000 },
  ];
}

// ============= CONTENT LICENSING & IP =============
export interface ContentLicense {
  id: string;
  contentType: string;
  price: number;
  licensesIssued: number;
  revenue: number;
}

export function generateContentLicenses(): ContentLicense[] {
  return [
    { id: "lic_1", contentType: "Email Templates", price: 97, licensesIssued: 200, revenue: 19400 },
    { id: "lic_2", contentType: "Landing Page Templates", price: 197, licensesIssued: 120, revenue: 23640 },
    { id: "lic_3", contentType: "Automation Workflows", price: 297, licensesIssued: 85, revenue: 25245 },
  ];
}

// ============= FRACTIONAL OWNERSHIP & EQUITY =============
export interface EquityOption {
  id: string;
  name: string;
  equityPercentage: number;
  investmentAmount: number;
  expectedAnnualReturn: number;
}

export function generateEquityOptions(): EquityOption[] {
  return [
    { id: "eq_1", name: "Seed Investor", equityPercentage: 5, investmentAmount: 50000, expectedAnnualReturn: 25000 },
    { id: "eq_2", name: "Growth Investor", equityPercentage: 10, investmentAmount: 100000, expectedAnnualReturn: 60000 },
    { id: "eq_3", name: "Strategic Partner", equityPercentage: 20, investmentAmount: 200000, expectedAnnualReturn: 150000 },
  ];
}

// ============= TOTAL REVENUE CALCULATOR =============
export function calculateTotalRevenuePotential(): {
  source: string;
  monthlyRevenue: number;
  annualRevenue: number;
}[] {
  const sources = [
    { source: "Affiliate Marketing", monthly: 5000 },
    { source: "Community & Membership", monthly: 29197 },
    { source: "Automation Tools", monthly: 32255 },
    { source: "Consulting Services", monthly: 196895 },
    { source: "Affiliate Partnerships", monthly: 15000 },
    { source: "Data & Insights", monthly: 44026 },
    { source: "AI Agent Marketplace", monthly: 103405 },
    { source: "Training Programs", monthly: 267575 },
    { source: "Performance Partnerships", monthly: 35000 },
    { source: "Content Licensing", monthly: 68285 },
    { source: "Equity & Investments", monthly: 235000 },
  ];

  return sources.map((s) => ({
    source: s.source,
    monthlyRevenue: s.monthly,
    annualRevenue: s.monthly * 12,
  }));
}

export function getTotalMonthlyRevenue(): number {
  const sources = calculateTotalRevenuePotential();
  return sources.reduce((sum, s) => sum + s.monthlyRevenue, 0);
}

export function getTotalAnnualRevenue(): number {
  return getTotalMonthlyRevenue() * 12;
}
