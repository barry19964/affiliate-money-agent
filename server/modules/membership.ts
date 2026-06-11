export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "annual";
  features: string[];
  maxMembers?: number;
  currentMembers: number;
}

export interface Subscriber {
  id: string;
  email: string;
  tier: string;
  status: "active" | "cancelled" | "paused";
  joinedAt: Date;
  renewalDate: Date;
  totalSpent: number;
}

export interface MembershipMetrics {
  totalMembers: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  churnRate: number;
  lifetimeValue: number;
  growthRate: number;
}

/**
 * Erstellt Membership-Tiers
 */
export function createMembershipTiers(): MembershipTier[] {
  return [
    {
      id: "tier_basic",
      name: "Basic",
      price: 9,
      currency: "EUR",
      billingCycle: "monthly",
      features: [
        "Access to all blog posts",
        "Weekly newsletter",
        "Community forum access",
      ],
      currentMembers: 0,
    },
    {
      id: "tier_pro",
      name: "Pro",
      price: 29,
      currency: "EUR",
      billingCycle: "monthly",
      features: [
        "All Basic features",
        "Exclusive courses",
        "Monthly webinars",
        "Priority support",
        "Ad-free experience",
      ],
      currentMembers: 0,
    },
    {
      id: "tier_premium",
      name: "Premium",
      price: 99,
      currency: "EUR",
      billingCycle: "monthly",
      features: [
        "All Pro features",
        "1-on-1 coaching",
        "Private community",
        "Custom templates",
        "Early access to products",
      ],
      currentMembers: 0,
    },
  ];
}

/**
 * Berechnet MRR (Monthly Recurring Revenue)
 */
export function calculateMRR(tiers: MembershipTier[]): number {
  return tiers.reduce((sum, tier) => {
    const monthlyRevenue = tier.price * tier.currentMembers;
    return sum + monthlyRevenue;
  }, 0);
}

/**
 * Berechnet ARR (Annual Recurring Revenue)
 */
export function calculateARR(mrr: number): number {
  return mrr * 12;
}

/**
 * Berechnet Churn Rate
 */
export function calculateChurnRate(
  startingMembers: number,
  cancelledMembers: number
): number {
  if (startingMembers === 0) return 0;
  return (cancelledMembers / startingMembers) * 100;
}

/**
 * Berechnet Lifetime Value
 */
export function calculateLTV(
  averageMonthlyRevenue: number,
  averageChurnRate: number
): number {
  const monthlyChurnRate = averageChurnRate / 100;
  if (monthlyChurnRate === 0) return averageMonthlyRevenue * 120; // 10 years
  return averageMonthlyRevenue / monthlyChurnRate;
}

/**
 * Generiert Membership-Metriken
 */
export function generateMembershipMetrics(
  tiers: MembershipTier[],
  monthlyGrowth: number = 0.1
): MembershipMetrics {
  const totalMembers = tiers.reduce((sum, tier) => sum + tier.currentMembers, 0);
  const mrr = calculateMRR(tiers);
  const arr = calculateARR(mrr);
  const churnRate = calculateChurnRate(totalMembers, Math.ceil(totalMembers * 0.05)); // 5% churn
  const ltv = calculateLTV(mrr / Math.max(totalMembers, 1), churnRate);

  return {
    totalMembers,
    monthlyRecurringRevenue: Math.round(mrr),
    annualRecurringRevenue: Math.round(arr),
    churnRate: Math.round(churnRate * 100) / 100,
    lifetimeValue: Math.round(ltv),
    growthRate: monthlyGrowth * 100,
  };
}

/**
 * Generiert Retention-Strategien
 */
export function generateRetentionStrategies(): string[] {
  return [
    "Weekly exclusive content for members",
    "Monthly live Q&A sessions",
    "Exclusive discounts on digital products",
    "Early access to new content",
    "Community recognition (badges, leaderboards)",
    "Personalized learning paths",
    "Quarterly member surveys",
    "VIP support channel",
  ];
}

/**
 * Berechnet optimale Membership-Preise
 */
export function optimizeMembershipPricing(
  targetMonthlyRevenue: number,
  estimatedMembers: number
): MembershipTier[] {
  const avgPrice = targetMonthlyRevenue / estimatedMembers;

  return [
    {
      id: "tier_basic",
      name: "Basic",
      price: Math.round(avgPrice * 0.4),
      currency: "EUR",
      billingCycle: "monthly",
      features: ["Basic access"],
      currentMembers: 0,
    },
    {
      id: "tier_pro",
      name: "Pro",
      price: Math.round(avgPrice),
      currency: "EUR",
      billingCycle: "monthly",
      features: ["Pro access"],
      currentMembers: 0,
    },
    {
      id: "tier_premium",
      name: "Premium",
      price: Math.round(avgPrice * 2.5),
      currency: "EUR",
      billingCycle: "monthly",
      features: ["Premium access"],
      currentMembers: 0,
    },
  ];
}
