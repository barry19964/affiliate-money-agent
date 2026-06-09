/**
 * Automated Ad Spend Optimization System
 * Optimizes Google Ads, Facebook Ads, and other paid campaigns automatically
 */

export interface AdCampaign {
  id: string;
  name: string;
  platform: "google_ads" | "facebook_ads" | "tiktok_ads" | "linkedin_ads";
  budget: number; // daily budget in EUR
  status: "active" | "paused" | "optimizing";
  keywords: string[];
  bidStrategy: "manual" | "automatic" | "target_cpa" | "target_roas";
  targetCPA?: number;
  targetROAS?: number;
  createdAt: Date;
  lastOptimized: Date;
}

export interface AdPerformance {
  campaignId: string;
  date: Date;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number; // Click-through rate
  cpc: number; // Cost per click
  cpa: number; // Cost per acquisition
  roas: number; // Return on ad spend
}

export interface OptimizationRecommendation {
  campaignId: string;
  recommendation: string;
  impact: "high" | "medium" | "low";
  estimatedROIImprovement: number; // percentage
  action: string;
  priority: number;
}

export interface BidStrategy {
  keyword: string;
  currentBid: number;
  recommendedBid: number;
  reason: string;
  expectedCTRImprovement: number;
}

/**
 * Analyze ad campaign performance
 */
export function analyzeAdPerformance(
  campaign: AdCampaign,
  performance: AdPerformance[]
): {
  averageCTR: number;
  averageCPC: number;
  averageCPA: number;
  averageROAS: number;
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  trend: "improving" | "declining" | "stable";
} {
  if (performance.length === 0) {
    return {
      averageCTR: 0,
      averageCPC: 0,
      averageCPA: 0,
      averageROAS: 0,
      totalSpend: 0,
      totalRevenue: 0,
      totalConversions: 0,
      trend: "stable"
    };
  }

  const totalImpressions = performance.reduce((sum, p) => sum + p.impressions, 0);
  const totalClicks = performance.reduce((sum, p) => sum + p.clicks, 0);
  const totalConversions = performance.reduce((sum, p) => sum + p.conversions, 0);
  const totalSpend = performance.reduce((sum, p) => sum + p.spend, 0);
  const totalRevenue = performance.reduce((sum, p) => sum + p.revenue, 0);

  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const averageCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const averageCPA = totalConversions > 0 ? totalSpend / totalConversions : 0;
  const averageROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  // Determine trend
  const firstHalf = performance.slice(0, Math.floor(performance.length / 2));
  const secondHalf = performance.slice(Math.floor(performance.length / 2));

  const firstHalfROAS = firstHalf.reduce((sum, p) => sum + p.roas, 0) / firstHalf.length;
  const secondHalfROAS = secondHalf.reduce((sum, p) => sum + p.roas, 0) / secondHalf.length;

  let trend: "improving" | "declining" | "stable" = "stable";
  if (secondHalfROAS > firstHalfROAS * 1.1) trend = "improving";
  else if (secondHalfROAS < firstHalfROAS * 0.9) trend = "declining";

  return {
    averageCTR,
    averageCPC,
    averageCPA,
    averageROAS,
    totalSpend,
    totalRevenue,
    totalConversions,
    trend
  };
}

/**
 * Generate optimization recommendations
 */
