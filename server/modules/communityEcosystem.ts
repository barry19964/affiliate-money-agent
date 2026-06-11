export interface CommunityTier {
  id: string;
  name: string;
  monthlyPrice: number;
  features: string[];
  maxMembers?: number;
  currentMembers: number;
  revenue: number;
}

export interface CommunityEvent {
  id: string;
  name: string;
  type: "webinar" | "mastermind" | "networking" | "workshop";
  price: number;
  capacity: number;
  registered: number;
  revenue: number;
  date: Date;
}

/**
 * Generiert Community-Tier-Struktur
 */
export function generateCommunityTiers(): CommunityTier[] {
  return [
    {
      id: "tier_1",
      name: "Free Community",
      monthlyPrice: 0,
      features: [
        "Access to Discord",
        "Monthly webinars",
        "Resource library",
        "Networking",
      ],
      currentMembers: 5000,
      revenue: 0,
    },
    {
      id: "tier_2",
      name: "Pro Member",
      monthlyPrice: 49,
      features: [
        "Everything in Free",
        "1-on-1 coaching",
        "Advanced templates",
        "Priority support",
        "Exclusive tools",
      ],
      maxMembers: 500,
      currentMembers: 250,
      revenue: 12250,
    },
    {
      id: "tier_3",
      name: "Elite Member",
      monthlyPrice: 199,
      features: [
        "Everything in Pro",
        "Done-for-you setup",
        "Private mastermind",
        "Agency partnership",
        "Custom solutions",
      ],
      maxMembers: 100,
      currentMembers: 45,
      revenue: 8955,
    },
    {
      id: "tier_4",
      name: "VIP Partner",
      monthlyPrice: 999,
      features: [
        "Everything in Elite",
        "White-label access",
        "Revenue sharing",
        "Co-marketing",
        "Equity option",
      ],
      maxMembers: 20,
      currentMembers: 8,
      revenue: 7992,
    },
  ];
}

/**
 * Berechnet Community-MRR und ARR
 */
export function calculateCommunityMetrics(tiers: CommunityTier[]): {
  totalMRR: number;
  totalARR: number;
  totalMembers: number;
  averagePrice: number;
} {
  const totalMRR = tiers.reduce((sum, tier) => sum + tier.revenue, 0);
  const totalARR = totalMRR * 12;
  const totalMembers = tiers.reduce((sum, tier) => sum + tier.currentMembers, 0);
  const averagePrice = totalMRR > 0 ? totalMRR / totalMembers : 0;

  return {
    totalMRR: Math.round(totalMRR),
    totalARR: Math.round(totalARR),
    totalMembers,
    averagePrice: Math.round(averagePrice * 100) / 100,
  };
}

/**
 * Generiert Community-Events
 */
export function generateCommunityEvents(): CommunityEvent[] {
  return [
    {
      id: "event_1",
      name: "AI Automation Mastermind",
      type: "mastermind",
      price: 297,
      capacity: 50,
      registered: 42,
      revenue: 12474,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "event_2",
      name: "Affiliate Marketing Workshop",
      type: "workshop",
      price: 197,
      capacity: 100,
      registered: 78,
      revenue: 15366,
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "event_3",
      name: "Networking Mixer",
      type: "networking",
      price: 97,
      capacity: 200,
      registered: 156,
      revenue: 15132,
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    },
  ];
}

/**
 * Berechnet Community-Wachstumsprognose
 */
export function projectCommunityGrowth(
  currentMembers: number,
  monthlyGrowthRate: number,
  months: number
): {
  month: number;
  members: number;
  revenue: number;
}[] {
  const projections = [];
  let members = currentMembers;

  for (let i = 1; i <= months; i++) {
    members = Math.floor(members * (1 + monthlyGrowthRate / 100));
    const revenue = members * 75; // Average price

    projections.push({
      month: i,
      members,
      revenue,
    });
  }

  return projections;
}

/**
 * Generiert Community-Engagement-Strategien
 */
export function generateEngagementStrategies(): {
  strategy: string;
  frequency: string;
  expectedEngagement: number;
}[] {
  return [
    {
      strategy: "Weekly Mastermind Calls",
      frequency: "Every Monday",
      expectedEngagement: 65,
    },
    {
      strategy: "Daily Discord Discussions",
      frequency: "Ongoing",
      expectedEngagement: 45,
    },
    {
      strategy: "Monthly Workshops",
      frequency: "First Friday",
      expectedEngagement: 55,
    },
    {
      strategy: "Quarterly Retreats",
      frequency: "Seasonal",
      expectedEngagement: 80,
    },
  ];
}

/**
 * Berechnet Churn-Reduktions-Strategien
 */
export function calculateChurnReduction(): {
  strategy: string;
  expectedChurnReduction: number;
  implementation: string;
}[] {
  return [
    {
      strategy: "Onboarding Program",
      expectedChurnReduction: 20,
      implementation: "Structured 30-day onboarding with milestones",
    },
    {
      strategy: "Success Tracking",
      expectedChurnReduction: 25,
      implementation: "Monthly check-ins and progress reviews",
    },
    {
      strategy: "Exclusive Benefits",
      expectedChurnReduction: 30,
      implementation: "Tiered perks and exclusive access",
    },
    {
      strategy: "Community Events",
      expectedChurnReduction: 35,
      implementation: "Regular networking and learning events",
    },
  ];
}
