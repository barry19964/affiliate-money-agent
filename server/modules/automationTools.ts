export interface AutomationTemplate {
  id: string;
  name: string;
  platform: "zapier" | "make" | "n8n" | "custom";
  price: number;
  complexity: "beginner" | "intermediate" | "advanced";
  useCases: string[];
  salesCount: number;
  revenue: number;
}

/**
 * Generiert Automation-Templates
 */
export function generateAutomationTemplates(): AutomationTemplate[] {
  return [
    {
      id: "template_1",
      name: "AI Content to Email Newsletter",
      platform: "zapier",
      price: 47,
      complexity: "beginner",
      useCases: ["Email marketing", "Content distribution", "Lead nurturing"],
      salesCount: 250,
      revenue: 11750,
    },
    {
      id: "template_2",
      name: "Affiliate Link Optimizer",
      platform: "make",
      price: 97,
      complexity: "intermediate",
      useCases: ["Affiliate marketing", "Link tracking", "Revenue optimization"],
      salesCount: 120,
      revenue: 11640,
    },
    {
      id: "template_3",
      name: "Multi-Channel Content Distributor",
      platform: "n8n",
      price: 197,
      complexity: "advanced",
      useCases: ["Social media", "Blog", "Email", "Podcasts"],
      salesCount: 45,
      revenue: 8865,
    },
  ];
}

/**
 * Berechnet Template-Marketplace-Potenzial
 */
export function calculateMarketplacePotential(
  templates: AutomationTemplate[]
): {
  totalRevenue: number;
  averagePrice: number;
  totalSales: number;
  topTemplate: string;
} {
  const totalRevenue = templates.reduce((sum, t) => sum + t.revenue, 0);
  const totalSales = templates.reduce((sum, t) => sum + t.salesCount, 0);
  const averagePrice = totalRevenue / totalSales;
  const topTemplate = templates.reduce((max, t) =>
    t.revenue > max.revenue ? t : max
  ).name;

  return {
    totalRevenue: Math.round(totalRevenue),
    averagePrice: Math.round(averagePrice),
    totalSales,
    topTemplate,
  };
}

/**
 * Generiert Custom Workflow-Ideen
 */
export function generateCustomWorkflows(): {
  name: string;
  description: string;
  price: number;
  timeToCreate: string;
}[] {
  return [
    {
      name: "Lead Scoring & Qualification",
      description: "Automatic lead qualification based on behavior",
      price: 297,
      timeToCreate: "2-3 days",
    },
    {
      name: "Customer Journey Automation",
      description: "Complete customer lifecycle automation",
      price: 497,
      timeToCreate: "3-5 days",
    },
    {
      name: "Revenue Operations Hub",
      description: "Integrated sales, marketing, and finance automation",
      price: 997,
      timeToCreate: "1-2 weeks",
    },
  ];
}

/**
 * Berechnet Workflow-Licensing-Modelle
 */
export function generateLicensingModels(): {
  model: string;
  upfrontCost: number;
  monthlyRecurring: number;
  totalFirstYear: number;
}[] {
  return [
    {
      model: "One-Time License",
      upfrontCost: 297,
      monthlyRecurring: 0,
      totalFirstYear: 297,
    },
    {
      model: "Monthly Subscription",
      upfrontCost: 0,
      monthlyRecurring: 47,
      totalFirstYear: 564,
    },
    {
      model: "Hybrid Model",
      upfrontCost: 97,
      monthlyRecurring: 27,
      totalFirstYear: 421,
    },
  ];
}
