export interface Lead {
  id: string;
  email: string;
  name?: string;
  company?: string;
  jobTitle?: string;
  source: string;
  quality: "hot" | "warm" | "cold";
  status: "new" | "contacted" | "interested" | "qualified" | "converted";
  value: number;
  createdAt: Date;
}

export interface B2BDeal {
  id: string;
  companyName: string;
  dealType: "enterprise" | "partnership" | "reseller" | "white_label";
  value: number;
  status: "prospect" | "negotiating" | "won" | "lost";
  closingDate?: Date;
  commission: number;
  expectedRevenue: number;
}

/**
 * Generiert Lead-Magnete für verschiedene Segmente
 */
export function generateLeadMagnets(): {
  title: string;
  description: string;
  targetAudience: string;
  expectedConversionRate: number;
  value: number;
}[] {
  return [
    {
      title: "AI Tools Comparison Guide",
      description: "Complete guide comparing 50+ AI tools with pricing and features",
      targetAudience: "Business Owners & Managers",
      expectedConversionRate: 8,
      value: 25,
    },
    {
      title: "Productivity Automation Checklist",
      description: "100-item checklist to automate your entire workflow",
      targetAudience: "Entrepreneurs & Freelancers",
      expectedConversionRate: 10,
      value: 15,
    },
    {
      title: "ChatGPT Prompts Library",
      description: "500+ proven ChatGPT prompts for business and marketing",
      targetAudience: "Marketers & Content Creators",
      expectedConversionRate: 12,
      value: 20,
    },
    {
      title: "Enterprise AI Implementation Guide",
      description: "Step-by-step guide for implementing AI in large organizations",
      targetAudience: "Enterprise Decision Makers",
      expectedConversionRate: 5,
      value: 100,
    },
  ];
}

/**
 * Berechnet Lead-Wert basierend auf Qualität
 */
export function calculateLeadValue(lead: Lead): number {
  let baseValue = 10;

  if (lead.quality === "hot") baseValue = 50;
  if (lead.quality === "warm") baseValue = 25;
  if (lead.quality === "cold") baseValue = 5;

  if (lead.jobTitle && lead.jobTitle.toLowerCase().includes("ceo")) baseValue *= 3;
  if (lead.jobTitle && lead.jobTitle.toLowerCase().includes("director")) baseValue *= 2;

  if (lead.company && lead.company.length > 0) baseValue *= 1.5;

  return Math.round(baseValue);
}

/**
 * Generiert Lead-Scoring-Modelle
 */
export function scoreLeads(leads: Lead[]): Lead[] {
  return leads
    .map((lead) => ({
      ...lead,
      value: calculateLeadValue(lead),
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Generiert B2B-Opportunity-Pipeline
 */
export function generateB2BOpportunities(): B2BDeal[] {
  return [
    {
      id: "b2b_1",
      companyName: "TechCorp Inc.",
      dealType: "enterprise",
      value: 50000,
      status: "prospect",
      commission: 20,
      expectedRevenue: 10000,
    },
    {
      id: "b2b_2",
      companyName: "StartupHub",
      dealType: "partnership",
      value: 25000,
      status: "prospect",
      commission: 15,
      expectedRevenue: 3750,
    },
    {
      id: "b2b_3",
      companyName: "Digital Agency Pro",
      dealType: "reseller",
      value: 15000,
      status: "prospect",
      commission: 25,
      expectedRevenue: 3750,
    },
    {
      id: "b2b_4",
      companyName: "Enterprise Solutions Ltd",
      dealType: "white_label",
      value: 100000,
      status: "prospect",
      commission: 30,
      expectedRevenue: 30000,
    },
  ];
}

/**
 * Generiert Lead-Nurture-Sequenzen
 */
export function generateNurtureSequence(leadQuality: string): {
  day: number;
  subject: string;
  message: string;
  cta: string;
}[] {
  if (leadQuality === "hot") {
    return [
      {
        day: 0,
        subject: "Exclusive Offer Inside",
        message: "We have a special offer just for you",
        cta: "Claim Your Offer",
      },
      {
        day: 2,
        subject: "Success Stories from Similar Companies",
        message: "See how companies like yours are saving time and money",
        cta: "View Case Studies",
      },
      {
        day: 5,
        subject: "Limited Time - 50% Off",
        message: "This offer expires in 48 hours",
        cta: "Get 50% Off Now",
      },
    ];
  }

  return [
    {
      day: 0,
      subject: "Welcome to Our Community",
      message: "Get started with our free resources",
      cta: "Download Free Guide",
    },
    {
      day: 3,
      subject: "How Others Are Succeeding",
      message: "Learn from industry leaders",
      cta: "Read Case Studies",
    },
    {
      day: 7,
      subject: "Special Offer for Subscribers",
      message: "Exclusive discount for our community",
      cta: "Claim Your Discount",
    },
    {
      day: 14,
      subject: "Last Chance - Limited Offer",
      message: "This offer ends soon",
      cta: "Upgrade Now",
    },
  ];
}

/**
 * Berechnet Lead-Generation-ROI
 */
export function calculateLeadGenROI(
  campaignCost: number,
  leadsGenerated: number,
  conversionRate: number,
  averageDealValue: number
): {
  costPerLead: number;
  costPerConversion: number;
  totalRevenue: number;
  roi: number;
} {
  const costPerLead = campaignCost / leadsGenerated;
  const conversions = leadsGenerated * (conversionRate / 100);
  const costPerConversion = conversions > 0 ? campaignCost / conversions : 0;
  const totalRevenue = conversions * averageDealValue;
  const roi = ((totalRevenue - campaignCost) / campaignCost) * 100;

  return {
    costPerLead: Math.round(costPerLead * 100) / 100,
    costPerConversion: Math.round(costPerConversion * 100) / 100,
    totalRevenue: Math.round(totalRevenue),
    roi: Math.round(roi),
  };
}
