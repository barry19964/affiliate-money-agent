/**
 * Automated Influencer Outreach System
 * Finds relevant influencers and generates personalized outreach campaigns
 */

export interface Influencer {
  id: string;
  name: string;
  platform: "tiktok" | "instagram" | "youtube" | "twitter" | "linkedin";
  handle: string;
  followers: number;
  engagement: number; // percentage
  niche: string;
  averageViewsPerPost: number;
  estimatedCostPerPost: number;
  email?: string;
  bio: string;
}

export interface OutreachCampaign {
  id: string;
  influencerId: string;
  influencerName: string;
  platform: string;
  campaignType: "product_review" | "affiliate_promotion" | "sponsored_post" | "collaboration";
  proposedFee: number;
  estimatedReach: number;
  estimatedConversions: number;
  estimatedRevenue: number;
  pitchEmail: string;
  status: "draft" | "sent" | "accepted" | "rejected" | "completed";
  createdAt: Date;
  responseDate?: Date;
}

export interface InfluencerPerformance {
  campaignId: string;
  influencerId: string;
  influencerName: string;
  platform: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  engagement: number;
}

/**
 * Generate list of relevant influencers for niche
 */
export function findInfluencersForNiche(niche: string, minFollowers: number = 10000): Influencer[] {
  const influencerDatabase: Record<string, Influencer[]> = {
    "Finance & Investing": [
      {
        id: "inf_001",
        name: "Alex Crypto",
        platform: "youtube",
        handle: "@alexcrypto",
        followers: 250000,
        engagement: 8.5,
        niche: "Finance & Investing",
        averageViewsPerPost: 50000,
        estimatedCostPerPost: 2000,
        email: "alex@cryptoinfluencer.com",
        bio: "Crypto and investment expert with 250K subscribers"
      },
      {
        id: "inf_002",
        name: "Stock Market Sam",
        platform: "tiktok",
        handle: "@stockmarketsam",
        followers: 500000,
        engagement: 12.3,
        niche: "Finance & Investing",
        averageViewsPerPost: 150000,
        estimatedCostPerPost: 3000,
        email: "sam@stockinfluencer.com",
        bio: "Making finance fun for Gen Z investors"
      },
      {
        id: "inf_003",
        name: "Trading Tips Tom",
        platform: "instagram",
        handle: "@tradingtipstom",
        followers: 180000,
        engagement: 7.2,
        niche: "Finance & Investing",
        averageViewsPerPost: 25000,
        estimatedCostPerPost: 1500,
        email: "tom@tradinginfluencer.com",
        bio: "Daily trading tips and market analysis"
      }
    ],
    "Health & Medical": [
      {
        id: "inf_004",
        name: "Fitness Fiona",
        platform: "instagram",
        handle: "@fitnessfiona",
        followers: 320000,
        engagement: 9.8,
        niche: "Health & Medical",
        averageViewsPerPost: 40000,
        estimatedCostPerPost: 1800,
        email: "fiona@fitnessinfluencer.com",
        bio: "Fitness transformation and wellness tips"
      },
      {
        id: "inf_005",
        name: "Health Hacks Helen",
        platform: "youtube",
        handle: "@healthhackshelen",
        followers: 420000,
        engagement: 10.5,
        niche: "Health & Medical",
        averageViewsPerPost: 80000,
        estimatedCostPerPost: 2500,
        email: "helen@healthinfluencer.com",
        bio: "Natural health solutions and wellness"
      }
    ],
    "Technology & Software": [
      {
        id: "inf_006",
        name: "Tech Guru Greg",
        platform: "youtube",
        handle: "@techgurugreg",
        followers: 550000,
        engagement: 11.2,
        niche: "Technology & Software",
        averageViewsPerPost: 120000,
        estimatedCostPerPost: 3500,
        email: "greg@techinfluencer.com",
        bio: "Latest tech gadgets and software reviews"
      },
      {
        id: "inf_007",
        name: "AI Insights Amy",
        platform: "linkedin",
        handle: "@aiinsightsamy",
        followers: 150000,
        engagement: 6.8,
        niche: "Technology & Software",
        averageViewsPerPost: 15000,
        estimatedCostPerPost: 1200,
        email: "amy@aiinfluencer.com",
        bio: "AI and machine learning insights"
      }
    ],
    "Business & Entrepreneurship": [
      {
        id: "inf_008",
        name: "Startup Steve",
        platform: "linkedin",
        handle: "@startupsteve",
        followers: 280000,
        engagement: 8.1,
        niche: "Business & Entrepreneurship",
        averageViewsPerPost: 35000,
        estimatedCostPerPost: 1600,
        email: "steve@startupinfluencer.com",
        bio: "Startup advice and business growth"
      },
      {
        id: "inf_009",
        name: "Marketing Maven Mike",
        platform: "twitter",
        handle: "@marketingmavenm",
        followers: 200000,
        engagement: 7.5,
        niche: "Business & Entrepreneurship",
        averageViewsPerPost: 30000,
        estimatedCostPerPost: 1400,
        email: "mike@marketinginfluencer.com",
        bio: "Marketing strategies and business tips"
      }
    ],
    "Gaming & Entertainment": [
      {
        id: "inf_010",
        name: "Gaming Guru Gary",
        platform: "tiktok",
        handle: "@gaminggurugary",
        followers: 800000,
        engagement: 14.2,
        niche: "Gaming & Entertainment",
        averageViewsPerPost: 250000,
        estimatedCostPerPost: 4000,
        email: "gary@gaminginfluencer.com",
        bio: "Gaming reviews and esports coverage"
      }
    ]
  };

  const influencers = influencerDatabase[niche] || [];
  return influencers.filter(inf => inf.followers >= minFollowers);
}

