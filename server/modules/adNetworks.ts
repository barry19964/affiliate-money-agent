export interface AdNetwork {
  id: string;
  name: string;
  type: "display" | "native" | "video" | "contextual";
  cpm: number; // Cost Per Thousand Impressions
  minimumTraffic: number;
  paymentMethod: string;
  status: "active" | "pending" | "inactive";
  monthlyEarnings: number;
}

export interface AdPerformance {
  networkId: string;
  impressions: number;
  clicks: number;
  ctr: number; // Click-Through Rate
  revenue: number;
  rpm: number; // Revenue Per Thousand Impressions
}

/**
 * Generiert Ad-Network-Optionen basierend auf Traffic
 */
export function generateAdNetworks(monthlyTraffic: number): AdNetwork[] {
  // Nur für Traffic > 10.000/Monat
  if (monthlyTraffic < 10000) {
    return [
      {
        id: "ad_1",
        name: "Google AdSense",
        type: "display",
        cpm: 5,
        minimumTraffic: 1000,
        paymentMethod: "Bank Transfer",
        status: "pending",
        monthlyEarnings: 0,
      },
    ];
  }

  return [
    {
      id: "ad_1",
      name: "Google AdSense",
      type: "display",
      cpm: 5,
      minimumTraffic: 1000,
      paymentMethod: "Bank Transfer",
      status: "active",
      monthlyEarnings: 0,
    },
    {
      id: "ad_2",
      name: "Mediavine",
      type: "display",
      cpm: 15,
      minimumTraffic: 50000,
      paymentMethod: "Bank Transfer",
      status: monthlyTraffic >= 50000 ? "pending" : "inactive",
      monthlyEarnings: 0,
    },
    {
      id: "ad_3",
      name: "AdThrive",
      type: "display",
      cpm: 20,
      minimumTraffic: 100000,
      paymentMethod: "Bank Transfer",
      status: monthlyTraffic >= 100000 ? "pending" : "inactive",
      monthlyEarnings: 0,
    },
    {
      id: "ad_4",
      name: "Taboola",
      type: "native",
      cpm: 8,
      minimumTraffic: 10000,
      paymentMethod: "Bank Transfer",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "ad_5",
      name: "Outbrain",
      type: "native",
      cpm: 7,
      minimumTraffic: 10000,
      paymentMethod: "Bank Transfer",
      status: "pending",
      monthlyEarnings: 0,
    },
    {
      id: "ad_6",
      name: "YouTube Partner",
      type: "video",
      cpm: 10,
      minimumTraffic: 5000,
      paymentMethod: "Bank Transfer",
      status: "pending",
      monthlyEarnings: 0,
    },
  ];
}

/**
 * Berechnet Ad-Performance-Metriken
 */
export function calculateAdPerformance(
  impressions: number,
  clicks: number,
  cpm: number
): AdPerformance {
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const revenue = (impressions / 1000) * cpm;
  const rpm = impressions > 0 ? (revenue / impressions) * 1000 : 0;

  return {
    networkId: "",
    impressions,
    clicks,
    ctr: Math.round(ctr * 100) / 100,
    revenue: Math.round(revenue * 100) / 100,
    rpm: Math.round(rpm * 100) / 100,
  };
}

/**
 * Berechnet Ad-Einnahmen-Prognose
 */
export function projectAdRevenue(
  monthlyTraffic: number,
  avgCPM: number,
  avgCTR: number = 0.5
): {
  monthlyRevenue: number;
  annualRevenue: number;
  requiredTraffic: number;
} {
  const monthlyImpressions = monthlyTraffic;
  const monthlyRevenue = (monthlyImpressions / 1000) * avgCPM;
  const annualRevenue = monthlyRevenue * 12;

  // Traffic benötigt für €1000/Monat
  const requiredTraffic = (1000 * 1000) / avgCPM;

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    annualRevenue: Math.round(annualRevenue),
    requiredTraffic: Math.round(requiredTraffic),
  };
}

/**
 * Generiert Ad-Placement-Strategie
 */
export function generateAdPlacementStrategy(): {
  placement: string;
  expectedCTR: number;
  expectedRPM: number;
}[] {
  return [
    {
      placement: "Above the fold (Header)",
      expectedCTR: 0.8,
      expectedRPM: 12,
    },
    {
      placement: "In-content (Mid-article)",
      expectedCTR: 1.2,
      expectedRPM: 15,
    },
    {
      placement: "Sidebar",
      expectedCTR: 0.3,
      expectedRPM: 8,
    },
    {
      placement: "Below the fold (Footer)",
      expectedCTR: 0.2,
      expectedRPM: 5,
    },
    {
      placement: "Sticky header/footer",
      expectedCTR: 0.6,
      expectedRPM: 10,
    },
    {
      placement: "Native ads (Taboola/Outbrain)",
      expectedCTR: 2.5,
      expectedRPM: 8,
    },
  ];
}

/**
 * Berechnet optimale Ad-Mix
 */
export function calculateOptimalAdMix(monthlyTraffic: number): {
  networks: string[];
  estimatedMonthlyRevenue: number;
  strategy: string;
} {
  let networks: string[] = [];
  let avgCPM = 5;
  let strategy = "";

  if (monthlyTraffic < 10000) {
    networks = ["Google AdSense"];
    avgCPM = 5;
    strategy = "Start with AdSense, focus on growing traffic";
  } else if (monthlyTraffic < 50000) {
    networks = ["Google AdSense", "Taboola", "Outbrain"];
    avgCPM = 8;
    strategy = "Combine display + native ads for better revenue";
  } else if (monthlyTraffic < 100000) {
    networks = ["Mediavine", "Taboola", "Outbrain"];
    avgCPM = 15;
    strategy = "Use Mediavine for premium display ads";
  } else {
    networks = ["AdThrive", "Mediavine", "YouTube Partner"];
    avgCPM = 20;
    strategy = "Premium networks for maximum revenue";
  }

  const estimatedMonthlyRevenue = (monthlyTraffic / 1000) * avgCPM;

  return {
    networks,
    estimatedMonthlyRevenue: Math.round(estimatedMonthlyRevenue),
    strategy,
  };
}

/**
 * Generiert Ad-Optimization-Tipps
 */
export function generateOptimizationTips(): string[] {
  return [
    "1. Place ads above the fold for higher visibility",
    "2. Use responsive ads that adapt to all devices",
    "3. Avoid ad clutter (max 3 ads per page)",
    "4. Test different ad sizes (728x90, 300x250, 336x280)",
    "5. Optimize page speed (ads load faster = more revenue)",
    "6. Use contextual ads relevant to content",
    "7. Monitor CTR and adjust placements",
    "8. A/B test different ad networks",
    "9. Implement lazy loading for ads",
    "10. Use header bidding for better CPM rates",
  ];
}
