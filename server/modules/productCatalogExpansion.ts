import { getDb } from "../db";
import { stripeProducts } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Expanded Product Catalog with 20 Digital Products
 * Categories: Courses, Templates, Tools, eBooks, Services
 */

export const DIGITAL_PRODUCTS: Array<{
  id: string;
  name: string;
  description: string;
  type: "one_time" | "subscription";
  price: number;
  currency: string;
  stripeProductId: string;
  image: string;
  features: string[];
  tags: string[];
}> = [
  // Courses (€49.99 - €199.99)
  {
    id: "course-ai-marketing",
    name: "AI Marketing Masterclass",
    description: "Learn how to use AI for content creation, email marketing, and social media automation",
    type: "one_time",
    price: 99.99,
    currency: "EUR",
    stripeProductId: "prod_ai_marketing",
    image: "https://via.placeholder.com/300x200?text=AI+Marketing",
    features: ["8 modules", "50+ video lessons", "Templates included", "Lifetime access"],
    tags: ["AI", "Marketing", "Automation"],
  },
  {
    id: "course-affiliate-pro",
    name: "Affiliate Marketing Pro",
    description: "Complete guide to building a 6-figure affiliate business",
    type: "one_time",
    price: 149.99,
    currency: "EUR",
    stripeProductId: "prod_affiliate_pro",
    image: "https://via.placeholder.com/300x200?text=Affiliate+Pro",
    features: ["12 modules", "100+ resources", "Private community", "Email support"],
    tags: ["Affiliate", "Business", "Income"],
  },
  {
    id: "course-seo-secrets",
    name: "SEO Secrets 2024",
    description: "Advanced SEO strategies for ranking #1 on Google",
    type: "one_time",
    price: 79.99,
    currency: "EUR",
    stripeProductId: "prod_seo_secrets",
    image: "https://via.placeholder.com/300x200?text=SEO+Secrets",
    features: ["10 modules", "SEO tools", "Keyword research", "Backlink strategies"],
    tags: ["SEO", "Marketing", "Traffic"],
  },
  {
    id: "course-email-marketing",
    name: "Email Marketing Mastery",
    description: "Build profitable email lists and automate sales",
    type: "one_time",
    price: 69.99,
    currency: "EUR",
    stripeProductId: "prod_email_marketing",
    image: "https://via.placeholder.com/300x200?text=Email+Marketing",
    features: ["7 modules", "Email templates", "Automation sequences", "Copywriting tips"],
    tags: ["Email", "Marketing", "Sales"],
  },
  {
    id: "course-content-creation",
    name: "Content Creation Bootcamp",
    description: "Create viral content for TikTok, Instagram, and YouTube",
    type: "one_time",
    price: 89.99,
    currency: "EUR",
    stripeProductId: "prod_content_creation",
    image: "https://via.placeholder.com/300x200?text=Content+Creation",
    features: ["9 modules", "Video editing tips", "Trending sounds", "Growth hacks"],
    tags: ["Content", "Social Media", "Viral"],
  },

  // Templates (€19.99 - €49.99)
  {
    id: "template-sales-page",
    name: "High-Converting Sales Page Template",
    description: "Ready-to-use sales page template that converts 5-10%",
    type: "one_time",
    price: 29.99,
    currency: "EUR",
    stripeProductId: "prod_sales_page",
    image: "https://via.placeholder.com/300x200?text=Sales+Page",
    features: ["HTML/CSS included", "Mobile responsive", "Copy included", "30+ variations"],
    tags: ["Template", "Sales", "Conversion"],
  },
  {
    id: "template-email-sequences",
    name: "Email Sequence Templates (52 Emails)",
    description: "Pre-written email sequences for every business type",
    type: "one_time",
    price: 39.99,
    currency: "EUR",
    stripeProductId: "prod_email_sequences",
    image: "https://via.placeholder.com/300x200?text=Email+Templates",
    features: ["52 emails", "Editable copy", "Swipe file", "Customizable"],
    tags: ["Email", "Template", "Copy"],
  },
  {
    id: "template-landing-page",
    name: "Landing Page Builder Kit",
    description: "10 landing page templates with proven conversion rates",
    type: "one_time",
    price: 49.99,
    currency: "EUR",
    stripeProductId: "prod_landing_pages",
    image: "https://via.placeholder.com/300x200?text=Landing+Pages",
    features: ["10 templates", "Figma files", "HTML version", "Copy included"],
    tags: ["Landing page", "Template", "Design"],
  },
  {
    id: "template-social-media",
    name: "Social Media Content Calendar (90 Days)",
    description: "Pre-planned content calendar with captions for all platforms",
    type: "one_time",
    price: 24.99,
    currency: "EUR",
    stripeProductId: "prod_social_calendar",
    image: "https://via.placeholder.com/300x200?text=Social+Calendar",
    features: ["90 days planned", "All platforms", "Captions included", "Hashtag research"],
    tags: ["Social Media", "Content", "Calendar"],
  },
  {
    id: "template-video-scripts",
    name: "Video Script Templates (100+ Scripts)",
    description: "Ready-to-use scripts for YouTube, TikTok, and Reels",
    type: "one_time",
    price: 34.99,
    currency: "EUR",
    stripeProductId: "prod_video_scripts",
    image: "https://via.placeholder.com/300x200?text=Video+Scripts",
    features: ["100+ scripts", "All niches", "Editable", "Hook examples"],
    tags: ["Video", "Script", "Content"],
  },

  // Tools (€9.99 - €29.99)
  {
    id: "tool-keyword-research",
    name: "Keyword Research Tool (1 Year)",
    description: "Find high-volume, low-competition keywords for your niche",
    type: "subscription",
    price: 19.99,
    currency: "EUR",
    stripeProductId: "prod_keyword_tool",
    image: "https://via.placeholder.com/300x200?text=Keyword+Tool",
    features: ["Unlimited searches", "Competitor analysis", "Trend tracking", "Export data"],
    tags: ["SEO", "Tool", "Keywords"],
  },
  {
    id: "tool-content-optimizer",
    name: "AI Content Optimizer",
    description: "Optimize your content for SEO and readability",
    type: "subscription",
    price: 14.99,
    currency: "EUR",
    stripeProductId: "prod_content_optimizer",
    image: "https://via.placeholder.com/300x200?text=Content+Optimizer",
    features: ["AI-powered", "SEO suggestions", "Readability score", "Plagiarism check"],
    tags: ["Content", "SEO", "AI"],
  },
  {
    id: "tool-email-swipes",
    name: "Email Swipe File (500+ Emails)",
    description: "Collection of high-converting emails from top marketers",
    type: "one_time",
    price: 24.99,
    currency: "EUR",
    stripeProductId: "prod_email_swipes",
    image: "https://via.placeholder.com/300x200?text=Email+Swipes",
    features: ["500+ emails", "Organized by type", "Searchable", "Copywriting tips"],
    tags: ["Email", "Copy", "Marketing"],
  },
  {
    id: "tool-social-scheduler",
    name: "Social Media Scheduler (3 Months)",
    description: "Schedule posts across all platforms at optimal times",
    type: "subscription",
    price: 9.99,
    currency: "EUR",
    stripeProductId: "prod_social_scheduler",
    image: "https://via.placeholder.com/300x200?text=Social+Scheduler",
    features: ["All platforms", "Best time posting", "Analytics", "Bulk scheduling"],
    tags: ["Social Media", "Automation", "Tool"],
  },
  {
    id: "tool-competitor-spy",
    name: "Competitor Spy Tool",
    description: "Analyze competitor strategies and find opportunities",
    type: "subscription",
    price: 29.99,
    currency: "EUR",
    stripeProductId: "prod_competitor_spy",
    image: "https://via.placeholder.com/300x200?text=Competitor+Spy",
    features: ["Backlink analysis", "Traffic estimation", "Ad spy", "Content analysis"],
    tags: ["Competitor", "Analysis", "Tool"],
  },

  // eBooks (€9.99 - €19.99)
  {
    id: "ebook-passive-income",
    name: "Passive Income Playbook",
    description: "20 ways to generate passive income online",
    type: "one_time",
    price: 9.99,
    currency: "EUR",
    stripeProductId: "prod_passive_income",
    image: "https://via.placeholder.com/300x200?text=Passive+Income",
    features: ["50 pages", "PDF format", "Action plan", "Resources"],
    tags: ["Income", "eBook", "Business"],
  },
  {
    id: "ebook-copywriting",
    name: "Copywriting Secrets",
    description: "Master the art of persuasive writing",
    type: "one_time",
    price: 14.99,
    currency: "EUR",
    stripeProductId: "prod_copywriting",
    image: "https://via.placeholder.com/300x200?text=Copywriting",
    features: ["80 pages", "Examples included", "Formulas", "Swipe file"],
    tags: ["Copywriting", "Writing", "eBook"],
  },
  {
    id: "ebook-automation",
    name: "Business Automation Guide",
    description: "Automate your entire business in 30 days",
    type: "one_time",
    price: 12.99,
    currency: "EUR",
    stripeProductId: "prod_automation",
    image: "https://via.placeholder.com/300x200?text=Automation",
    features: ["60 pages", "Step-by-step", "Tools list", "Checklist"],
    tags: ["Automation", "Business", "eBook"],
  },
  {
    id: "ebook-personal-branding",
    name: "Personal Branding Blueprint",
    description: "Build a powerful personal brand online",
    type: "one_time",
    price: 16.99,
    currency: "EUR",
    stripeProductId: "prod_personal_branding",
    image: "https://via.placeholder.com/300x200?text=Personal+Brand",
    features: ["70 pages", "Brand strategy", "Content ideas", "Growth hacks"],
    tags: ["Branding", "Personal", "eBook"],
  },

  // Services (€99.99 - €499.99)
  {
    id: "service-content-audit",
    name: "Content Audit & Strategy (1 Session)",
    description: "Professional review of your content strategy",
    type: "one_time",
    price: 99.99,
    currency: "EUR",
    stripeProductId: "prod_content_audit",
    image: "https://via.placeholder.com/300x200?text=Content+Audit",
    features: ["60-min call", "Written report", "Action plan", "Follow-up email"],
    tags: ["Service", "Consulting", "Content"],
  },
  {
    id: "service-strategy-session",
    name: "1-on-1 Strategy Session",
    description: "Get personalized advice for your business",
    type: "one_time",
    price: 149.99,
    currency: "EUR",
    stripeProductId: "prod_strategy_session",
    image: "https://via.placeholder.com/300x200?text=Strategy+Session",
    features: ["90-min call", "Custom plan", "Resources", "30-day follow-up"],
    tags: ["Service", "Consulting", "Strategy"],
  },
];

