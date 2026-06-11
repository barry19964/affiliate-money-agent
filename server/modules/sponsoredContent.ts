export interface SponsorshipDeal {
  id: string;
  brand: string;
  dealType: "article" | "mention" | "review" | "video" | "podcast";
  budget: number;
  currency: string;
  deliverables: string[];
  status: "pending" | "active" | "completed" | "paid";
  startDate: Date;
  endDate: Date;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface SponsorshipOpportunity {
  id: string;
  industry: string;
  estimatedBudget: number;
  contactEmail?: string;
  relevanceScore: number;
}

/**
 * Generiert Sponsorship-Opportunities basierend auf Nische
 */
export function generateSponsorshipOpportunities(
  niche: string,
  monthlyTraffic: number
): SponsorshipOpportunity[] {
  // Für AI/Produktivitäts-Nische
  const opportunities: SponsorshipOpportunity[] = [
    {
      id: "opp_1",
      industry: "AI Tools",
      estimatedBudget: 500,
      contactEmail: "partnerships@openai.com",
      relevanceScore: 95,
    },
    {
      id: "opp_2",
      industry: "Project Management",
      estimatedBudget: 300,
      contactEmail: "marketing@asana.com",
      relevanceScore: 90,
    },
    {
      id: "opp_3",
      industry: "Productivity Apps",
      estimatedBudget: 250,
      contactEmail: "partnerships@notion.so",
      relevanceScore: 88,
    },
    {
      id: "opp_4",
      industry: "Learning Platforms",
      estimatedBudget: 400,
      contactEmail: "partnerships@skillshare.com",
      relevanceScore: 85,
    },
    {
      id: "opp_5",
      industry: "SaaS Tools",
      estimatedBudget: 600,
      contactEmail: "marketing@zapier.com",
      relevanceScore: 92,
    },
    {
      id: "opp_6",
      industry: "Cloud Services",
      estimatedBudget: 800,
      contactEmail: "partnerships@aws.amazon.com",
      relevanceScore: 80,
    },
  ];

  // Skaliere Budget basierend auf Traffic
  return opportunities.map((opp) => ({
    ...opp,
    estimatedBudget: Math.round(opp.estimatedBudget * (monthlyTraffic / 10000)),
  }));
}

/**
 * Generiert Sponsorship-Pitch-Templates
 */
export function generateSponsorshipPitch(
  brand: string,
  monthlyTraffic: number,
  niche: string
): string {
  return `Subject: Partnership Opportunity - Reach ${monthlyTraffic.toLocaleString()} ${niche} Professionals

Hi ${brand} Team,

We're reaching out with an exciting partnership opportunity. Our platform attracts ${monthlyTraffic.toLocaleString()} monthly visitors in the ${niche} space, with a highly engaged audience of decision-makers and professionals.

**Our Audience:**
- ${monthlyTraffic.toLocaleString()} monthly visitors
- 85% are decision-makers and professionals
- High engagement rate (4-6% CTR)
- Premium audience demographics

**Sponsorship Options:**
1. Sponsored Article (€500-1000)
2. Product Review (€750-1500)
3. Exclusive Mention (€300-600)
4. Co-branded Content (€1000-2000)
5. Long-term Partnership (€2000+/month)

**What You Get:**
- Prominent placement on our site
- Social media promotion (4 platforms)
- Email newsletter feature (${monthlyTraffic * 0.15} subscribers)
- Detailed performance report

We'd love to discuss how we can work together to reach your target audience.

Best regards`;
}

/**
 * Berechnet Sponsorship-Wert basierend auf Metriken
 */
export function calculateSponsorshipValue(
  monthlyTraffic: number,
  engagementRate: number,
  ctr: number
): {
  cpmRate: number;
  monthlyValue: number;
  yearlyValue: number;
} {
  // CPM (Cost Per Thousand Impressions) für Premium-Nische
  const baseCPM = 10; // €10 pro 1000 Impressionen
  const engagementMultiplier = 1 + engagementRate / 100;
  const ctrMultiplier = 1 + ctr / 10;

  const cpmRate = baseCPM * engagementMultiplier * ctrMultiplier;
  const monthlyImpressions = monthlyTraffic;
  const monthlyValue = (monthlyImpressions / 1000) * cpmRate;
  const yearlyValue = monthlyValue * 12;

  return {
    cpmRate: Math.round(cpmRate * 100) / 100,
    monthlyValue: Math.round(monthlyValue),
    yearlyValue: Math.round(yearlyValue),
  };
}

/**
 * Generiert Sponsorship-Performance-Report
 */
export function generatePerformanceReport(deal: SponsorshipDeal): {
  roi: number;
  costPerClick: number;
  costPerConversion: number;
  engagement: number;
} {
  const roi = deal.conversions > 0 ? (deal.conversions / deal.budget) * 100 : 0;
  const costPerClick = deal.clicks > 0 ? deal.budget / deal.clicks : 0;
  const costPerConversion = deal.conversions > 0 ? deal.budget / deal.conversions : 0;
  const engagement = deal.impressions > 0 ? ((deal.clicks / deal.impressions) * 100) : 0;

  return {
    roi: Math.round(roi * 100) / 100,
    costPerClick: Math.round(costPerClick * 100) / 100,
    costPerConversion: Math.round(costPerConversion * 100) / 100,
    engagement: Math.round(engagement * 100) / 100,
  };
}

/**
 * Berechnet optimale Sponsorship-Preise
 */
export function calculateOptimalSponsorshipPrice(
  monthlyTraffic: number,
  avgEngagementRate: number,
  dealType: string
): number {
  const basePrices: Record<string, number> = {
    article: 500,
    mention: 300,
    review: 750,
    video: 1000,
    podcast: 800,
  };

  const basePrice = basePrices[dealType] || 500;
  const trafficMultiplier = monthlyTraffic / 10000;
  const engagementMultiplier = 1 + avgEngagementRate / 100;

  return Math.round(basePrice * trafficMultiplier * engagementMultiplier);
}
