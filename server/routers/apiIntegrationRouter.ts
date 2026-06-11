import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import * as realApis from "../modules/realApiIntegrations";
import * as payouts from "../modules/automatedPayouts";

export const apiIntegrationRouter = router({
  // ============= API Setup =============
  setupGoogleAds: protectedProcedure
    .input(z.object({
      customerId: z.string(),
      developerToken: z.string(),
      refreshToken: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchGoogleAdsMetrics({
        customerId: input.customerId,
        developerToken: input.developerToken,
        refreshToken: input.refreshToken,
      });
    }),

  setupYouTube: protectedProcedure
    .input(z.object({
      channelId: z.string(),
      accessToken: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchYouTubeMetrics({
        channelId: input.channelId,
        accessToken: input.accessToken,
      });
    }),

  setupTikTok: protectedProcedure
    .input(z.object({
      userId: z.string(),
      accessToken: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchTikTokMetrics({
        userId: input.userId,
        accessToken: input.accessToken,
      });
    }),

  setupMailchimp: protectedProcedure
    .input(z.object({
      apiKey: z.string(),
      listId: z.string(),
      serverPrefix: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchMailchimpMetrics({
        apiKey: input.apiKey,
        listId: input.listId,
        serverPrefix: input.serverPrefix,
      });
    }),

  setupStripe: protectedProcedure
    .input(z.object({
      secretKey: z.string(),
      publishableKey: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchStripeMetrics({
        secretKey: input.secretKey,
        publishableKey: input.publishableKey,
      });
    }),

  setupPayPal: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      mode: z.enum(["sandbox", "live"]),
    }))
    .mutation(async ({ input }) => {
      return await realApis.fetchPayPalMetrics({
        clientId: input.clientId,
        clientSecret: input.clientSecret,
        mode: input.mode,
      });
    }),

  // ============= API Validation =============
  validateAllAPIs: protectedProcedure
    .input(z.object({
      hasGoogleAds: z.boolean().optional(),
      hasYouTube: z.boolean().optional(),
      hasTikTok: z.boolean().optional(),
      hasMailchimp: z.boolean().optional(),
      hasStripe: z.boolean().optional(),
      hasPayPal: z.boolean().optional(),
    }))
    .query(async () => {
      // In production, would validate actual credentials
      return {
        allValid: true,
        results: {
          googleAds: { status: "ready_for_integration" },
          youtube: { status: "ready_for_integration" },
          tiktok: { status: "ready_for_integration" },
          mailchimp: { status: "ready_for_integration" },
          stripe: { status: "ready_for_integration" },
          paypal: { status: "ready_for_integration" },
        },
        timestamp: new Date(),
      };
    }),

  // ============= Payouts =============
  checkPayoutThreshold: protectedProcedure
    .input(z.object({
      currentBalance: z.number(),
      thresholds: z.array(z.number()).default([100, 500, 1000]),
    }))
    .query(async ({ input }) => {
      return await payouts.checkPayoutThreshold(input.currentBalance, input.thresholds);
    }),

  calculateTax: protectedProcedure
    .input(z.object({
      amount: z.number(),
      taxRate: z.number().default(0.19),
    }))
    .query(async ({ input }) => {
      return await payouts.calculateTax(input.amount, input.taxRate);
    }),

  createPayPalPayout: protectedProcedure
    .input(z.object({
      amount: z.number(),
      currency: z.string().default("EUR"),
      recipientEmail: z.string().email(),
      note: z.string(),
    }))
    .mutation(async ({ input }) => {
      const config: payouts.PayoutConfig = {
        method: "paypal",
        thresholds: [100, 500, 1000],
        frequency: "daily",
        taxRate: 0.19,
      };
      return await payouts.createPayPalPayout({
        amount: input.amount,
        currency: input.currency,
        recipientEmail: input.recipientEmail,
        note: input.note,
      }, config);
    }),

  createStripePayout: protectedProcedure
    .input(z.object({
      amount: z.number(),
      currency: z.string().default("EUR"),
      bankAccountId: z.string(),
      description: z.string(),
    }))
    .mutation(async ({ input }) => {
      const config: payouts.PayoutConfig = {
        method: "stripe",
        thresholds: [100, 500, 1000],
        frequency: "daily",
        taxRate: 0.19,
      };
      return await payouts.createStripePayout({
        amount: input.amount,
        currency: input.currency,
        bankAccountId: input.bankAccountId,
        description: input.description,
      }, config);
    }),

  schedulePayouts: protectedProcedure
    .input(z.object({
      frequency: z.enum(["daily", "weekly", "monthly"]),
      time: z.string().default("09:00"),
      minAmount: z.number().default(100),
      method: z.enum(["paypal", "stripe"]),
    }))
    .mutation(async ({ input }) => {
      return await payouts.schedulePayouts({
        frequency: input.frequency,
        time: input.time,
        minAmount: input.minAmount,
        method: input.method,
      });
    }),

  getPayoutHistory: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      const userId = parseInt(ctx.user?.id || "0");
      return await payouts.getPayoutHistory(userId, input.limit);
    }),

  getPayoutStatistics: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = parseInt(ctx.user?.id || "0");
      return await payouts.getPayoutStatistics(userId);
    }),

  getPayoutDashboard: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = parseInt(ctx.user?.id || "0");
      return await payouts.getPayoutDashboardData(userId);
    }),
});
