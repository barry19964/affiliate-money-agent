import { invokeLLM } from "../_core/llm";

/**
 * SEO Traffic Strategy Module
 * Generates and manages SEO-optimized content for organic Google traffic
 */

export async function generateSEOContentPlan(niche: string, targetKeywords: string[]) {
  const prompt = `Generate a comprehensive SEO content plan for the niche: "${niche}"
  
Target keywords: ${targetKeywords.join(", ")}

Create a 30-day content calendar with:
1. 20 high-volume, low-competition keywords
2. Content ideas for each keyword (blog post, guide, comparison)
3. Internal linking strategy
4. Backlink opportunities
5. Content clusters and pillar pages

Format as JSON with structure: { keywords: [], contentIdeas: [], linkingStrategy: {}, backlinks: [] }`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are an SEO expert. Generate a detailed SEO content plan in JSON format.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

export async function generateSEOArticle(
  keyword: string,
  niche: string,
  wordCount: number = 2000
) {
  const prompt = `Write a comprehensive, SEO-optimized blog article for the keyword: "${keyword}"
  
Niche: ${niche}
Target word count: ${wordCount}

Requirements:
1. Include the keyword in title, H1, and first 100 words
2. Use related keywords naturally (LSI keywords)
3. Include 3-5 internal linking opportunities
4. Add FAQ section
5. Include call-to-action for lead magnet
6. Structure with H2, H3 headings
7. Include meta description (160 characters)

Format output as JSON: { title, metaDescription, content, internalLinks: [], keywords: [] }`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are an expert SEO content writer. Write high-quality, ranking-optimized articles.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

export async function generateBacklinkStrategy(niche: string, domain: string) {
  const prompt = `Generate a backlink strategy for domain: ${domain} in niche: ${niche}

Create a list of:
1. 20 high-authority websites for guest posting
2. 15 industry directories and listings
3. 10 resource pages for broken link building
4. 5 competitor backlink opportunities
5. 10 HARO (Help A Reporter Out) topics

Format as JSON: { guestPostTargets: [], directories: [], brokenLinks: [], competitorOpps: [], haroTopics: [] }`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a backlink strategy expert. Provide actionable backlink opportunities.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

export async function generateSitemapXML(articles: any[]) {
  const baseUrl = process.env.VITE_APP_URL || "https://affiliagent.xyz";
  const now = new Date().toISOString().split("T")[0];

  const urlEntries = articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${article.priority || 0.8}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urlEntries}
</urlset>`;
}

export async function generateRobotsTXT(domain: string) {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://${domain}/sitemap.xml

User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /`;
}

export async function estimateSEOTimeline(niche: string, competition: "low" | "medium" | "high") {
  const timelines = {
    low: {
      firstRankings: "2-4 weeks",
      topTenRankings: "4-8 weeks",
      topThreeRankings: "8-12 weeks",
      estimatedTraffic: "100-500 visitors/month",
      estimatedRevenue: "€50-200/month",
    },
    medium: {
      firstRankings: "4-8 weeks",
      topTenRankings: "8-16 weeks",
      topThreeRankings: "12-24 weeks",
      estimatedTraffic: "50-200 visitors/month",
      estimatedRevenue: "€20-100/month",
    },
    high: {
      firstRankings: "8-12 weeks",
      topTenRankings: "16-24 weeks",
      topThreeRankings: "24-52 weeks",
      estimatedTraffic: "20-100 visitors/month",
      estimatedRevenue: "€10-50/month",
    },
  };

  return timelines[competition];
}

export async function generateSEOChecklist() {
  return {
    onPage: [
      "✅ Title tags (50-60 chars, keyword included)",
      "✅ Meta descriptions (150-160 chars)",
      "✅ H1 tags (one per page, keyword included)",
      "✅ Internal linking (3-5 per article)",
      "✅ Image alt text (descriptive, keyword)",
      "✅ Mobile responsiveness",
      "✅ Page speed (< 3 seconds)",
      "✅ Schema markup (Article, FAQ, BreadcrumbList)",
    ],
    offPage: [
      "✅ Backlinks from high-authority sites",
      "✅ Guest posts on relevant blogs",
      "✅ Directory submissions",
      "✅ Social media sharing",
      "✅ Brand mentions",
    ],
    technical: [
      "✅ XML Sitemap submitted to Google Search Console",
      "✅ Robots.txt optimized",
      "✅ SSL certificate (HTTPS)",
      "✅ Canonical tags",
      "✅ Mobile indexing",
      "✅ Core Web Vitals optimized",
    ],
    monitoring: [
      "✅ Google Search Console setup",
      "✅ Google Analytics 4 setup",
      "✅ Rank tracking tool",
      "✅ Backlink monitoring",
      "✅ Traffic analytics",
    ],
  };
}
