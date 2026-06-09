/**
 * Generate 100 High-Quality Articles for Affiliate Money Agent
 * Run with: pnpm tsx scripts/generate-100-articles.ts
 */

import { invokeLLM } from "../server/_core/llm";
import * as db from "../server/db";

const HIGH_CPC_KEYWORDS = [
  // Finance (25 articles)
  "best investment apps for beginners",
  "how to start investing with $100",
  "cryptocurrency investment guide 2024",
  "stock market for beginners tutorial",
  "passive income investments explained",
  "retirement planning strategies 2024",
  "real estate investment tips for beginners",
  "forex trading for beginners guide",
  "dividend stocks for passive income",
  "robo advisors comparison review",
  "best savings accounts high yield",
  "how to build wealth fast",
  "financial independence early retirement",
  "investment portfolio allocation",
  "bond investing for beginners",
  "peer to peer lending platforms",
  "real estate crowdfunding guide",
  "options trading for beginners",
  "day trading strategies",
  "index funds vs mutual funds",
  "tax efficient investing",
  "emergency fund calculator",
  "debt consolidation strategies",
  "credit score improvement tips",
  "personal finance management",

  // Health & Wellness (25 articles)
  "best weight loss programs 2024",
  "how to lose belly fat naturally",
  "keto diet meal plan complete guide",
  "intermittent fasting benefits science",
  "best fitness apps for home workouts",
  "muscle building supplements guide",
  "mental health tips for stress relief",
  "sleep improvement techniques",
  "stress management strategies effective",
  "nutrition for athletes guide",
  "best protein powders comparison",
  "workout routines for beginners",
  "yoga benefits for health",
  "meditation techniques for anxiety",
  "healthy eating habits guide",
  "best multivitamins for health",
  "exercise motivation tips",
  "body transformation guide",
  "healthy recipes for weight loss",
  "fitness tracking apps review",
  "stretching exercises benefits",
  "cardio workouts at home",
  "strength training for women",
  "nutrition meal planning",
  "hydration importance health",

  // Business & Entrepreneurship (25 articles)
  "how to start an online business",
  "passive income ideas 2024 complete list",
  "affiliate marketing for beginners guide",
  "dropshipping business model explained",
  "freelancing tips for success",
  "personal branding strategies",
  "social media marketing guide",
  "email marketing best practices",
  "content marketing strategy guide",
  "business automation tools review",
  "how to write a business plan",
  "startup funding sources",
  "business marketing strategies",
  "customer retention strategies",
  "sales techniques for beginners",
  "networking tips for entrepreneurs",
  "time management for business",
  "productivity hacks for entrepreneurs",
  "business analytics tools",
  "market research guide",
  "competitive analysis framework",
  "pricing strategy guide",
  "customer service excellence",
  "brand development guide",
  "business growth strategies",

  // Technology (25 articles)
  "best productivity apps 2024",
  "AI tools for business automation",
  "cybersecurity tips for protection",
  "web development guide for beginners",
  "cloud computing explained",
  "machine learning basics guide",
  "blockchain technology explained",
  "software development tools review",
  "tech gadgets reviews 2024",
  "digital marketing tools comparison",
  "SEO tools for website optimization",
  "email marketing software review",
  "project management tools guide",
  "CRM software comparison",
  "accounting software for small business",
  "website builders comparison",
  "hosting services review",
  "domain name registration guide",
  "SSL certificate importance",
  "API integration guide",
  "database management systems",
  "programming languages guide",
  "mobile app development guide",
  "WordPress plugins review",
  "automation software tools",
];

async function generateArticle(keyword: string, index: number) {
  console.log(`[${index}/100] Generating: "${keyword}"`);

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert SEO content writer. Create a comprehensive, high-quality blog article that ranks on Google.
          
Requirements:
- Write 1500-2000 words of original, valuable content
- Use the keyword naturally 3-5 times
- Include H2 and H3 subheadings
- Add practical tips and actionable advice
- Include a strong call-to-action
- Format with proper markdown

Return ONLY valid JSON with these exact fields:
{
  "title": "...",
  "metaDescription": "...",
  "slug": "...",
  "content": "...",
  "keywords": ["keyword1", "keyword2", ...]
}`,
        },
        {
          role: "user",
          content: `Write a comprehensive guide about: "${keyword}"`,
        },
      ],
    });

    const content = response.choices[0].message.content;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error(`[${index}] Failed to parse JSON response`);
      return null;
    }

    const article = JSON.parse(jsonMatch[0]);

    return {
      title: article.title || keyword,
      body: article.content || "",
      excerpt: article.metaDescription || keyword.substring(0, 160),
      slug: article.slug || keyword.toLowerCase().replace(/\s+/g, "-"),
      keywords: (article.keywords || [keyword]).join(","),
      status: "published",
    };
  } catch (error) {
    console.error(`[${index}] Error:`, error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

async function main() {
  console.log("🚀 Starting generation of 100 high-quality articles...\n");

  const articles = [];

  for (let i = 0; i < HIGH_CPC_KEYWORDS.length; i++) {
    const keyword = HIGH_CPC_KEYWORDS[i];
    const article = await generateArticle(keyword, i + 1);

    if (article) {
      articles.push(article);
    }

    // Rate limiting - wait 3 seconds between requests
    if (i < HIGH_CPC_KEYWORDS.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log(`\n✅ Generated ${articles.length} articles`);

  // Save to JSON file
  const fs = await import("fs");
  fs.writeFileSync(
    "/home/ubuntu/affiliate_money_agent/data/generated-articles.json",
    JSON.stringify(articles, null, 2)
  );

  console.log("📁 Saved to: data/generated-articles.json");
  console.log(`📊 Total articles: ${articles.length}`);
  console.log("✅ Ready to import into database!");
}

main().catch(console.error);
