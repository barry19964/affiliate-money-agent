export interface AffiliateLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  program: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: Date;
  lastClicked?: Date;
}

export interface LinkOptimization {
  linkId: string;
  originalCTR: number;
  optimizedCTR: number;
  improvement: number;
  strategy: string;
}

/**
 * Generiert optimierte Affiliate-Links
 */
export function generateOptimizedAffiliateLink(
  originalUrl: string,
  program: string,
  context: string
): {
  shortUrl: string;
  contextualAnchor: string;
  placement: string;
  expectedCTR: number;
} {
  const shortUrl = `aff.link/${Math.random().toString(36).substring(7)}`;

  const contextualAnchors: Record<string, string> = {
    "GPT Prompt Maker": "Get 1000+ AI Prompts",
    "Copy.ai": "Write Better Copy Faster",
    Writesonic: "AI Writing Assistant",
    Stripe: "Accept Payments Instantly",
    Gumroad: "Sell Digital Products",
    Udemy: "Learn New Skills",
  };

  return {
    shortUrl,
    contextualAnchor: contextualAnchors[program] || "Check This Out",
    placement: context === "blog" ? "in-content" : context === "email" ? "cta" : "sidebar",
    expectedCTR: context === "blog" ? 1.2 : context === "email" ? 3.5 : 0.5,
  };
}

/**
 * Berechnet Link-Performance-Metriken
 */
export function calculateLinkPerformance(link: AffiliateLink): {
  ctr: number;
  conversionRate: number;
  avgRevenuePerClick: number;
  quality: "excellent" | "good" | "average" | "poor";
} {
  const ctr = link.clicks > 0 ? (link.conversions / link.clicks) * 100 : 0;
  const conversionRate = link.clicks > 0 ? (link.conversions / link.clicks) * 100 : 0;
  const avgRevenuePerClick = link.clicks > 0 ? link.revenue / link.clicks : 0;

  let quality: "excellent" | "good" | "average" | "poor" = "average";
  if (ctr > 5) quality = "excellent";
  else if (ctr > 2) quality = "good";
  else if (ctr < 0.5) quality = "poor";

  return {
    ctr: Math.round(ctr * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    avgRevenuePerClick: Math.round(avgRevenuePerClick * 100) / 100,
    quality,
  };
}

/**
 * Generiert Link-Optimierungs-Strategien
 */
export function generateLinkOptimizationStrategies(): {
  strategy: string;
  expectedImprovement: number;
  implementation: string;
}[] {
  return [
    {
      strategy: "Contextual Anchor Text",
      expectedImprovement: 25,
      implementation: "Use benefit-driven anchor text instead of generic links",
    },
    {
      strategy: "Button vs Text Link",
      expectedImprovement: 40,
      implementation: "Replace text links with prominent CTA buttons",
    },
    {
      strategy: "Placement Optimization",
      expectedImprovement: 35,
      implementation: "Move links to high-visibility areas (above fold, in-content)",
    },
    {
      strategy: "Social Proof",
      expectedImprovement: 30,
      implementation: "Add testimonials and trust badges near affiliate links",
    },
    {
      strategy: "Urgency Elements",
      expectedImprovement: 45,
      implementation: "Add limited-time offers or exclusive bonuses",
    },
  ];
}

/**
 * Berechnet Affiliate-Arbitrage-Potenzial
 */
export function calculateAffiliateArbitrage(
  trafficCost: number,
  conversionRate: number,
  avgCommission: number
): {
  breakEvenTraffic: number;
  profitableTraffic: number;
  expectedROI: number;
} {
  const costPerVisitor = trafficCost / 1000; // Assuming 1000 visitors
  const conversionValue = avgCommission * (conversionRate / 100);
  const breakEvenTraffic = Math.ceil(trafficCost / conversionValue);
  const profitableTraffic = Math.ceil(breakEvenTraffic * 1.5);
  const expectedROI = ((conversionValue - costPerVisitor) / costPerVisitor) * 100;

  return {
    breakEvenTraffic,
    profitableTraffic,
    expectedROI: Math.round(expectedROI),
  };
}

/**
 * Generiert Multi-Program-Link-Strategie
 */
export function generateMultiProgramStrategy(
  programs: string[]
): {
  program: string;
  placement: string;
  expectedRevenue: number;
}[] {
  return programs.map((program, index) => ({
    program,
    placement:
      index === 0
        ? "Primary CTA"
        : index === 1
          ? "Secondary CTA"
          : "Contextual mention",
    expectedRevenue: (100 - index * 20) * (index + 1),
  }));
}

/**
 * Berechnet Link-Rotation-Strategie
 */
export function generateLinkRotationStrategy(): {
  strategy: string;
  frequency: string;
  expectedImprovement: number;
}[] {
  return [
    {
      strategy: "A/B Test Links",
      frequency: "Weekly",
      expectedImprovement: 15,
    },
    {
      strategy: "Seasonal Rotation",
      frequency: "Monthly",
      expectedImprovement: 20,
    },
    {
      strategy: "Performance-Based Rotation",
      frequency: "Real-time",
      expectedImprovement: 35,
    },
  ];
}

/**
 * Generiert Link-Cloaking-Optionen
 */
export function generateLinkCloakingOptions(): {
  method: string;
  domain: string;
  example: string;
  benefits: string[];
}[] {
  return [
    {
      method: "Branded Short Links",
      domain: "go.yoursite.com",
      example: "go.yoursite.com/gpt-pro",
      benefits: ["Brand trust", "Easy tracking", "Professional look"],
    },
    {
      method: "Contextual URLs",
      domain: "yoursite.com/recommend",
      example: "yoursite.com/recommend/copy-ai",
      benefits: ["SEO benefit", "User-friendly", "Trackable"],
    },
    {
      method: "Redirect Pages",
      domain: "yoursite.com/tools",
      example: "yoursite.com/tools/best-ai-writers",
      benefits: ["Extra monetization", "More content", "Better UX"],
    },
  ];
}