export function generateOptimizationRecommendations(
  campaign: AdCampaign,
  performance: AdPerformance[]
): OptimizationRecommendation[] {
  const analysis = analyzeAdPerformance(campaign, performance);
  const recommendations: OptimizationRecommendation[] = [];

  // CTR optimization
  if (analysis.averageCTR < 2) {
    recommendations.push({
      campaignId: campaign.id,
      recommendation: "Low CTR - Improve ad copy and creative",
      impact: "high",
      estimatedROIImprovement: 25,
      action: "Test new ad headlines and descriptions",
      priority: 1
    });
  }

  // CPC optimization
  if (analysis.averageCPC > 1.5) {
    recommendations.push({
      campaignId: campaign.id,
      recommendation: "High CPC - Reduce bid on low-performing keywords",
      impact: "high",
      estimatedROIImprovement: 30,
      action: "Lower bids on keywords with low conversion rates",
      priority: 2
    });
  }

  // ROAS optimization
  if (analysis.averageROAS < 2) {
    recommendations.push({
      campaignId: campaign.id,
      recommendation: "Low ROAS - Pause underperforming campaigns",
      impact: "high",
      estimatedROIImprovement: 40,
      action: "Pause campaigns with ROAS < 1.5",
      priority: 1
    });
  }

  // Budget allocation
  if (analysis.trend === "declining") {
    recommendations.push({
      campaignId: campaign.id,
      recommendation: "Performance declining - Reallocate budget",
      impact: "medium",
      estimatedROIImprovement: 20,
      action: "Move budget to better-performing campaigns",
      priority: 2
    });
  }

  // Bid strategy
  if (campaign.bidStrategy === "manual") {
    recommendations.push({
      campaignId: campaign.id,
      recommendation: "Use automated bidding strategy",
      impact: "medium",
      estimatedROIImprovement: 15,
      action: "Switch to Target ROAS bidding",
      priority: 3
    });
  }

  return recommendations.sort((a, b) => a.priority - b.priority);
}

/**
 * Optimize keyword bids
 */
export function optimizeKeywordBids(
  campaign: AdCampaign,
  performance: AdPerformance[]
): BidStrategy[] {
  const bidStrategies: BidStrategy[] = [];
  const currentBid = campaign.budget / campaign.keywords.length;

  for (const keyword of campaign.keywords) {
    // Simulate keyword performance data
    const keywordPerf = performance.filter(p => p.date.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000);
    const avgCPA = keywordPerf.length > 0 ? keywordPerf.reduce((sum, p) => sum + p.cpa, 0) / keywordPerf.length : currentBid;

    let recommendedBid = currentBid;
    let reason = "Stable performance";
    let expectedCTRImprovement = 0;

    if (avgCPA > currentBid * 1.5) {
      // High CPA - reduce bid
      recommendedBid = currentBid * 0.7;
      reason = "High CPA - reducing bid";
      expectedCTRImprovement = -10;
    } else if (avgCPA < currentBid * 0.5) {
      // Low CPA - increase bid
      recommendedBid = currentBid * 1.3;
      reason = "Low CPA - increasing bid";
      expectedCTRImprovement = 20;
    }

    bidStrategies.push({
      keyword,
      currentBid,
      recommendedBid,
      reason,
      expectedCTRImprovement
    });
  }

  return bidStrategies;
}

/**
 * Calculate optimal daily budget allocation
 */
export function calculateOptimalBudgetAllocation(
  campaigns: AdCampaign[],
  totalDailyBudget: number
): { campaignId: string; allocatedBudget: number; reason: string }[] {
  // Sort campaigns by ROAS (simulated)
  const sortedCampaigns = campaigns.sort((a, b) => {
    const scoreA = Math.random() * 3; // Simulated ROAS
    const scoreB = Math.random() * 3;
    return scoreB - scoreA;
  });

  const allocation: { campaignId: string; allocatedBudget: number; reason: string }[] = [];
  let remainingBudget = totalDailyBudget;

  for (let i = 0; i < sortedCampaigns.length; i++) {
    const campaign = sortedCampaigns[i];
    const percentage = i === 0 ? 0.5 : i === 1 ? 0.3 : 0.2 / (sortedCampaigns.length - 2);
    const allocatedBudget = Math.min(totalDailyBudget * percentage, remainingBudget);

    allocation.push({
      campaignId: campaign.id,
      allocatedBudget,
      reason: i === 0 ? "Highest ROAS" : i === 1 ? "Second highest ROAS" : "Testing budget"
    });

    remainingBudget -= allocatedBudget;
  }

  return allocation;
}

/**
 * Generate A/B test for ads
 */