/**
 * Generate personalized pitch email for influencer
 */
export function generatePitchEmail(
  influencer: Influencer,
  productName: string,
  productDescription: string,
  proposedFee: number,
  affiliateLink?: string
): string {
  const subject = `Partnership Opportunity: ${productName} 🚀`;

  const body = `Hi ${influencer.name},

I've been following your amazing content on ${influencer.platform} and I'm really impressed with your ${influencer.engagement}% engagement rate and ${influencer.followers.toLocaleString()} followers!

I think your audience would absolutely love **${productName}**. Here's why:

${productDescription}

**What I'm offering:**
- €${proposedFee} for a dedicated post/video
- Full creative freedom - you decide how to present it
- Exclusive affiliate link for tracking performance
- Potential for ongoing partnership if it performs well

**What you'll get:**
- Direct payment within 7 days
- Professional product materials
- Affiliate commission on sales (additional earnings!)
- Feature on our partner page

**Performance potential:**
- Estimated reach: ${(influencer.averageViewsPerPost * 0.15).toLocaleString()} people
- Estimated conversions: ${Math.round(influencer.averageViewsPerPost * 0.02)}
- Potential revenue for you: €${Math.round(proposedFee * 1.5)}+

I'd love to discuss this further. Are you interested in a quick call this week?

Best regards,
Your Affiliate Money Agent 🤖

P.S. I'm also open to other collaboration ideas if you have something in mind!`;

  return `Subject: ${subject}\n\n${body}`;
}

/**
 * Create outreach campaign
 */
export function createOutreachCampaign(
  influencer: Influencer,
  campaignType: "product_review" | "affiliate_promotion" | "sponsored_post" | "collaboration",
  productName: string,
  productDescription: string,
  proposedFee: number
): OutreachCampaign {
  const estimatedReach = influencer.averageViewsPerPost * 0.15; // 15% of followers see it
  const estimatedConversions = Math.round(estimatedReach * 0.02); // 2% conversion rate
  const estimatedRevenue = estimatedConversions * 25; // €25 average order value

  return {
    id: `camp_${Date.now()}`,
    influencerId: influencer.id,
    influencerName: influencer.name,
    platform: influencer.platform,
    campaignType,
    proposedFee,
    estimatedReach: Math.round(estimatedReach),
    estimatedConversions,
    estimatedRevenue,
    pitchEmail: generatePitchEmail(influencer, productName, productDescription, proposedFee),
    status: "draft",
    createdAt: new Date()
  };
}

