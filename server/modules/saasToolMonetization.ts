export interface SaaSTool {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricingTier: "free" | "pro" | "enterprise";
  monthlyPrice: number;
  apiAccess: boolean;
  whiteLabelAvailable: boolean;
  status: "development" | "beta" | "launched" | "deprecated";
  users: number;
  mrr: number;
}

export interface APIEndpoint {
  id: string;
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  rateLimit: number;
  pricing: number; // per 1000 calls
  usage: number;
  revenue: number;
}

/**
 * Generiert SaaS-Tool-Ideen basierend auf Nische
 */
export function generateSaaSToolIdeas(): SaaSTool[] {
  return [
    {
      id: "tool_1",
      name: "AI Content Generator Pro",
      description: "Automated content generation with AI optimization",
      features: ["Bulk generation", "SEO optimization", "Multi-language", "API access"],
      pricingTier: "pro",
      monthlyPrice: 99,
      apiAccess: true,
      whiteLabelAvailable: true,
      status: "launched",
      users: 500,
      mrr: 49500,
    },
    {
      id: "tool_2",
      name: "Affiliate Link Manager",
      description: "Centralized affiliate link management and tracking",
      features: ["Link shortening", "Click tracking", "Analytics", "Multi-network"],
      pricingTier: "pro",
      monthlyPrice: 49,
      apiAccess: true,
      whiteLabelAvailable: true,
      status: "launched",
      users: 1000,
      mrr: 49000,
    },
    {
      id: "tool_3",
      name: "Trend Analyzer Pro",
      description: "Real-time trend detection and analysis",
      features: ["Multi-source tracking", "Alerts", "Predictions", "API"],
      pricingTier: "enterprise",
      monthlyPrice: 299,
      apiAccess: true,
      whiteLabelAvailable: true,
      status: "beta",
      users: 100,
      mrr: 29900,
    },
  ];
}

/**
 * Berechnet SaaS-Finanzmetriken
 */
export function calculateSaaSMetrics(tool: SaaSTool): {
  arr: number;
  churnRate: number;
  ltv: number;
  cac: number;
} {
  const arr = tool.mrr * 12;
  const churnRate = 5; // Assumed 5% monthly churn
  const ltv = (tool.monthlyPrice * 12) / (churnRate / 100);
  const cac = 50; // Assumed customer acquisition cost

  return {
    arr: Math.round(arr),
    churnRate,
    ltv: Math.round(ltv),
    cac,
  };
}

/**
 * Generiert API-Pricing-Modelle
 */
export function generateAPIPricingModels(): {
  tier: string;
  monthlyPrice: number;
  callsIncluded: number;
  additionalCallPrice: number;
  features: string[];
}[] {
  return [
    {
      tier: "Free",
      monthlyPrice: 0,
      callsIncluded: 10000,
      additionalCallPrice: 0.001,
      features: ["Basic API access", "Community support"],
    },
    {
      tier: "Pro",
      monthlyPrice: 99,
      callsIncluded: 1000000,
      additionalCallPrice: 0.0005,
      features: ["Priority support", "Advanced analytics", "Webhooks"],
    },
    {
      tier: "Enterprise",
      monthlyPrice: 999,
      callsIncluded: 10000000,
      additionalCallPrice: 0.0001,
      features: ["Dedicated support", "Custom integrations", "SLA guarantee"],
    },
  ];
}

/**
 * Generiert White-Label-Optionen
 */
export function generateWhiteLabelOptions(): {
  option: string;
      description: string;
  monthlyFee: number;
  revenue_share: number;
}[] {
  return [
    {
      option: "Full White Label",
      description: "Complete branding and customization",
      monthlyFee: 500,
      revenue_share: 30,
    },
    {
      option: "Partial White Label",
      description: "Custom branding with shared backend",
      monthlyFee: 250,
      revenue_share: 20,
    },
    {
      option: "Reseller Program",
      description: "Sell under your brand with our infrastructure",
      monthlyFee: 0,
      revenue_share: 50,
    },
  ];
}

/**
 * Berechnet Multi-Tenant-SaaS-Potenzial
 */
export function calculateMultiTenantPotential(
  basePrice: number,
  maxTenants: number
): {
  scenario: string;
  tenants: number;
  mrr: number;
  arr: number;
}[] {
  return [
    {
      scenario: "Conservative",
      tenants: Math.floor(maxTenants * 0.2),
      mrr: Math.floor(maxTenants * 0.2) * basePrice,
      arr: Math.floor(maxTenants * 0.2) * basePrice * 12,
    },
    {
      scenario: "Moderate",
      tenants: Math.floor(maxTenants * 0.5),
      mrr: Math.floor(maxTenants * 0.5) * basePrice,
      arr: Math.floor(maxTenants * 0.5) * basePrice * 12,
    },
    {
      scenario: "Aggressive",
      tenants: maxTenants,
      mrr: maxTenants * basePrice,
      arr: maxTenants * basePrice * 12,
    },
  ];
}

/**
 * Generiert SaaS-Go-To-Market-Strategie
 */
export function generateGoToMarketStrategy(): {
  phase: string;
  duration: string;
  activities: string[];
  expectedUsers: number;
}[] {
  return [
    {
      phase: "Beta Launch",
      duration: "1 month",
      activities: ["Invite 100 beta users", "Gather feedback", "Iterate"],
      expectedUsers: 100,
    },
    {
      phase: "Public Launch",
      duration: "1 month",
      activities: ["Launch website", "PR campaign", "Influencer partnerships"],
      expectedUsers: 500,
    },
    {
      phase: "Growth Phase",
      duration: "3 months",
      activities: ["Paid ads", "Content marketing", "Partnerships"],
      expectedUsers: 2000,
    },
  ];
}