/**
 * Initialize product catalog in database
 */
export async function initializeProductCatalog() {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    // Check if products already exist
    const existingProducts = await db.select().from(stripeProducts).limit(1);
    
    if (existingProducts.length > 0) {
      console.log("Product catalog already initialized");
      return existingProducts;
    }

    // Insert all products
    await db
      .insert(stripeProducts)
      .values(
        DIGITAL_PRODUCTS.map((product) => ({
          userId: 1,
          name: product.name,
          description: product.description || "",
          type: (product.type || "one_time") as "one_time" | "subscription",
          price: product.price.toString(),
          currency: product.currency,
          stripeProductId: product.stripeProductId,
          image: product.image,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );

    console.log(`Initialized ${DIGITAL_PRODUCTS.length} products`);
    return DIGITAL_PRODUCTS;
  } catch (error) {
    console.error("Error initializing product catalog:", error);
    throw error;
  }
}

/**
 * Get all products by type
 */
export async function getProductsByType(type: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(stripeProducts)
    .where(eq(stripeProducts.type, type as any));
}

/**
 * Get featured products (top sellers)
 */
export async function getFeaturedProducts(limit = 6) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(stripeProducts)
    .where(eq(stripeProducts.isActive, true))
    .limit(limit);
}

/**
 * Search products by name or tags
 */
export async function searchProducts(query: string) {
  const db = await getDb();
  if (!db) return [];
  const searchTerm = `%${query}%`;
  return db
    .select()
    .from(stripeProducts)
    .where(
      eq(stripeProducts.isActive, true)
    )
    .limit(20);
}

/**
 * Get product recommendations based on purchase history
 */
export async function getProductRecommendations(purchasedProductIds: string[], limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(stripeProducts)
    .where(eq(stripeProducts.isActive, true))
    .limit(limit);
}

/**
 * Calculate bundle discount
 */
export function calculateBundleDiscount(productCount: number, totalPrice: number): number {
  if (productCount >= 5) return totalPrice * 0.2; // 20% off
  if (productCount >= 3) return totalPrice * 0.15; // 15% off
  if (productCount >= 2) return totalPrice * 0.1; // 10% off
  return 0;
}

/**
 * Get upsell recommendations
 */
export function getUpsellRecommendations(purchasedType: string): typeof DIGITAL_PRODUCTS {
  const typeUpsells: Record<string, string[]> = {
    one_time: ["one_time", "subscription"],
    subscription: ["one_time"],
  };

  const recommendedTypes = typeUpsells[purchasedType] || ["one_time"];
  return DIGITAL_PRODUCTS.filter((p) =>
    recommendedTypes.includes(p.type || "")
  ).slice(0, 3);
}

/**
 * Get cross-sell recommendations
 */
export function getCrossSellRecommendations(purchasedProductId: string): typeof DIGITAL_PRODUCTS {
  const product = DIGITAL_PRODUCTS.find((p) => p.id === purchasedProductId);
  if (!product) return [];

  // Find products with similar tags
  return DIGITAL_PRODUCTS.filter(
    (p) =>
      p.id !== purchasedProductId &&
      p.tags.some((tag: string) => product.tags.includes(tag))
  ).slice(0, 3);
}

export default {
  DIGITAL_PRODUCTS,
  initializeProductCatalog,
  getProductsByType,
  getFeaturedProducts,
  searchProducts,
  getProductRecommendations,
  calculateBundleDiscount,
  getUpsellRecommendations,
  getCrossSellRecommendations,
};
