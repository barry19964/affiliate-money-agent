export interface AdCampaign {
  id: string;
  platform: "google" | "facebook" | "instagram" | "linkedin" | "tiktok";
  name: string;
  budget: number;
  dailyBudget: number;
  status: "pending" | "active" | "paused" | "completed";
  startDate: Date;
  endDate?: Date;
  targetAudience: string;
  keywords: string[];
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}

export interface AdPerformanceMetrics {
  cpc: number; // Cost Per Click
  cpa: number; // Cost Per Acquisition
  roas: number; // Return On Ad Spend
  ctr: number; // Click Through Rate
  conversionRate: number;
  roi: number;
}

/**
 * Generiert optimale Ad-Kampagnen basierend auf Top-Inhalten
 */
export function generateAdCampaigns(
  topArticles: string[],
  monthlyBudget: number
): AdCampaign[] {
  const platforms = ["google", "facebook", "instagram", "linkedin"];
  const budgetPerPlatform = monthlyBudget / platforms.length;

  return platforms.map((platform, index) => ({
    id: `camp_${platform}_${Date.now()}`,
    platform: platform as any,
    name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} - ${topArticles[index] || "AI Trends"}`,
    budget: budgetPerPlatform,
    dailyBudget: budgetPerPlatform / 30,
    status: "pending" as const,
    startDate: new Date(),
    targetAudience: "AI & Productivity Enthusiasts",
    keywords: ["AI tools", "productivity", "automation", "ChatGPT alternatives"],
    impressions: 0,
    clicks: 0,
    conversions: 0,
    spend: 0,
    revenue: 0,
  }));
}

/**
 * Berechnet Ad-Performance-Metriken
 */
export function calculateAdMetrics(campaign: AdCampaign): AdPerformanceMetrics {
  const cpc = campaign.clicks > 0 ? campaign.spend / campaign.clicks : 0;
  const cpa = campaign.conversions > 0 ? campaign.spend / campaign.conversions : 0;
  const roas = campaign.spend > 0 ? campaign.revenue / campaign.spend : 0;
  const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions) * 100 : 0;
  const conversionRate = campaign.clicks > 0 ? (campaign.conversions / campaign.clicks) * 100 : 0;
  const roi = campaign.spend > 0 ? ((campaign.revenue - campaign.spend) / campaign.spend) * 100 : 0;

  return {
    cpc: Math.round(cpc * 100) / 100,
    cpa: Math.round(cpa * 100) / 100,
    roas: Math.round(roas * 100) / 100,
    ctr: Math.round(ctr * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    roi: Math.round(roi),
  };
}

/**
 * Generiert Bid-Strategien basierend auf Performance
 */
export function generateBidStrategy(campaign: AdCampaign): {
  strategy: string;
  recommendedBid: number;
  expectedROAS: number;
} {
  const metrics = calculateAdMetrics(campaign);

  if (metrics.roas > 3) {
    return {
      strategy: "Aggressive - Increase budget by 50%",
      recommendedBid: campaign.dailyBudget * 1.5,
      expectedROAS: metrics.roas * 1.2,
    };
  } else if (metrics.roas > 1.5) {
    return {
      strategy: "Moderate - Increase budget by 25%",
      recommendedBid: campaign.dailyBudget * 1.25,
      expectedROAS: metrics.roas * 1.1,
    };
  } else if (metrics.roas > 1) {
    return {
      strategy: "Conservative - Maintain current budget",
      recommendedBid: campaign.dailyBudget,
      expectedROAS: metrics.roas,
    };
  } else {
    return {
      strategy: "Pause and optimize - Reduce budget by 50%",
      recommendedBid: campaign.dailyBudget * 0.5,
      expectedROAS: 1.5,
    };
  }
}

/**
 * Generiert A/B-Test-Varianten für Ads
 */
export function generateAdVariants(headline: string, description: string): {
  variant: string;
  headline: string;
  description: string;
  cta: string;
}[] {
  return [
    {
      variant: "A",
      headline: `${headline} - Limited Time Offer`,
      description: `${description}. Get instant access today!`,
      cta: "Get Instant Access",
    },
    {
      variant: "B",
      headline: `Transform Your ${headline}`,
      description: `${description}. Join thousands of happy users.`,
      cta: "Start Free Trial",
    },
    {
      variant: "C",
      headline: `The Ultimate ${headline} Guide`,
      description: `${description}. Expert-approved and proven.`,
      cta: "Learn More",
    },
  ];
}

/**
 * Berechnet optimale Ad-Budget-Verteilung
 */
export function calculateOptimalBudgetAllocation(
  totalBudget: number,
  platformPerformance: Record<string, number>
): Record<string, number> {
  const totalROAS = Object.values(platformPerformance).reduce((a, b) => a + b, 0);

  const allocation: Record<string, number> = {};
  for (const [platform, roas] of Object.entries(platformPerformance)) {
    allocation[platform] = Math.round((totalBudget * (roas / totalROAS)) * 100) / 100;
  }

  return allocation;
}

/**
 * Generiert Retargeting-Strategien
 */
export function generateRetargetingStrategy(): {
  audience: string;
  delay: string;
  message: string;
  expectedLift: number;
}[] {
  return [
    {
      audience: "Website visitors (no conversion)",
      delay: "1 day",
      message: "Complete your purchase - 20% discount inside",
      expectedLift: 25,
    },
    {
      audience: "Add to cart (no purchase)",
      delay: "6 hours",
      message: "You left something behind - Limited time offer",
      expectedLift: 40,
    },
    {
      audience: "Past customers",
      delay: "7 days",
      message: "Exclusive offer for loyal customers - 30% off",
      expectedLift: 35,
    },
  ];
}
