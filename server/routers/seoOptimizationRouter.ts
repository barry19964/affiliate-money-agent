import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  getKeywordsByNiche,
  generateBlogArticleIdeas,
  generateSEOOptimizedArticle,
  calculateSEOMetrics,
  generateSitemapXML,
  generateRobotsTXT,
  generateBacklinkOpportunities,
  generateSEOChecklist,
  generateTrafficForecast,
  HIGH_VALUE_KEYWORDS,
} from "../modules/seoOptimization";

export const seoOptimizationRouter = router({
  // Get keywords for a niche
  getKeywordsByNiche: protectedProcedure
    .input(z.object({ niche: z.string() }))
    .query(({ input }) => {
      const keywords = getKeywordsByNiche(input.niche);
      return {
        niche: input.niche,
        keywords,
        count: keywords.length,
      };
    }),

  // Get all high-value keywords
  getAllKeywords: protectedProcedure.query(() => {
    return {
      keywords: HIGH_VALUE_KEYWORDS,
      count: HIGH_VALUE_KEYWORDS.length,
    };
  }),

  // Generate blog article ideas
  generateArticleIdeas: protectedProcedure
    .input(z.object({ niche: z.string(), count: z.number().default(10) }))
    .query(({ input }) => {
      const ideas = generateBlogArticleIdeas(input.niche, input.count);
      return {
        niche: input.niche,
        ideas,
        count: ideas.length,
      };
    }),

  // Generate SEO-optimized article
  generateArticle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        keywords: z.array(z.string()),
        wordCount: z.number().default(2000),
      })
    )
    .query(({ input }) => {
      const article = generateSEOOptimizedArticle(input.title, input.keywords, input.wordCount);
      return {
        article,
        message: "Article generated successfully",
      };
    }),

  // Generate sitemap XML
  generateSitemap: protectedProcedure.query(() => {
    // Mock articles for demo
    const mockArticles = [
      {
        id: "1",
        title: "Best AI Tools 2026",
        slug: "best-ai-tools-2026",
        content: "",
        keywords: [],
        metaDescription: "",
        internalLinks: [],
        externalLinks: [],
        wordCount: 2000,
        readingTime: 10,
        publishedAt: new Date(),
        seoScore: 85,
      },
    ];

    const sitemap = generateSitemapXML(mockArticles);
    return {
      sitemap,
      message: "Sitemap generated successfully",
    };
  }),

  // Generate robots.txt
  generateRobotsTxt: protectedProcedure.query(() => {
    const robotsTxt = generateRobotsTXT();
    return {
      robotsTxt,
      message: "Robots.txt generated successfully",
    };
  }),

  // Get backlink opportunities
  getBacklinkOpportunities: protectedProcedure
    .input(z.object({ niche: z.string() }))
    .query(({ input }) => {
      const opportunities = generateBacklinkOpportunities(input.niche);
      return {
        niche: input.niche,
        opportunities,
        count: opportunities.length,
      };
    }),

  // Get SEO checklist
  getSEOChecklist: protectedProcedure.query(() => {
    const checklist = generateSEOChecklist();
    return {
      checklist,
      count: checklist.length,
    };
  }),

  // Generate traffic forecast
  generateTrafficForecast: protectedProcedure
    .input(
      z.object({
        articles: z.number().default(20),
        averageKeywordDifficulty: z.number().default(50),
      })
    )
    .query(({ input }) => {
      const forecast = generateTrafficForecast(input.articles, input.averageKeywordDifficulty);
      return {
        forecast,
        totalTraffic: forecast.reduce((sum, m) => sum + m.traffic, 0),
        totalRevenue: forecast.reduce((sum, m) => sum + m.revenue, 0),
      };
    }),

  // Get SEO metrics summary
  getSEOMetrics: protectedProcedure.query(() => {
    // Mock data for demo
    const mockArticles = Array(20)
      .fill(null)
      .map((_, i) => ({
        id: `${i}`,
        title: `Article ${i + 1}`,
        slug: `article-${i + 1}`,
        content: "",
        keywords: ["keyword1", "keyword2"],
        metaDescription: "",
        internalLinks: [],
        externalLinks: [],
        wordCount: 2000,
        readingTime: 10,
        publishedAt: new Date(),
        seoScore: 75 + Math.random() * 20,
      }));

    const metrics = calculateSEOMetrics(mockArticles, HIGH_VALUE_KEYWORDS);
    return metrics;
  }),

  // Generate blog content calendar
  generateContentCalendar: protectedProcedure
    .input(z.object({ niche: z.string(), months: z.number().default(3) }))
    .query(({ input }) => {
      const ideas = generateBlogArticleIdeas(input.niche, input.months * 7);
      const calendar = [];

      for (let i = 0; i < ideas.length; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i * 7);
        calendar.push({
          date: date.toISOString().split("T")[0],
          title: ideas[i],
          status: "planned",
          seoScore: 75 + Math.random() * 20,
        });
      }

      return {
        niche: input.niche,
        calendar,
        count: calendar.length,
      };
    }),

  // Get keyword difficulty analysis
  analyzeKeywordDifficulty: protectedProcedure.query(() => {
    const analysis = HIGH_VALUE_KEYWORDS.map((kw) => ({
      keyword: kw.keyword,
      difficulty: kw.difficulty,
      searchVolume: kw.searchVolume,
      cpc: kw.cpc,
      difficulty_level:
        kw.difficulty < 30
          ? "Easy"
          : kw.difficulty < 60
            ? "Medium"
            : kw.difficulty < 80
              ? "Hard"
              : "Very Hard",
      recommendation:
        kw.difficulty < 40
          ? "Target this keyword"
          : kw.difficulty < 60
            ? "Possible target"
            : "Skip for now",
    }));

    return {
      keywords: analysis,
      averageDifficulty: Math.round(
        HIGH_VALUE_KEYWORDS.reduce((sum, kw) => sum + kw.difficulty, 0) /
          HIGH_VALUE_KEYWORDS.length
      ),
    };
  }),
});
