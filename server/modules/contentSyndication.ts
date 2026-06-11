export interface SyndicationPartner {
  id: string;
  name: string;
  platform: string;
  audience: number;
  paymentPerArticle: number;
  paymentPerView: number;
  status: "active" | "pending" | "inactive";
  contentTypes: string[];
  minimumQuality: number;
}

export interface SyndicatedContent {
  id: string;
  originalArticleId: string;
  partnerId: string;
  syndicatedUrl: string;
  views: number;
  clicks: number;
  revenue: number;
  status: "published" | "pending" | "rejected";
  publishedDate: Date;
}

/**
 * Generiert Content-Syndication-Partnerschaften
 */
export function generateSyndicationPartners(): SyndicationPartner[] {
  return [
    {
      id: "partner_1",
      name: "Medium",
      platform: "Medium",
      audience: 10000000,
      paymentPerArticle: 50,
      paymentPerView: 0.001,
      status: "active",
      contentTypes: ["Blog posts", "Tutorials", "Case studies"],
      minimumQuality: 7,
    },
    {
      id: "partner_2",
      name: "Dev.to",
      platform: "Dev.to",
      audience: 2000000,
      paymentPerArticle: 25,
      paymentPerView: 0.0005,
      status: "active",
      contentTypes: ["Technical posts", "Tutorials", "Tips"],
      minimumQuality: 6,
    },
    {
      id: "partner_3",
      name: "Hashnode",
      platform: "Hashnode",
      audience: 1500000,
      paymentPerArticle: 30,
      paymentPerView: 0.0008,
      status: "active",
      contentTypes: ["Tech blogs", "Guides", "News"],
      minimumQuality: 7,
    },
    {
      id: "partner_4",
      name: "LinkedIn Articles",
      platform: "LinkedIn",
      audience: 900000000,
      paymentPerArticle: 100,
      paymentPerView: 0.002,
      status: "pending",
      contentTypes: ["Business insights", "Career tips", "Industry news"],
      minimumQuality: 8,
    },
    {
      id: "partner_5",
      name: "Substack",
      platform: "Substack",
      audience: 5000000,
      paymentPerArticle: 75,
      paymentPerView: 0.0015,
      status: "active",
      contentTypes: ["Newsletters", "Essays", "Analysis"],
      minimumQuality: 7,
    },
  ];
}

/**
 * Berechnet Syndication-Revenue-Potenzial
 */
export function calculateSyndicationRevenue(
  monthlyArticles: number,
  avgViewsPerArticle: number,
  partners: SyndicationPartner[]
): {
  partner: string;
  monthlyRevenue: number;
  annualRevenue: number;
}[] {
  return partners.map((partner) => {
    const fixedRevenue = monthlyArticles * partner.paymentPerArticle;
    const variableRevenue = monthlyArticles * avgViewsPerArticle * partner.paymentPerView;
    const monthlyRevenue = fixedRevenue + variableRevenue;

    return {
      partner: partner.name,
      monthlyRevenue: Math.round(monthlyRevenue),
      annualRevenue: Math.round(monthlyRevenue * 12),
    };
  });
}

/**
 * Generiert Content-Adaptation-Strategien
 */
export function generateContentAdaptationStrategies(): {
  platform: string;
  format: string;
  length: string;
  keyModifications: string[];
}[] {
  return [
    {
      platform: "Medium",
      format: "Long-form article",
      length: "2000-5000 words",
      keyModifications: ["Add images", "Include highlights", "Add social proof"],
    },
    {
      platform: "Dev.to",
      format: "Technical tutorial",
      length: "1500-3000 words",
      keyModifications: ["Add code snippets", "Include examples", "Step-by-step"],
    },
    {
      platform: "LinkedIn",
      format: "Professional insight",
      length: "800-1500 words",
      keyModifications: ["Business angle", "Professional tone", "Industry insights"],
    },
    {
      platform: "Substack",
      format: "Newsletter article",
      length: "1000-2000 words",
      keyModifications: ["Conversational tone", "Personal story", "Call-to-action"],
    },
  ];
}

/**
 * Generiert Syndication-Optimization-Tipps
 */
export function generateSyndicationOptimizationTips(): {
      tip: string;
  impact: number;
  implementation: string;
}[] {
  return [
    {
      tip: "Optimize Headlines",
      impact: 35,
      implementation: "Test different headlines for each platform",
    },
    {
      tip: "Add Platform-Specific CTAs",
      impact: 25,
      implementation: "Include platform-appropriate calls-to-action",
    },
    {
      tip: "Timing Optimization",
      impact: 20,
      implementation: "Publish at optimal times for each platform",
    },
    {
      tip: "Cross-Promotion",
      impact: 30,
      implementation: "Link between syndicated articles",
    },
    {
      tip: "Exclusive Content",
      impact: 40,
      implementation: "Add exclusive bonuses for each platform",
    },
  ];
}

/**
 * Berechnet Multi-Platform-Syndication-ROI
 */
export function calculateMultiPlatformROI(
  contentCreationCost: number,
  syndicationRevenue: number,
  additionalTrafficValue: number
): {
  totalRevenue: number;
  roi: number;
  paybackPeriod: number;
} {
  const totalRevenue = syndicationRevenue + additionalTrafficValue;
  const roi = ((totalRevenue - contentCreationCost) / contentCreationCost) * 100;
  const paybackPeriod = contentCreationCost / (totalRevenue / 12); // in months

  return {
    totalRevenue: Math.round(totalRevenue),
    roi: Math.round(roi),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
  };
}

/**
 * Generiert Content-Licensing-Optionen
 */
export function generateContentLicensingOptions(): {
  license: string;
  price: number;
  usage: string;
  restrictions: string[];
}[] {
  return [
    {
      license: "Standard License",
      price: 100,
      usage: "Single publication",
      restrictions: ["No modifications", "Credit required", "Non-exclusive"],
    },
    {
      license: "Extended License",
      price: 300,
      usage: "Multiple publications",
      restrictions: ["Minor modifications allowed", "Credit required"],
    },
    {
      license: "Commercial License",
      price: 1000,
      usage: "Unlimited commercial use",
      restrictions: ["None - full rights"],
    },
  ];
}
