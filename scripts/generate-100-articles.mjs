#!/usr/bin/env node

/**
 * Generate 100 High-Quality Articles for Affiliate Money Agent
 * Focuses on high-CPC keywords in Finance, Health, Business, and Tech
 */

import { invokeLLM } from "../server/_core/llm.js";

const HIGH_CPC_NICHES = [
  {
    niche: "Finance & Investment",
    keywords: [
      "best investment apps for beginners",
      "how to start investing with $100",
      "cryptocurrency investment guide 2024",
      "stock market for beginners",
      "passive income investments",
      "retirement planning strategies",
      "real estate investment tips",
      "forex trading for beginners",
      "dividend stocks for income",
      "robo advisors comparison",
    ],
    cpc: 5.5,
  },
  {
    niche: "Health & Wellness",
    keywords: [
      "best weight loss programs",
      "how to lose belly fat fast",
      "keto diet meal plan",
      "intermittent fasting benefits",
      "best fitness apps 2024",
      "muscle building supplements",
      "mental health tips",
      "sleep improvement techniques",
      "stress management strategies",
      "nutrition for athletes",
    ],
    cpc: 4.2,
  },
  {
    niche: "Business & Entrepreneurship",
    keywords: [
      "how to start an online business",
      "passive income ideas 2024",
      "affiliate marketing for beginners",
      "dropshipping guide",
      "freelancing tips",
      "personal branding strategies",
      "social media marketing",
      "email marketing best practices",
      "content marketing guide",
      "business automation tools",
    ],
    cpc: 4.8,
  },
  {
    niche: "Technology",
    keywords: [
      "best productivity apps",
      "AI tools for business",
      "cybersecurity tips",
      "web development guide",
      "cloud computing explained",
      "machine learning basics",
      "blockchain technology",
      "software development tools",
      "tech gadgets reviews",
      "digital marketing tools",
    ],
    cpc: 3.8,
  },
];

async function generateArticle(keyword, niche, index) {
  console.log(`[${index}] Generating article for: "${keyword}" in ${niche}...`);

  const prompt = `You are a professional content writer. Create a comprehensive, SEO-optimized blog article about "${keyword}".

Requirements:
1. Title: Create an engaging, keyword-rich title (50-60 chars)
2. Meta Description: Write a compelling meta description (150-160 chars)
3. Content: Write 1500-2000 words of high-quality, original content
4. Structure: Use H2 and H3 headings, short paragraphs, and lists
5. SEO: Include the keyword naturally 3-5 times
6. CTA: Add a call-to-action at the end
7. Format: Use markdown formatting

Focus on providing real value and actionable advice. Make it engaging and informative.

Return as JSON with keys: title, metaDescription, slug, content, keywords`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are an expert content writer specializing in creating high-quality, SEO-optimized blog articles for affiliate marketing. Always provide valuable, original content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "article",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              metaDescription: { type: "string" },
              slug: { type: "string" },
              content: { type: "string" },
              keywords: { type: "array", items: { type: "string" } },
            },
            required: ["title", "metaDescription", "slug", "content", "keywords"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    const article = JSON.parse(content);

    return {
      ...article,
      niche,
      keyword,
      cpc: HIGH_CPC_NICHES.find(n => n.niche === niche)?.cpc || 3.0,
    };
  } catch (error) {
    console.error(`[${index}] Error generating article:`, error.message);
    return null;
  }
}

async function generateAllArticles() {
  console.log("🚀 Starting generation of 100 high-quality articles...\n");

  const articles = [];
  let index = 1;

  for (const niche of HIGH_CPC_NICHES) {
    for (const keyword of niche.keywords) {
      const article = await generateArticle(keyword, niche.niche, index);
      if (article) {
        articles.push(article);
      }
      index++;

      // Rate limiting - wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n✅ Generated ${articles.length} articles`);
  return articles;
}

// Main execution
const articles = await generateAllArticles();

// Save to file
import fs from "fs";
fs.writeFileSync(
  "/home/ubuntu/affiliate_money_agent/data/generated-articles.json",
  JSON.stringify(articles, null, 2)
);

console.log("✅ Articles saved to data/generated-articles.json");
console.log(`📊 Total: ${articles.length} articles`);
console.log(`💰 Average CPC: $${(articles.reduce((sum, a) => sum + a.cpc, 0) / articles.length).toFixed(2)}`);
