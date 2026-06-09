/**
 * Lead Magnet & Email Funnel Module
 * Generates high-converting lead magnets and automates email sequences
 */

export interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "checklist" | "guide" | "template" | "video";
  niche: string;
  downloadUrl: string;
  conversionRate: number; // Expected conversion rate
  estimatedLeads: number; // Per month
  estimatedRevenue: number; // Per month
}

export interface EmailSequence {
  id: string;
  name: string;
  emails: EmailTemplate[];
  conversionRate: number;
  averageOrderValue: number;
  estimatedMonthlyRevenue: number;
}

export interface EmailTemplate {
  id: string;
  subject: string;
  daysSinceSignup: number;
  content: string;
  cta: string;
  ctaLink: string;
}

export interface LeadMagnetCampaign {
  id: string;
  leadMagnet: LeadMagnet;
  emailSequence: EmailSequence;
  totalLeads: number;
  totalConversions: number;
  totalRevenue: number;
  roi: number;
}

// ============= LEAD MAGNET IDEAS =============

export const LEAD_MAGNET_IDEAS: LeadMagnet[] = [
  {
    id: "1",
    title: "10 AI Tools That Save 10 Hours Per Week",
    description: "Complete guide to the best AI tools for productivity and automation",
    type: "pdf",
    niche: "AI Tools & Automation",
    downloadUrl: "/lead-magnets/ai-tools-guide.pdf",
    conversionRate: 0.25,
    estimatedLeads: 150,
    estimatedRevenue: 450,
  },
  {
    id: "2",
    title: "Crypto Investment Beginner's Checklist",
    description: "Step-by-step checklist for starting your crypto investment journey",
    type: "checklist",
    niche: "Crypto & Web3",
    downloadUrl: "/lead-magnets/crypto-checklist.pdf",
    conversionRate: 0.22,
    estimatedLeads: 120,
    estimatedRevenue: 480,
  },
  {
    id: "3",
    title: "Complete ChatGPT Prompt Library",
    description: "100+ proven ChatGPT prompts for business, marketing, and content creation",
    type: "template",
    niche: "AI Tools & Automation",
    downloadUrl: "/lead-magnets/chatgpt-prompts.pdf",
    conversionRate: 0.28,
    estimatedLeads: 180,
    estimatedRevenue: 540,
  },
  {
    id: "4",
    title: "DeFi Yield Farming Strategy Guide",
    description: "How to maximize returns with DeFi yield farming - updated for 2026",
    type: "guide",
    niche: "Crypto & Web3",
    downloadUrl: "/lead-magnets/defi-guide.pdf",
    conversionRate: 0.20,
    estimatedLeads: 100,
    estimatedRevenue: 500,
  },
  {
    id: "5",
    title: "AI Automation Workflow Templates",
    description: "Ready-to-use templates for automating your business with AI",
    type: "template",
    niche: "AI Tools & Automation",
    downloadUrl: "/lead-magnets/automation-templates.pdf",
    conversionRate: 0.26,
    estimatedLeads: 160,
    estimatedRevenue: 480,
  },
];

// ============= EMAIL SEQUENCES =============