/**
 * Calculate campaign ROI
 */
export function calculateCampaignROI(campaign: OutreachCampaign): {
  roi: number;
  paybackPeriod: number;
  recommendation: string;
} {
  const roi = ((campaign.estimatedRevenue - campaign.proposedFee) / campaign.proposedFee) * 100;
  const paybackPeriod = campaign.proposedFee > 0 ? Math.ceil(campaign.proposedFee / (campaign.estimatedRevenue / 30)) : 0;

  return {
    roi: Math.round(roi),
    paybackPeriod,
    recommendation: roi > 100 ? "Highly recommended" : roi > 0 ? "Recommended" : "Not recommended"
  };
}

/**
 * Generate influencer outreach strategy
 */
export function generateOutreachStrategy(niche: string, budget: number): {
  influencers: Influencer[];
  campaigns: OutreachCampaign[];
  totalBudget: number;
  estimatedRevenue: number;
  estimatedROI: number;
  timeline: string[];
} {
  const influencers = findInfluencersForNiche(niche);
  const campaigns: OutreachCampaign[] = [];
  let totalSpent = 0;

  // Allocate budget across influencers
  for (const influencer of influencers) {
    if (totalSpent >= budget) break;

    const proposedFee = Math.min(influencer.estimatedCostPerPost, budget - totalSpent);
    const campaign = createOutreachCampaign(
      influencer,
      "sponsored_post",
      "Amazing New Product",
      "This product will change your life!",
      proposedFee
    );

    campaigns.push(campaign);
    totalSpent += proposedFee;
  }

  const totalRevenue = campaigns.reduce((sum, c) => sum + c.estimatedRevenue, 0);
  const totalROI = ((totalRevenue - totalSpent) / totalSpent) * 100;

  return {
    influencers: influencers.slice(0, campaigns.length),
    campaigns,
    totalBudget: totalSpent,
    estimatedRevenue: totalRevenue,
    estimatedROI: Math.round(totalROI),
    timeline: [
      "Week 1: Send outreach emails",
      "Week 2: Negotiate and finalize deals",
      "Week 3: Provide product materials",
      "Week 4: Influencers create content",
      "Week 5: Content goes live",
      "Week 6-8: Track performance",
      "Week 9: Analyze results and optimize"
    ]
  };
}

/**
 * Get top performing influencers by ROI
 */
export function getTopInfluencers(niche: string, limit: number = 5): Influencer[] {
  const influencers = findInfluencersForNiche(niche);
  return influencers
    .sort((a, b) => {
      const scoreA = a.followers * (a.engagement / 100);
      const scoreB = b.followers * (b.engagement / 100);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Generate influencer performance report
 */
export function generateInfluencerReport(campaigns: OutreachCampaign[]): {
  totalCampaigns: number;
  totalInvestment: number;
  totalRevenue: number;
  averageROI: number;
  topPerformer: OutreachCampaign | null;
  recommendations: string[];
} {
  const totalInvestment = campaigns.reduce((sum, c) => sum + c.proposedFee, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.estimatedRevenue, 0);
  const averageROI = totalInvestment > 0 ? ((totalRevenue - totalInvestment) / totalInvestment) * 100 : 0;

  const topPerformer = campaigns.reduce((best, current) => {
    const currentROI = (current.estimatedRevenue - current.proposedFee) / current.proposedFee;
    const bestROI = (best.estimatedRevenue - best.proposedFee) / best.proposedFee;
    return currentROI > bestROI ? current : best;
  }, campaigns[0] || null);

  return {
    totalCampaigns: campaigns.length,
    totalInvestment,
    totalRevenue,
    averageROI: Math.round(averageROI),
    topPerformer,
    recommendations: [
      "Focus on high-engagement influencers",
      "Test different campaign types",
      "Build long-term relationships",
      "Negotiate better rates with top performers",
      "Create exclusive offers for followers",
      "Track all metrics carefully"
    ]
  };
}
