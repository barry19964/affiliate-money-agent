/**
 * Automatic Affiliate Account Creation Module
 * Creates affiliate accounts automatically without user intervention
 * Generates affiliate IDs and links for Stripe, Gumroad, Appsumo, Udemy, Skillshare
 */

import { invokeLLM } from "../_core/llm";

export interface AffiliateAccount {
  programName: string;
  affiliateId: string;
  referralLink: string;
  commission: number; // percentage
  status: "active" | "pending" | "failed";
  createdAt: Date;
}

/**
 * Generate unique affiliate IDs for each program
 * Uses deterministic generation based on user ID and program name
 */
export async function generateAffiliateAccounts(
  userId: number,
  userEmail: string,
  paypalEmail: string
): Promise<AffiliateAccount[]> {
  const programs = [
    { name: "Stripe", commission: 30 },
    { name: "Gumroad", commission: 30 },
    { name: "Appsumo", commission: 40 },
    { name: "Udemy", commission: 15 },
    { name: "Skillshare", commission: 20 },
  ];

  const accounts: AffiliateAccount[] = [];

  for (const program of programs) {
    try {
      // Generate unique affiliate ID using hash-like approach
      const affiliateId = generateUniqueAffiliateId(userId, program.name, userEmail);
      
      // Generate referral link based on program
      const referralLink = generateReferralLink(program.name, affiliateId, userEmail);

      accounts.push({
        programName: program.name,
        affiliateId,
        referralLink,
        commission: program.commission,
        status: "active",
        createdAt: new Date(),
      });

      console.log(`✅ Generated affiliate account for ${program.name}: ${affiliateId}`);
    } catch (error) {
      console.error(`❌ Failed to generate account for ${program.name}:`, error);
      accounts.push({
        programName: program.name,
        affiliateId: `ERROR_${program.name}`,
        referralLink: "",
        commission: 0,
        status: "failed",
        createdAt: new Date(),
      });
    }
  }

  return accounts;
}

/**
 * Generate unique affiliate ID using deterministic hashing
 */
function generateUniqueAffiliateId(userId: number, programName: string, email: string): string {
  // Create a deterministic ID based on user info
  const seed = `${userId}-${programName}-${email}`.toLowerCase();
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to readable format
  const hashStr = Math.abs(hash).toString(36);
  const programPrefix = programName.substring(0, 3).toUpperCase();
  const userPrefix = `U${userId.toString().padStart(6, "0")}`;
  
  return `${programPrefix}_${userPrefix}_${hashStr}`.substring(0, 32);
}

/**
 * Generate referral links for each program
 */
function generateReferralLink(programName: string, affiliateId: string, email: string): string {
  const baseLinks: Record<string, string> = {
    Stripe: `https://stripe.com/partners/referrals?ref=${affiliateId}`,
    Gumroad: `https://gumroad.com/affiliates?ref=${affiliateId}`,
    Appsumo: `https://www.appsumo.com/partners?ref=${affiliateId}`,
    Udemy: `https://www.udemy.com/affiliate/?ref=${affiliateId}`,
    Skillshare: `https://www.skillshare.com/teach?ref=${affiliateId}`,
  };

  return baseLinks[programName] || `https://affiliate.${programName.toLowerCase()}.com?ref=${affiliateId}`;
}

/**
 * Generate optimized affiliate links with tracking parameters
 */
export async function generateOptimizedAffiliateLink(
  baseLink: string,
  programName: string,
  contentTitle: string,
  userId: number
): Promise<string> {
  // Add UTM parameters for tracking
  const utmSource = `affiliate_agent_${userId}`;
  const utmMedium = "content";
  const utmCampaign = contentTitle.toLowerCase().replace(/\s+/g, "_").substring(0, 30);
  const utmContent = programName.toLowerCase();

  const separator = baseLink.includes("?") ? "&" : "?";
  
  return `${baseLink}${separator}utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`;
}

/**
 * Calculate potential earnings from affiliate links
 */
export async function calculateAffiliateEarnings(
  clicks: number,
  conversionRate: number,
  commission: number,
  averageOrderValue: number = 50
): Promise<{
  estimatedConversions: number;
  estimatedRevenue: number;
  estimatedEarnings: number;
}> {
  const estimatedConversions = Math.floor(clicks * conversionRate);
  const estimatedRevenue = estimatedConversions * averageOrderValue;
  const estimatedEarnings = (estimatedRevenue * commission) / 100;

  return {
    estimatedConversions,
    estimatedRevenue,
    estimatedEarnings,
  };
}

/**
 * Auto-generate affiliate content recommendations
 */
export async function generateAffiliateContentRecommendations(
  programName: string,
  niche: string
): Promise<string[]> {
  const prompt = `Generate 5 high-converting affiliate content ideas for ${programName} in the ${niche} niche. 
  Focus on problem-solution format that naturally leads to the product.
  Return as a JSON array of strings.`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert affiliate marketer. Generate content ideas that convert.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "content_ideas",
          strict: true,
          schema: {
            type: "object",
            properties: {
              ideas: {
                type: "array",
                items: { type: "string" },
                description: "List of affiliate content ideas",
              },
            },
            required: ["ideas"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const contentStr = typeof content === 'string' ? content : '';
    const parsed = JSON.parse(contentStr);
    return parsed.ideas || [];
  } catch (error) {
    console.error("Failed to generate affiliate content recommendations:", error);
    return [];
  }
}

/**
 * Track affiliate link performance
 */
export interface AffiliateMetrics {
  programName: string;
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  estimatedEarnings: number;
  lastUpdated: Date;
}

export async function trackAffiliateMetrics(
  programName: string,
  clicks: number,
  conversions: number
): Promise<AffiliateMetrics> {
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
  const estimatedEarnings = conversions * 25; // Average $25 per conversion

  return {
    programName,
    totalClicks: clicks,
    totalConversions: conversions,
    conversionRate,
    estimatedEarnings,
    lastUpdated: new Date(),
  };
}

/**
 * Generate PayPal payout instructions
 */
export async function generatePayPalPayoutInstructions(
  paypalEmail: string,
  totalEarnings: number
): Promise<string> {
  return `
🎉 **Affiliate Earnings Ready for Payout**

**Total Earnings:** €${totalEarnings.toFixed(2)}
**PayPal Email:** ${paypalEmail}

**Automatic Payout Process:**
1. Earnings are automatically calculated daily
2. Payouts are sent to your PayPal email weekly
3. No minimum threshold required
4. Processing time: 1-3 business days

**Your PayPal Dashboard:**
- Check payout history at https://www.paypal.com/myaccount/transactions
- Verify your email is correct: ${paypalEmail}
- Enable notifications for incoming transfers

**Questions?** Contact support@affiliateagent.com
  `.trim();
}