export function generateEmailSequence(leadMagnetTitle: string, niche: string): EmailSequence {
  const sequences: Record<string, EmailTemplate[]> = {
    "AI Tools & Automation": [
      {
        id: "1",
        subject: "🚀 Your AI Tools Guide is Ready!",
        daysSinceSignup: 0,
        content:
          "Hi there! Thanks for downloading the AI Tools guide. Inside, you'll find the 10 best AI tools that can save you 10 hours per week. Start with the first tool today and let me know how it goes!",
        cta: "Download Now",
        ctaLink: "/lead-magnets/ai-tools-guide.pdf",
      },
      {
        id: "2",
        subject: "💡 The #1 AI Tool I Use Every Day",
        daysSinceSignup: 1,
        content:
          "After using these AI tools for years, I've found one that stands out above the rest. It's saved me hundreds of hours. Check out this detailed review and see if it's right for you.",
        cta: "See the Review",
        ctaLink: "/ai-tools/best-tool",
      },
      {
        id: "3",
        subject: "⚡ How to Make Money with AI Tools",
        daysSinceSignup: 3,
        content:
          "Most people don't realize you can actually make money using AI tools. Here are 5 proven ways to turn your AI skills into income. Some people are making €5,000+ per month!",
        cta: "Learn the Strategies",
        ctaLink: "/ai-tools/monetization",
      },
      {
        id: "4",
        subject: "🎁 Exclusive: AI Tools Discount (24 hours only)",
        daysSinceSignup: 5,
        content:
          "I negotiated an exclusive discount for my subscribers. Get 40% off the premium AI tools bundle. This offer expires in 24 hours!",
        cta: "Claim Your Discount",
        ctaLink: "/ai-tools/discount",
      },
      {
        id: "5",
        subject: "📊 See How Others Are Using AI to Scale",
        daysSinceSignup: 7,
        content:
          "Real case studies from people using AI tools to grow their businesses. One person went from €0 to €10,000/month in 3 months. Here's how they did it.",
        cta: "Read the Case Studies",
        ctaLink: "/ai-tools/case-studies",
      },
    ],
    "Crypto & Web3": [
      {
        id: "1",
        subject: "🎉 Your Crypto Checklist is Ready!",
        daysSinceSignup: 0,
        content:
          "Welcome! Your complete crypto investment checklist is attached. Follow these steps and you'll be set up to start investing safely and securely.",
        cta: "Download Checklist",
        ctaLink: "/lead-magnets/crypto-checklist.pdf",
      },
      {
        id: "2",
        subject: "💰 The Best Crypto Exchange for Beginners",
        daysSinceSignup: 1,
        content:
          "Not all crypto exchanges are created equal. I've tested 10+ exchanges and found the best one for beginners. Low fees, great security, and easy to use.",
        cta: "See My Review",
        ctaLink: "/crypto/best-exchange",
      },
      {
        id: "3",
        subject: "🚀 How to Earn Passive Income with Crypto",
        daysSinceSignup: 3,
        content:
          "Did you know you can earn 5-20% APY just by holding crypto? Here's how staking works and which coins offer the best returns right now.",
        cta: "Learn Staking",
        ctaLink: "/crypto/staking-guide",
      },
      {
        id: "4",
        subject: "⚠️ Avoid These Common Crypto Mistakes",
        daysSinceSignup: 5,
        content:
          "Most beginners make these 5 critical mistakes that cost them thousands. I made them too! Here's how to avoid them.",
        cta: "See the Mistakes",
        ctaLink: "/crypto/mistakes-to-avoid",
      },
      {
        id: "5",
        subject: "🎁 Exclusive: €50 Bonus on Your First Trade",
        daysSinceSignup: 7,
        content:
          "My exclusive partner is offering €50 bonus for new users. This is only available for my subscribers. Claim it now!",
        cta: "Get Your Bonus",
        ctaLink: "/crypto/bonus-offer",
      },
    ],
  };

  const templates = sequences[niche] || sequences["AI Tools & Automation"];

  return {
    id: `seq-${Date.now()}`,
    name: `Email Sequence for ${leadMagnetTitle}`,
    emails: templates,
    conversionRate: 0.08,
    averageOrderValue: 47,
    estimatedMonthlyRevenue: 0, // Will be calculated based on leads
  };
}

// ============= LEAD CAPTURE FORM =============

export function generateLeadCaptureForm(leadMagnetTitle: string): {
  formFields: string[];
  successMessage: string;
  redirectUrl: string;
} {
  return {
    formFields: ["email", "firstName", "niche"],
    successMessage: `Thanks for signing up! Check your email for "${leadMagnetTitle}". You'll also receive exclusive tips and offers.`,
    redirectUrl: "/thank-you",
  };
}

// ============= MONETIZATION STRATEGIES =============

export function generateMonetizationStrategies(
  leadMagnetTitle: string,
  niche: string
): {
  strategy: string;
  estimatedRevenue: number;
  implementation: string;
}[] {
  return [
    {
      strategy: "Affiliate Links in Email Sequence",
      estimatedRevenue: 150,
      implementation:
        "Include 2-3 affiliate links in each email sequence. Focus on high-converting products related to the lead magnet.",
    },
    {
      strategy: "Digital Product Sales",
      estimatedRevenue: 300,
      implementation:
        "Create a premium course or bundle related to the lead magnet topic. Sell it in the 4th-5th email.",
    },
    {
      strategy: "SaaS Tool Recommendations",
      estimatedRevenue: 200,
      implementation:
        "Recommend relevant SaaS tools with affiliate commissions. Tools in the AI/Crypto space pay 20-30% commission.",
    },
    {
      strategy: "Sponsorships & Partnerships",
      estimatedRevenue: 250,
      implementation:
        "Once you have 1000+ subscribers, reach out to relevant companies for sponsorship deals.",
    },
    {
      strategy: "Email List Rental",
      estimatedRevenue: 100,
      implementation:
        "Rent your email list to relevant companies. Typically €0.50-€1.00 per subscriber per send.",
    },
  ];
}

