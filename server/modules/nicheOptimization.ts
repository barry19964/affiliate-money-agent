/**
 * Niche Optimization & Paid Ads Module
 * Focuses content on high-CPC, high-conversion niches
 * Implements Google Ads campaigns for paid traffic
 */

export interface NicheData {
  name: string;
  cpc: number; // Cost per click in EUR
  competition: "low" | "medium" | "high";
  monthlySearches: number;
  conversionRate: number;
  profitMargin: number;
  trend: "rising" | "stable" | "declining";
}

export interface PaidAdsStrategy {
  niche: string;
  budget: number;
  bidStrategy: "maximize_clicks" | "maximize_conversions" | "target_cpa";
  targetCPA: number;
  keywords: string[];
  adCopy: string[];
  landingPageUrl: string;
}

// ============= TOP PROFITABLE NICHES =============

export const TOP_NICHES: NicheData[] = [
  {
    name: "AI Tools & Automation",
    cpc: 8.5,
    competition: "high",
    monthlySearches: 45000,
    conversionRate: 0.08,
    profitMargin: 0.35,
    trend: "rising",
  },
  {
    name: "Crypto & Web3",
    cpc: 12.3,
    competition: "high",
    monthlySearches: 32000,
    conversionRate: 0.06,
    profitMargin: 0.42,
    trend: "rising",
  },
  {
    name: "Finance & Investing",
    cpc: 6.8,
    competition: "high",
    monthlySearches: 78000,
    conversionRate: 0.05,
    profitMargin: 0.38,
    trend: "stable",
  },
  {
    name: "Health & Wellness",
    cpc: 4.2,
    competition: "medium",
    monthlySearches: 125000,
    conversionRate: 0.07,
    profitMargin: 0.32,
    trend: "stable",
  },
  {
    name: "SaaS & Software",
    cpc: 9.1,
    competition: "high",
    monthlySearches: 28000,
    conversionRate: 0.09,
    profitMargin: 0.40,
    trend: "rising",
  },
];

// ============= NICHE ANALYSIS =============

export function analyzeNiches(): NicheData[] {
  return TOP_NICHES.sort((a, b) => {
    const scoreA = calculateNicheScore(a);
    const scoreB = calculateNicheScore(b);
    return scoreB - scoreA;
  });
}

export function calculateNicheScore(niche: NicheData): number {
  const competitionMultiplier = {
    low: 1.5,
    medium: 1.0,
    high: 0.7,
  };

  return (
    (niche.cpc *
      niche.monthlySearches *
      niche.conversionRate *
      niche.profitMargin) /
    competitionMultiplier[niche.competition]
  );
}

export function getTopNiches(count: number = 3): NicheData[] {
  return analyzeNiches().slice(0, count);
}

// ============= NICHE-SPECIFIC CONTENT =============

export function generateNicheKeywords(niche: string): string[] {
  const nicheKeywords: Record<string, string[]> = {
    "AI Tools & Automation": [
      "best AI tools 2026",
      "AI automation software",
      "ChatGPT alternatives",
      "AI productivity tools",
      "machine learning tools",
    ],
    "Crypto & Web3": [
      "best crypto exchanges",
      "Bitcoin investment 2026",
      "Ethereum staking",
      "DeFi protocols",
      "NFT marketplace",
    ],
    "Finance & Investing": [
      "best investment apps",
      "stock market for beginners",
      "dividend stocks",
      "ETF investing",
      "financial planning",
    ],
    "Health & Wellness": [
      "best fitness apps",
      "weight loss supplements",
      "healthy recipes",
      "meditation apps",
      "yoga for beginners",
    ],
    "SaaS & Software": [
      "project management tools",
      "CRM software",
      "marketing automation",
      "email marketing tools",
      "analytics platforms",
    ],
  };

  return nicheKeywords[niche] || [];
}

// ============= PAID ADS STRATEGY =============

export function createPaidAdsStrategy(
  niche: string,
  budget: number
): PaidAdsStrategy {
  const keywords = generateNicheKeywords(niche);

  return {
    niche,
    budget,
    bidStrategy: "maximize_conversions",
    targetCPA: budget / 50,
    keywords: keywords.slice(0, 10),
    adCopy: [
      `Discover the Best ${niche} Solutions | Start Free Today`,
      `${niche} Made Easy | Join 10,000+ Users`,
      `Get Started with ${niche} | Limited Time Offer`,
    ],
    landingPageUrl: `https://affiliagent-jdgfckn9.manus.space/${niche.toLowerCase().replace(/ /g, "-")}`,
  };
}

// ============= REVENUE PROJECTIONS =============

export function projectNicheRevenue(
  niche: NicheData,
  monthlyBudget: number
): {
  projectedClicks: number;
  projectedConversions: number;
  projectedRevenue: number;
  roi: number;
} {
  const projectedClicks = Math.floor(monthlyBudget / niche.cpc);
  const projectedConversions = Math.floor(
    projectedClicks * niche.conversionRate
  );
  const revenuePerConversion = monthlyBudget / projectedConversions || 0;
  const projectedRevenue = revenuePerConversion * projectedConversions;
  const roi = ((projectedRevenue - monthlyBudget) / monthlyBudget) * 100;

  return {
    projectedClicks,
    projectedConversions,
    projectedRevenue,
    roi,
  };
}

// ============= NICHE DASHBOARD DATA =============

export function getNicheDashboardData() {
  const topNiches = getTopNiches(3);

  return {
    topNiches,
    totalMonthlySearches: topNiches.reduce((sum, n) => sum + n.monthlySearches, 0),
    averageCPC: (topNiches.reduce((sum, n) => sum + n.cpc, 0) / topNiches.length).toFixed(2),
    recommendedBudget: 500,
    projectedMonthlyRevenue: topNiches.reduce((sum, niche) => {
      const projection = projectNicheRevenue(niche, 500);
      return sum + projection.projectedRevenue;
    }, 0),
  };
}

// ============= PERFORMANCE TRACKING =============

export function calculateNichePerformance(
  niche: string,
  clicks: number,
  conversions: number,
  revenue: number,
  spend: number
): {
  ctr: number;
  conversionRate: number;
  cpc: number;
  cpa: number;
  roas: number;
  roi: number;
} {
  return {
    ctr: clicks > 0 ? (conversions / clicks) * 100 : 0,
    conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
    cpc: clicks > 0 ? spend / clicks : 0,
    cpa: conversions > 0 ? spend / conversions : 0,
    roas: spend > 0 ? revenue / spend : 0,
    roi: spend > 0 ? ((revenue - spend) / spend) * 100 : 0,
  };
}
