import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  analyzeNiches,
  getTopNiches,
  generateNicheKeywords,
  createPaidAdsStrategy,
  projectNicheRevenue,
  getNicheDashboardData,
  calculateNichePerformance,
} from "../modules/nicheOptimization";

export const nicheOptimizationRouter = router({
  // Get top profitable niches
  getTopNiches: protectedProcedure
    .input(z.object({ count: z.number().default(3) }))
    .query(({ input }) => {
      const niches = getTopNiches(input.count);
      return {
        niches,
        message: `Found ${niches.length} top profitable niches`,
      };
    }),

  // Analyze all niches
  analyzeNiches: protectedProcedure.query(() => {
    const niches = analyzeNiches();
    return {
      niches,
      message: `Analyzed ${niches.length} niches`,
    };
  }),

  // Get keywords for a niche
  getNicheKeywords: protectedProcedure
    .input(z.object({ niche: z.string() }))
    .query(({ input }) => {
      const keywords = generateNicheKeywords(input.niche);
      return {
        niche: input.niche,
        keywords,
        count: keywords.length,
      };
    }),

  // Create paid ads strategy
  createPaidAdsStrategy: protectedProcedure
    .input(z.object({ niche: z.string(), budget: z.number() }))
    .query(({ input }) => {
      const strategy = createPaidAdsStrategy(input.niche, input.budget);
      return {
        strategy,
        message: `Created paid ads strategy for ${input.niche}`,
      };
    }),

  // Project revenue for a niche
  projectRevenue: protectedProcedure
    .input(
      z.object({
        niche: z.string(),
        budget: z.number(),
      })
    )
    .query(({ input }) => {
      const niches = analyzeNiches();
      const selectedNiche = niches.find((n) => n.name === input.niche);

      if (!selectedNiche) {
        return { error: "Niche not found" };
      }

      const projection = projectNicheRevenue(selectedNiche, input.budget);
      return {
        niche: input.niche,
        budget: input.budget,
        ...projection,
      };
    }),

  // Get dashboard data
  getDashboardData: protectedProcedure.query(() => {
    return getNicheDashboardData();
  }),

  // Calculate performance metrics
  calculatePerformance: protectedProcedure
    .input(
      z.object({
        niche: z.string(),
        clicks: z.number(),
        conversions: z.number(),
        revenue: z.number(),
        spend: z.number(),
      })
    )
    .query(({ input }) => {
      const performance = calculateNichePerformance(
        input.niche,
        input.clicks,
        input.conversions,
        input.revenue,
        input.spend
      );

      return {
        niche: input.niche,
        ...performance,
      };
    }),

  // Get all niches with scores
  getAllNichesWithScores: protectedProcedure.query(() => {
    const niches = analyzeNiches();
    return {
      niches: niches.map((n) => ({
        ...n,
        score: (
          (n.cpc *
            n.monthlySearches *
            n.conversionRate *
            n.profitMargin) /
          (n.competition === "high" ? 0.7 : n.competition === "medium" ? 1.0 : 1.5)
        ).toFixed(0),
      })),
    };
  }),

  // Get niche recommendations
  getRecommendations: protectedProcedure.query(() => {
    const topNiches = getTopNiches(3);
    return {
      recommendations: topNiches.map((niche) => ({
        niche: niche.name,
        reason: `High CPC (€${niche.cpc}), ${niche.monthlySearches.toLocaleString()} monthly searches, ${(niche.conversionRate * 100).toFixed(1)}% conversion rate`,
        recommendedBudget: 500,
        projectedMonthlyRevenue: projectNicheRevenue(niche, 500).projectedRevenue.toFixed(2),
        roi: projectNicheRevenue(niche, 500).roi.toFixed(1),
      })),
    };
  }),
});