// ============= LEAD MAGNET PERFORMANCE =============

export function calculateLeadMagnetROI(
  leadMagnet: LeadMagnet,
  emailSequence: EmailSequence,
  monthlyLeads: number
): {
  totalLeads: number;
  conversions: number;
  revenue: number;
  roi: number;
  paybackPeriod: number;
} {
  const totalLeads = monthlyLeads;
  const conversions = Math.floor(totalLeads * emailSequence.conversionRate);
  const revenue = conversions * emailSequence.averageOrderValue;
  const productionCost = 100; // Estimated cost to create lead magnet
  const roi = ((revenue - productionCost) / productionCost) * 100;
  const paybackPeriod = revenue > 0 ? productionCost / (revenue / 30) : 0;

  return {
    totalLeads,
    conversions,
    revenue,
    roi,
    paybackPeriod,
  };
}

// ============= LEAD MAGNET TEMPLATES =============

export function generateLeadMagnetContent(
  title: string,
  niche: string
): {
  title: string;
  sections: string[];
  estimatedPages: number;
} {
  const templates: Record<string, string[]> = {
    "AI Tools & Automation": [
      "Introduction: Why AI Tools Matter",
      "Tool #1: ChatGPT - Complete Guide",
      "Tool #2: Midjourney - Image Generation",
      "Tool #3: Claude - Advanced Writing",
      "Tool #4: Zapier - Workflow Automation",
      "Tool #5: Make - Advanced Automation",
      "How to Combine Tools for Maximum Efficiency",
      "Common Mistakes to Avoid",
      "Next Steps & Resources",
      "Bonus: Prompt Library",
    ],
    "Crypto & Web3": [
      "Introduction: Crypto Basics",
      "Step 1: Choose an Exchange",
      "Step 2: Verify Your Identity",
      "Step 3: Fund Your Account",
      "Step 4: Buy Your First Crypto",
      "Step 5: Secure Your Assets",
      "Step 6: Understand Wallets",
      "Common Mistakes to Avoid",
      "Tax Considerations",
      "Resources & Next Steps",
    ],
  };

  const sections = templates[niche] || templates["AI Tools & Automation"];

  return {
    title,
    sections,
    estimatedPages: sections.length + 2,
  };
}

// ============= CAMPAIGN DASHBOARD DATA =============

export function getLeadMagnetDashboardData(): {
  leadMagnets: LeadMagnet[];
  totalLeads: number;
  totalRevenue: number;
  averageConversionRate: number;
  topPerformer: LeadMagnet;
} {
  const totalLeads = LEAD_MAGNET_IDEAS.reduce((sum, lm) => sum + lm.estimatedLeads, 0);
  const totalRevenue = LEAD_MAGNET_IDEAS.reduce((sum, lm) => sum + lm.estimatedRevenue, 0);
  const averageConversionRate =
    LEAD_MAGNET_IDEAS.reduce((sum, lm) => sum + lm.conversionRate, 0) / LEAD_MAGNET_IDEAS.length;

  const topPerformer = LEAD_MAGNET_IDEAS.reduce((prev, current) =>
    current.estimatedRevenue > prev.estimatedRevenue ? current : prev
  );

  return {
    leadMagnets: LEAD_MAGNET_IDEAS,
    totalLeads,
    totalRevenue,
    averageConversionRate,
    topPerformer,
  };
}

// ============= LEAD SCORING =============

export function scoreLeads(
  leads: { email: string; engagement: number; clicks: number; purchases: number }[]
): { email: string; score: number; tier: "hot" | "warm" | "cold" }[] {
  return leads.map((lead) => {
    const engagementScore = lead.engagement * 10;
    const clickScore = lead.clicks * 5;
    const purchaseScore = lead.purchases * 50;
    const totalScore = engagementScore + clickScore + purchaseScore;

    let tier: "hot" | "warm" | "cold";
    if (totalScore >= 100) tier = "hot";
    else if (totalScore >= 50) tier = "warm";
    else tier = "cold";

    return {
      email: lead.email,
      score: totalScore,
      tier,
    };
  });
}