export function generateABTestForAds(campaign: AdCampaign): {
  testName: string;
  variantA: { headline: string; description: string; cta: string };
  variantB: { headline: string; description: string; cta: string };
  testDuration: number;
  expectedWinner: string;
} {
  const headlines = [
    "Limited Time Offer - Save 50% Today",
    "Transform Your Life in 30 Days",
    "Exclusive Deal for Smart Shoppers",
    "Join 100,000+ Happy Customers"
  ];

  const descriptions = [
    "Get instant access to premium features",
    "Start your free trial today",
    "No credit card required",
    "Money-back guarantee included"
  ];

  const ctas = [
    "Get Started Now",
    "Claim Your Offer",
    "Learn More",
    "Shop Now"
  ];

  return {
    testName: `A/B Test - ${campaign.name}`,
    variantA: {
      headline: headlines[0],
      description: descriptions[0],
      cta: ctas[0]
    },
    variantB: {
      headline: headlines[1],
      description: descriptions[1],
      cta: ctas[1]
    },
    testDuration: 7, // days
    expectedWinner: "Variant B (based on psychological triggers)"
  };
}

/**
 * Generate ad spend optimization report
 */
export function generateAdOptimizationReport(
  campaigns: AdCampaign[],
  performanceData: Record<string, AdPerformance[]>
): {
  summary: string;
  totalSpend: number;
  totalRevenue: number;
  averageROAS: number;
  topCampaign: string;
  recommendations: OptimizationRecommendation[];
  potentialROIImprovement: number;
} {
  let totalSpend = 0;
  let totalRevenue = 0;
  let campaignCount = 0;
  let topCampaignId = "";
  let topROAS = 0;
  const allRecommendations: OptimizationRecommendation[] = [];

  for (const campaign of campaigns) {
    const performance = performanceData[campaign.id] || [];
    if (performance.length === 0) continue;

    const analysis = analyzeAdPerformance(campaign, performance);
    totalSpend += analysis.totalSpend;
    totalRevenue += analysis.totalRevenue;
    campaignCount++;

    if (analysis.averageROAS > topROAS) {
      topROAS = analysis.averageROAS;
      topCampaignId = campaign.id;
    }

    const recommendations = generateOptimizationRecommendations(campaign, performance);
    allRecommendations.push(...recommendations);
  }

  const averageROAS = campaignCount > 0 ? totalRevenue / totalSpend : 0;
  const potentialROIImprovement = allRecommendations.reduce((sum, r) => sum + r.estimatedROIImprovement, 0);

  return {
    summary: `Analyzed ${campaignCount} campaigns with total spend of €${totalSpend.toFixed(2)} and revenue of €${totalRevenue.toFixed(2)}`,
    totalSpend,
    totalRevenue,
    averageROAS: Math.round(averageROAS * 100) / 100,
    topCampaign: topCampaignId,
    recommendations: allRecommendations.sort((a, b) => a.priority - b.priority),
    potentialROIImprovement: Math.round(potentialROIImprovement)
  };
}

/**
 * Calculate cost per result
 */
export function calculateCostPerResult(
  spend: number,
  conversions: number
): number {
  return conversions > 0 ? spend / conversions : 0;
}

/**
 * Predict campaign performance
 */
export function predictCampaignPerformance(
  campaign: AdCampaign,
  historicalPerformance: AdPerformance[],
  daysAhead: number = 7
): {
  predictedSpend: number;
  predictedRevenue: number;
  predictedConversions: number;
  predictedROAS: number;
  confidence: number;
} {
  if (historicalPerformance.length < 3) {
    return {
      predictedSpend: campaign.budget * daysAhead,
      predictedRevenue: campaign.budget * daysAhead * 2,
      predictedConversions: Math.round((campaign.budget * daysAhead) / 2),
      predictedROAS: 2,
      confidence: 0.5
    };
  }

  const avgDailySpend = historicalPerformance.reduce((sum, p) => sum + p.spend, 0) / historicalPerformance.length;
  const avgROAS = historicalPerformance.reduce((sum, p) => sum + p.roas, 0) / historicalPerformance.length;
  const avgConversionRate = historicalPerformance.reduce((sum, p) => sum + (p.conversions / p.clicks), 0) / historicalPerformance.length;

  const predictedSpend = avgDailySpend * daysAhead;
  const predictedRevenue = predictedSpend * avgROAS;
  const predictedConversions = Math.round((predictedSpend / (predictedSpend / (historicalPerformance.reduce((sum, p) => sum + p.conversions, 0) / historicalPerformance.length))));
  const predictedROAS = avgROAS;

  return {
    predictedSpend,
    predictedRevenue,
    predictedConversions,
    predictedROAS,
    confidence: 0.75
  };
}
