export interface Influencer {
  id: string;
  name: string;
  platform: "twitter" | "instagram" | "tiktok" | "youtube" | "linkedin";
  followers: number;
  engagementRate: number;
  niche: string;
  email?: string;
  status: "pending" | "contacted" | "interested" | "partnered";
  estimatedReach: number;
}

export interface InfluencerDeal {
  id: string;
  influencerId: string;
  dealType: "affiliate" | "sponsored" | "comarketing" | "revenue_share";
  budget: number;
  commission: number;
  startDate: Date;
  endDate: Date;
  status: "pending" | "active" | "completed";
  conversions: number;
  revenue: number;
}

/**
 * Generiert Influencer-Opportunities basierend auf Nische
 */
export function generateInfluencerOpportunities(niche: string): Influencer[] {
  const influencers: Influencer[] = [
    {
      id: "inf_1",
      name: "AI Expert Mike",
      platform: "twitter",
      followers: 50000,
      engagementRate: 3.5,
      niche: "AI & Automation",
      estimatedReach: 175000,
      status: "pending",
    },
    {
      id: "inf_2",
      name: "Productivity Queen",
      platform: "instagram",
      followers: 120000,
      engagementRate: 4.2,
      niche: "Productivity Tools",
      estimatedReach: 504000,
      status: "pending",
    },
    {
      id: "inf_3",
      name: "Tech Guru Dev",
      platform: "youtube",
      followers: 250000,
      engagementRate: 2.8,
      niche: "Tech & Development",
      estimatedReach: 700000,
      status: "pending",
    },
    {
      id: "inf_4",
      name: "SaaS Insider",
      platform: "linkedin",
      followers: 85000,
      engagementRate: 5.1,
      niche: "SaaS & Business",
      estimatedReach: 433500,
      status: "pending",
    },
    {
      id: "inf_5",
      name: "TikTok AI Creator",
      platform: "tiktok",
      followers: 500000,
      engagementRate: 6.2,
      niche: "AI Trends",
      estimatedReach: 3100000,
      status: "pending",
    },
  ];

  return influencers;
}

/**
 * Generiert Influencer-Outreach-Templates
 */
export function generateInfluencerOutreach(influencer: Influencer, brand: string): string {
  const templates: Record<string, string> = {
    twitter: `Hi ${influencer.name}! 👋

I've been following your amazing content on ${influencer.niche}. We're launching ${brand} and think your audience would love it.

Would you be interested in a partnership? We offer:
- Competitive affiliate commission (20-30%)
- Exclusive promo codes for your followers
- Co-marketing opportunities

Let's chat! 🚀`,

    instagram: `Hi ${influencer.name}! 

Your content on ${influencer.niche} is absolutely inspiring! We'd love to collaborate with you on ${brand}.

We're offering:
- Generous affiliate commissions
- Free access to premium features
- Exclusive partnership opportunities

DM me if interested! 💫`,

    youtube: `Hey ${influencer.name}!

Your ${influencer.niche} content is fantastic! We think ${brand} would be perfect for your audience.

Partnership options:
- Affiliate program (20-30% commission)
- Sponsored video opportunity
- Revenue share model

Let's discuss! 🎬`,

    linkedin: `Hello ${influencer.name},

I've been impressed with your insights on ${influencer.niche}. We're launching ${brand} and believe it aligns perfectly with your professional network.

Partnership benefits:
- Affiliate program with competitive rates
- Co-marketing opportunities
- Exclusive early access for your network

Would you be open to discussing this? 🤝`,

    tiktok: `Hey ${influencer.name}! 🎉

Your ${influencer.niche} content is viral-worthy! We're launching ${brand} and think your followers would go crazy for it.

We're offering:
- High affiliate commissions
- Exclusive creator codes
- Potential brand partnership

Let's create something amazing together! ✨`,
  };

  return templates[influencer.platform] || templates.twitter;
}

/**
 * Berechnet Influencer-Wert basierend auf Metriken
 */
export function calculateInfluencerValue(influencer: Influencer): {
  estimatedCost: number;
  estimatedROI: number;
  tier: string;
} {
  const reach = influencer.followers * (influencer.engagementRate / 100);
  const costPerEngagement = 0.5; // €0.50 per engagement
  const estimatedCost = reach * costPerEngagement;

  // Annahme: 2% Konversionsrate, €50 durchschnittlicher Wert
  const estimatedConversions = reach * 0.02;
  const estimatedRevenue = estimatedConversions * 50;
  const estimatedROI = ((estimatedRevenue - estimatedCost) / estimatedCost) * 100;

  let tier = "micro";
  if (influencer.followers > 100000) tier = "macro";
  if (influencer.followers > 1000000) tier = "mega";

  return {
    estimatedCost: Math.round(estimatedCost),
    estimatedROI: Math.round(estimatedROI),
    tier,
  };
}

/**
 * Generiert Co-Marketing-Strategien
 */
export function generateCoMarketingStrategy(influencer: Influencer): {
  channels: string[];
  contentTypes: string[];
  timeline: string;
  expectedReach: number;
}[] {
  return [
    {
      channels: [influencer.platform, "email", "blog"],
      contentTypes: ["Sponsored post", "Review", "Tutorial"],
      timeline: "2 weeks",
      expectedReach: influencer.estimatedReach * 1.5,
    },
    {
      channels: [influencer.platform, "newsletter"],
      contentTypes: ["Feature", "Interview", "Case study"],
      timeline: "4 weeks",
      expectedReach: influencer.estimatedReach * 2,
    },
  ];
}

/**
 * Berechnet Influencer-Deal-Performance
 */
export function calculateDealPerformance(deal: InfluencerDeal): {
  roi: number;
  costPerConversion: number;
  conversionRate: number;
} {
  const roi = deal.revenue > 0 ? ((deal.revenue - deal.budget) / deal.budget) * 100 : -100;
  const costPerConversion = deal.conversions > 0 ? deal.budget / deal.conversions : deal.budget;
  const conversionRate = deal.conversions > 0 ? (deal.conversions / (deal.budget / 5)) * 100 : 0;

  return {
    roi: Math.round(roi),
    costPerConversion: Math.round(costPerConversion * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
  };
}
