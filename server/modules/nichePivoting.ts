/**
 * AI-Driven Niche Pivoting System
 * Automatically analyzes and switches to higher-paying niches
 * Maximizes revenue by identifying trends and CPC opportunities
 */

export interface Niche {
  name: string;
  keywords: string[];
  cpc: number; // Cost Per Click in EUR
  competition: "low" | "medium" | "high";
  trend: "rising" | "stable" | "declining";
  estimatedMonthlyRevenue: number;
  viralPotential: number; // 0-100
  contentIdeas: string[];
}

export interface NichePivotRecommendation {
  currentNiche: string;
  recommendedNiche: string;
  revenueIncrease: number; // percentage
  estimatedNewRevenue: number;
  switchReason: string;
  implementationSteps: string[];
  timeToImplement: string;
  riskLevel: "low" | "medium" | "high";
}

export interface NicheAnalysis {
  niche: string;
  cpc: number;
  competition: string;
  trend: string;
  viralPotential: number;
  estimatedMonthlyRevenue: number;
  contentIdeas: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

/**
 * Get all available high-paying niches
 */
export function getAvailableNiches(): Niche[] {
  return [
    {
      name: "Finance & Investing",
      keywords: ["crypto", "stocks", "forex", "trading", "investment", "wealth"],
      cpc: 8.5,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 5000,
      viralPotential: 65,
      contentIdeas: [
        "Top 10 Crypto Coins to Watch",
        "Stock Market Secrets",
        "Passive Income Strategies",
        "Wealth Building Guide",
        "Investment Portfolio Setup"
      ]
    },
    {
      name: "Health & Medical",
      keywords: ["health", "medical", "fitness", "wellness", "diet", "supplements"],
      cpc: 7.2,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 4500,
      viralPotential: 75,
      contentIdeas: [
        "Natural Weight Loss Methods",
        "Health Supplements Guide",
        "Fitness Transformation Stories",
        "Medical Breakthroughs",
        "Wellness Routines"
      ]
    },
    {
      name: "Technology & Software",
      keywords: ["AI", "software", "tech", "programming", "coding", "SaaS"],
      cpc: 6.8,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 4200,
      viralPotential: 70,
      contentIdeas: [
        "AI Tools Review",
        "Software Hacks",
        "Coding Tutorials",
        "Tech Gadget Reviews",
        "SaaS Comparisons"
      ]
    },
    {
      name: "Insurance & Legal",
      keywords: ["insurance", "legal", "law", "attorney", "lawsuit", "protection"],
      cpc: 9.2,
      competition: "medium",
      trend: "stable",
      estimatedMonthlyRevenue: 5500,
      viralPotential: 40,
      contentIdeas: [
        "Insurance Buying Guide",
        "Legal Rights Explained",
        "Protection Strategies",
        "Lawsuit Information",
        "Coverage Comparison"
      ]
    },
    {
      name: "Real Estate",
      keywords: ["real estate", "property", "mortgage", "investment property", "home"],
      cpc: 8.9,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 5300,
      viralPotential: 55,
      contentIdeas: [
        "Property Investment Guide",
        "Mortgage Secrets",
        "Home Buying Tips",
        "Real Estate Trends",
        "Property Flipping Guide"
      ]
    },
    {
      name: "Education & Courses",
      keywords: ["online course", "education", "learning", "certification", "training"],
      cpc: 5.5,
      competition: "medium",
      trend: "rising",
      estimatedMonthlyRevenue: 3500,
      viralPotential: 60,
      contentIdeas: [
        "Best Online Courses",
        "Skill Learning Guide",
        "Career Development",
        "Certification Paths",
        "Learning Hacks"
      ]
    },
    {
      name: "Business & Entrepreneurship",
      keywords: ["business", "startup", "entrepreneur", "marketing", "sales"],
      cpc: 6.2,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 3800,
      viralPotential: 70,
      contentIdeas: [
        "Startup Ideas",
        "Business Growth Strategies",
        "Marketing Hacks",
        "Sales Techniques",
        "Entrepreneur Success Stories"
      ]
    },
    {
      name: "Gaming & Entertainment",
      keywords: ["gaming", "esports", "streaming", "entertainment", "gaming gear"],
      cpc: 4.8,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 3200,
      viralPotential: 85,
      contentIdeas: [
        "Gaming Reviews",
        "Esports News",
        "Streaming Setup Guide",
        "Gaming Gear Reviews",
        "Gaming Tips & Tricks"
      ]
    },
    {
      name: "Travel & Lifestyle",
      keywords: ["travel", "vacation", "lifestyle", "adventure", "tourism"],
      cpc: 3.5,
      competition: "high",
      trend: "rising",
      estimatedMonthlyRevenue: 2200,
      viralPotential: 80,
      contentIdeas: [
        "Travel Destination Guides",
        "Budget Travel Tips",
        "Lifestyle Hacks",
        "Adventure Stories",
        "Travel Gear Reviews"
      ]
    },
    {
      name: "Food & Nutrition",
      keywords: ["food", "recipe", "nutrition", "diet", "cooking"],
      cpc: 3.2,
      competition: "high",
      trend: "stable",
      estimatedMonthlyRevenue: 2000,
      viralPotential: 75,
      contentIdeas: [
        "Recipe Collections",
        "Nutrition Guides",
        "Cooking Tips",
        "Diet Plans",
        "Food Reviews"
      ]
    }
  ];
}

/**
 * Analyze current niche performance
 */
export function analyzeNiche(nicheName: string): NicheAnalysis {
  const niches = getAvailableNiches();
  const niche = niches.find(n => n.name === nicheName);

  if (!niche) {
    return {
      niche: nicheName,
      cpc: 0,
      competition: "unknown",
      trend: "unknown",
      viralPotential: 0,
      estimatedMonthlyRevenue: 0,
      contentIdeas: [],
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: []
    };
  }

  return {
    niche: niche.name,
    cpc: niche.cpc,
    competition: niche.competition,
    trend: niche.trend,
    viralPotential: niche.viralPotential,
    estimatedMonthlyRevenue: niche.estimatedMonthlyRevenue,
    contentIdeas: niche.contentIdeas,
    strengths: [
      `High CPC: €${niche.cpc}/click`,
      `Viral Potential: ${niche.viralPotential}%`,
      `Trend: ${niche.trend}`,
      `Monthly Revenue: €${niche.estimatedMonthlyRevenue}`
    ],
    weaknesses: [
      `Competition: ${niche.competition}`,
      niche.competition === "high" ? "Difficult to rank" : "Limited audience",
      niche.trend === "declining" ? "Declining trend" : "Stable market"
    ],
    opportunities: [
      "Affiliate partnerships",
      "Product creation",
      "Sponsorships",
      "Email list building",
      "Video content"
    ],
    threats: [
      "Competitor activity",
      "Algorithm changes",
      "Market saturation",
      "Trend shifts"
    ]
  };
}

/**
 * Find best niche pivot opportunity
 */
export function findBestNichePivot(currentNiche: string, currentMonthlyRevenue: number): NichePivotRecommendation {
  const niches = getAvailableNiches();
  const currentNicheData = niches.find(n => n.name === currentNiche);

  if (!currentNicheData) {
    return {
      currentNiche,
      recommendedNiche: "Finance & Investing",
      revenueIncrease: 150,
      estimatedNewRevenue: currentMonthlyRevenue * 2.5,
      switchReason: "Finance niche has highest CPC and revenue potential",
      implementationSteps: [
        "Research finance keywords",
        "Create 5 finance articles",
        "Build finance email list",
        "Setup finance affiliate links",
        "Promote to finance audience"
      ],
      timeToImplement: "2-3 weeks",
      riskLevel: "medium"
    };
  }

  // Find highest potential niche
  const bestNiche = niches.reduce((best, niche) => {
    const score = niche.cpc * (niche.viralPotential / 100) * (niche.trend === "rising" ? 1.2 : 1);
    const bestScore = best.cpc * (best.viralPotential / 100) * (best.trend === "rising" ? 1.2 : 1);
    return score > bestScore ? niche : best;
  });

  const revenueIncrease = ((bestNiche.estimatedMonthlyRevenue - currentNicheData.estimatedMonthlyRevenue) / currentNicheData.estimatedMonthlyRevenue) * 100;

  return {
    currentNiche,
    recommendedNiche: bestNiche.name,
    revenueIncrease: Math.round(revenueIncrease),
    estimatedNewRevenue: bestNiche.estimatedMonthlyRevenue,
    switchReason: `${bestNiche.name} has ${revenueIncrease > 0 ? "higher" : "lower"} CPC (€${bestNiche.cpc}) and ${bestNiche.trend} trend with ${bestNiche.viralPotential}% viral potential`,
    implementationSteps: [
      `Research ${bestNiche.name} keywords`,
      `Create 5-10 ${bestNiche.name} articles`,
      `Build ${bestNiche.name} email list`,
      `Setup ${bestNiche.name} affiliate links`,
      `Promote to ${bestNiche.name} audience`,
      `Monitor performance and optimize`
    ],
    timeToImplement: "2-4 weeks",
    riskLevel: revenueIncrease > 100 ? "medium" : "low"
  };
}

/**
 * Get hybrid niche strategy (combine multiple niches)
 */
export function getHybridNicheStrategy(primaryNiche: string): { niches: Niche[], strategy: string[], estimatedRevenue: number } {
  const allNiches = getAvailableNiches();
  const primary = allNiches.find(n => n.name === primaryNiche);

  if (!primary) {
    return {
      niches: allNiches.slice(0, 3),
      strategy: ["Focus on top 3 niches", "Create content for each", "Cross-promote"],
      estimatedRevenue: 10000
    };
  }

  // Find complementary niches
  const complementary = allNiches
    .filter(n => n.name !== primaryNiche)
    .sort((a, b) => (b.cpc * b.viralPotential) - (a.cpc * a.viralPotential))
    .slice(0, 2);

  const selectedNiches = [primary, ...complementary];
  const totalRevenue = selectedNiches.reduce((sum, n) => sum + n.estimatedMonthlyRevenue, 0);

  return {
    niches: selectedNiches,
    strategy: [
      `Primary focus: ${primary.name} (€${primary.estimatedMonthlyRevenue}/month)`,
      `Secondary: ${complementary[0]?.name || "N/A"} (€${complementary[0]?.estimatedMonthlyRevenue || 0}/month)`,
      `Tertiary: ${complementary[1]?.name || "N/A"} (€${complementary[1]?.estimatedMonthlyRevenue || 0}/month)`,
      "Create content for each niche",
      "Build separate email lists",
      "Use different affiliate programs",
      "Cross-promote between niches",
      "Monitor and optimize each channel"
    ],
    estimatedRevenue: totalRevenue
  };
}

/**
 * Generate niche pivot action plan
 */
export function generateNichePivotPlan(currentNiche: string, currentRevenue: number): {
  recommendation: NichePivotRecommendation;
  timeline: { week: number; milestone: string; expectedRevenue: number }[];
  risks: string[];
  successFactors: string[];
} {
  const recommendation = findBestNichePivot(currentNiche, currentRevenue);

  return {
    recommendation,
    timeline: [
      { week: 1, milestone: "Research and planning", expectedRevenue: currentRevenue },
      { week: 2, milestone: "Create 5 articles", expectedRevenue: currentRevenue * 1.1 },
      { week: 3, milestone: "Build email list (100 subscribers)", expectedRevenue: currentRevenue * 1.2 },
      { week: 4, milestone: "Setup affiliate links", expectedRevenue: currentRevenue * 1.4 },
      { week: 5, milestone: "Social media promotion", expectedRevenue: currentRevenue * 1.7 },
      { week: 6, milestone: "First conversions", expectedRevenue: currentRevenue * 2.0 },
      { week: 8, milestone: "Optimization phase", expectedRevenue: currentRevenue * 2.5 },
      { week: 12, milestone: "Full implementation", expectedRevenue: recommendation.estimatedNewRevenue }
    ],
    risks: [
      "Audience may not follow to new niche",
      "Ranking for new keywords takes time",
      "Affiliate programs may have approval delays",
      "Market conditions may change",
      "Competitors in new niche may be stronger"
    ],
    successFactors: [
      "Consistent content creation",
      "Quality over quantity",
      "Strong email list building",
      "Affiliate program optimization",
      "Regular performance monitoring",
      "Quick pivoting if needed"
    ]
  };
}

/**
 * Calculate niche switching ROI
 */
export function calculateNicheSwitchROI(
  currentNiche: string,
  targetNiche: string,
  implementationCost: number = 500
): {
  paybackPeriod: number;
  roi: number;
  recommendation: string;
} {
  const niches = getAvailableNiches();
  const current = niches.find(n => n.name === currentNiche);
  const target = niches.find(n => n.name === targetNiche);

  if (!current || !target) {
    return {
      paybackPeriod: 0,
      roi: 0,
      recommendation: "Invalid niche selection"
    };
  }

  const monthlyDifference = target.estimatedMonthlyRevenue - current.estimatedMonthlyRevenue;
  const paybackPeriod = monthlyDifference > 0 ? Math.ceil(implementationCost / monthlyDifference) : 999;
  const roi = ((monthlyDifference * 12 - implementationCost) / implementationCost) * 100;

  return {
    paybackPeriod,
    roi: Math.round(roi),
    recommendation: roi > 100 ? "Highly recommended" : roi > 0 ? "Recommended" : "Not recommended"
  };
}
