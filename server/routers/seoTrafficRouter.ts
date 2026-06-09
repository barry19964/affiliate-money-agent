import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  generateSEOContentPlan,
  generateSEOArticle,
  generateBacklinkStrategy,
  generateSitemapXML,
  generateRobotsTXT,
  estimateSEOTimeline,
  generateSEOChecklist,
} from "../modules/seoTrafficStrategy";

export const seoTrafficRouter = router({
  // Generate comprehensive SEO content plan
  generateContentPlan: protectedProcedure
    .input(
      z.object({
        niche: z.string(),
        targetKeywords: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const plan = await generateSEOContentPlan(input.niche, input.targetKeywords);
        return {
          success: true,
          plan,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate plan",
        };
      }
    }),

  // Generate SEO-optimized article
  generateArticle: protectedProcedure
    .input(
      z.object({
        keyword: z.string(),
        niche: z.string(),
        wordCount: z.number().default(2000),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const article = await generateSEOArticle(input.keyword, input.niche, input.wordCount);
        return {
          success: true,
          article,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate article",
        };
      }
    }),

  // Generate backlink strategy
  generateBacklinkStrategy: protectedProcedure
    .input(
      z.object({
        niche: z.string(),
        domain: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const strategy = await generateBacklinkStrategy(input.niche, input.domain);
        return {
          success: true,
          strategy,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate strategy",
        };
      }
    }),

  // Generate XML Sitemap
  generateSitemap: protectedProcedure
    .input(
      z.object({
        articles: z.array(
          z.object({
            slug: z.string(),
            priority: z.number().optional(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      try {
        const sitemap = await generateSitemapXML(input.articles);
        return {
          success: true,
          sitemap,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate sitemap",
        };
      }
    }),

  // Generate Robots.txt
  generateRobots: protectedProcedure
    .input(z.object({ domain: z.string() }))
    .query(async ({ input }) => {
      try {
        const robots = await generateRobotsTXT(input.domain);
        return {
          success: true,
          robots,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to generate robots.txt",
        };
      }
    }),

  // Estimate SEO timeline
  estimateTimeline: protectedProcedure
    .input(
      z.object({
        niche: z.string(),
        competition: z.enum(["low", "medium", "high"]),
      })
    )
    .query(async ({ input }) => {
      try {
        const timeline = await estimateSEOTimeline(input.niche, input.competition);
        return {
          success: true,
          timeline,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to estimate timeline",
        };
      }
    }),

  // Get SEO checklist
  getChecklist: protectedProcedure.query(async () => {
    try {
      const checklist = await generateSEOChecklist();
      return {
        success: true,
        checklist,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get checklist",
      };
    }
  }),

  // Get SEO status
  getStatus: protectedProcedure.query(() => {
    return {
      status: "active",
      features: {
        contentPlanning: true,
        articleGeneration: true,
        backlinkStrategy: true,
        sitemapGeneration: true,
        timelineEstimation: true,
        checklistGeneration: true,
      },
      estimatedTrafficIncrease: "100-500% over 3 months",
      estimatedRevenueIncrease: "€500-2000/month (Month 3+)",
    };
  }),
});
