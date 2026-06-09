export interface AffiliateNetwork {
  id: string;
  name: string;
  category: string;
  commission: number;
  paymentMethod: string;
  minimumPayout: number;
  trackingType: "cookie" | "link" | "api";
  status: "active" | "pending" | "inactive";
  monthlyEarnings: number;
}

export interface AffiliatePerformance {
  networkId: string;
  clicks: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  roi: number;
}

/**
 * Generiert hochwertige Affiliate-Netzwerke für AI/Produktivitäts-Nische
 */
export function generateAffiliateNetworks(): AffiliateNetwork[] {
  return [
    // Bestehende Programme
    {
      id: "aff_1",
      name: "GPT Prompt Maker",
      category: "AI Tools",
      commission: 30,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "active",
      monthlyEarnings: 0,
    },
    {
      id: "aff_2",
      name: "Copy.ai",
      category: "AI Writing",
      commission: 30,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "active",
      monthlyEarnings: 0,
    },
    // Neue hochwertige Programme
    {
      id: "aff_3",
      name: "Stripe",
      category: "Payment Processing",
      commission: 30,
      paymentMethod: "Bank Transfer",
      minimumPayout: 100,
      trackingType: "api",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_4",
      name: "Gumroad",
      category: "Digital Products",
      commission: 30,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_5",
      name: "Appsumo",
      category: "SaaS Deals",
      commission: 40,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_6",
      name: "Amazon Associates",
      category: "Tech Products",
      commission: 5,
      paymentMethod: "Bank Transfer",
      minimumPayout: 100,
      trackingType: "cookie",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_7",
      name: "Udemy",
      category: "Online Courses",
      commission: 20,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_8",
      name: "Skillshare",
      category: "Learning Platform",
      commission: 30,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_9",
      name: "Teachable",
      category: "Course Platform",
      commission: 30,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "api",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "aff_10",
      name: "Zapier",
      category: "Automation",
      commission: 25,
      paymentMethod: "PayPal",
      minimumPayout: 50,
      trackingType: "link",
      status: "pending",
      monthlyEarnings: 0,
    },
  ];
}

/**
 * Berechnet Affiliate-Performance-Metriken
 */
export function calculateAffiliatePerformance(
  clicks: number,
  conversions: number,
  revenue: number,
  commission: number
): AffiliatePerformance {
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
  const averageOrderValue = conversions > 0 ? revenue / conversions : 0;
  const affiliateRevenue = (revenue * commission) / 100;
  const roi = clicks > 0 ? (affiliateRevenue / clicks) * 100 : 0;

  return {
    networkId: "",
    clicks,
    conversions,
    revenue,
    conversionRate: Math.round(conversionRate * 100) / 100,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    roi: Math.round(roi * 100) / 100,
  };
}

/**
 * Generiert Affiliate-Diversifikations-Strategie
 */
export function generateDiversificationStrategy(
  currentNetworks: AffiliateNetwork[]
): {
  recommendation: string;
  targetNetworks: string[];
  expectedIncrease: number;
}[] {
  return [
    {
      recommendation: "Add high-commission SaaS programs (30-40% commission)",
      targetNetworks: ["Stripe", "Gumroad", "Appsumo", "Teachable"],
      expectedIncrease: 150,
    },
    {
      recommendation: "Add volume-based programs (Amazon, Udemy)",
      targetNetworks: ["Amazon Associates", "Udemy", "Skillshare"],
      expectedIncrease: 80,
    },
    {
      recommendation: "Add API-based tracking for better attribution",
      targetNetworks: ["Stripe", "Teachable", "Zapier"],
      expectedIncrease: 50,
    },
  ];
}

/**
 * Berechnet optimale Affiliate-Mix
 */
export function calculateOptimalAffiliateMix(
  monthlyTraffic: number,
  targetMonthlyRevenue: number
): {
  networks: string[];
  expectedCommission: number;
  requiredConversionRate: number;
} {
  const avgCommission = 25; // 25% average
  const requiredConversions = targetMonthlyRevenue / (monthlyTraffic * 0.01 * avgCommission);
  const requiredConversionRate = (requiredConversions / monthlyTraffic) * 100;

  return {
    networks: [
      "High-commission (30%+): Stripe, Gumroad, Appsumo",
      "Medium-commission (20-30%): Udemy, Skillshare, Teachable",
      "Volume-based (5-10%): Amazon, Zapier",
    ],
    expectedCommission: avgCommission,
    requiredConversionRate: Math.round(requiredConversionRate * 100) / 100,
  };
}

/**
 * Generiert Affiliate-Recruitment-Strategie
 */
export function generateRecruitmentStrategy(): string[] {
  return [
    "1. Prioritize high-commission programs (30%+)",
    "2. Focus on relevant niches (AI, Productivity, SaaS)",
    "3. Join affiliate networks (CJ Affiliate, Impact, ShareASale)",
    "4. Negotiate custom rates for high-traffic sites",
    "5. Use affiliate tracking tools (Refersion, Tapfiliate)",
    "6. Create dedicated landing pages for each program",
    "7. A/B test different affiliate links",
    "8. Build relationships with affiliate managers",
  ];
}
