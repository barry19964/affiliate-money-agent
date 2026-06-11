import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import * as stripeSetup from "../modules/stripePayoutSetup";

export const stripePayoutRouter = router({
  // Initialize automatic payouts
  initializePayouts: protectedProcedure
    .input(z.object({
      secretKey: z.string(),
      publishableKey: z.string(),
      thresholds: z.array(z.number()).default([100, 500, 1000]),
      frequency: z.enum(["daily", "weekly", "monthly"]).default("daily"),
    }))
    .mutation(async ({ input }) => {
      return await stripeSetup.enableAutomaticPayouts({
        secretKey: input.secretKey,
        publishableKey: input.publishableKey,
        thresholds: input.thresholds,
        frequency: input.frequency,
      });
    }),

  // Get current payout status
  getStatus: protectedProcedure
    .query(async () => {
      return await stripeSetup.getPayoutStatus();
    }),

  // Test Stripe connection
  testConnection: protectedProcedure
    .input(z.object({
      secretKey: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await stripeSetup.testStripeConnection(input.secretKey);
    }),

  // Setup thresholds
  setupThresholds: protectedProcedure
    .input(z.object({
      thresholds: z.array(z.number()).default([100, 500, 1000]),
    }))
    .mutation(async ({ input }) => {
      return await stripeSetup.setupAutomaticPayoutThresholds(input.thresholds);
    }),

  // Setup daily schedule
  setupSchedule: protectedProcedure
    .query(async () => {
      return await stripeSetup.setupDailyPayoutSchedule();
    }),
});
