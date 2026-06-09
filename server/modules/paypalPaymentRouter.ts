import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import {
  sendPayoutToPayPal,
  getPayoutStatus,
  calculateTotalRevenue,
  setupScheduledPayout,
  getPayoutHistory,
  updateScheduledPayout,
  cancelScheduledPayout,
  getPayPalDashboardStats,
  processScheduledPayouts,
} from "./paypalIntegration";

export const paypalPaymentRouter = router({
  /**
   * Send immediate payout to PayPal
   */
  sendPayout: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        amount: z.number().positive(),
        note: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await sendPayoutToPayPal({
          email: input.email,
          amount: input.amount,
          currency: "EUR",
          note: input.note,
          senderBatchId: `batch-${ctx.user.id}-${Date.now()}`,
        });

        return result;
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get payout status
   */
  getPayoutStatus: protectedProcedure
    .input(z.object({ batchId: z.string() }))
    .query(async ({ input }) => {
      try {
        return await getPayoutStatus(input.batchId);
      } catch (error) {
        return {
          status: "ERROR",
          items: [],
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Calculate total revenue
   */
  calculateTotalRevenue: protectedProcedure.query(async ({ ctx }) => {
    try {
      const totalRevenue = await calculateTotalRevenue(ctx.user.id);
      return { totalRevenue };
    } catch (error) {
      return {
        totalRevenue: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Setup scheduled payout
   */
  setupScheduledPayout: protectedProcedure
    .input(
      z.object({
        paypalEmail: z.string().email(),
        frequency: z.enum(["daily", "weekly", "monthly"]),
        minimumAmount: z.number().positive().default(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const payout = setupScheduledPayout(
          ctx.user.id,
          input.paypalEmail,
          input.frequency,
          input.minimumAmount
        );

        return {
          success: true,
          payout,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get payout history
   */
  getPayoutHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
      const payouts = getPayoutHistory(ctx.user.id);
      return { payouts };
    } catch (error) {
      return {
        payouts: [],
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Update scheduled payout
   */
  updateScheduledPayout: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        frequency: z.enum(["daily", "weekly", "monthly"]).optional(),
        minimumAmount: z.number().positive().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updated = updateScheduledPayout(input.id, {
          frequency: input.frequency,
          minimumAmount: input.minimumAmount,
        });

        if (!updated) {
          return { success: false, error: "Payout not found" };
        }

        return { success: true, payout: updated };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Cancel scheduled payout
   */
  cancelScheduledPayout: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const success = cancelScheduledPayout(input.id);
        return { success };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get PayPal dashboard stats
   */
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const stats = await getPayPalDashboardStats(ctx.user.id);
      return stats;
    } catch (error) {
      return {
        totalRevenue: 0,
        pendingPayout: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Process all scheduled payouts (admin only)
   */
  processScheduledPayouts: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      // Only allow admin or owner
      if (ctx.user.role !== "admin") {
        return { success: false, error: "Unauthorized" };
      }

      await processScheduledPayouts();
      return { success: true, message: "Scheduled payouts processed" };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Get PayPal configuration
   */
  getConfiguration: protectedProcedure.query(async () => {
    return {
      mode: process.env.PAYPAL_MODE || "sandbox",
      clientId: process.env.PAYPAL_CLIENT_ID ? "***" : "NOT_SET",
      clientSecret: process.env.PAYPAL_CLIENT_SECRET ? "***" : "NOT_SET",
      webhookId: process.env.PAYPAL_WEBHOOK_ID ? "***" : "NOT_SET",
    };
  }),

  /**
   * Test PayPal connection
   */
  testConnection: protectedProcedure.mutation(async () => {
    try {
      const result = await sendPayoutToPayPal({
        email: "test@example.com",
        amount: 0.01,
        currency: "EUR",
        note: "Test payout",
        senderBatchId: `test-${Date.now()}`,
      });

      return {
        success: result.success,
        message: result.success
          ? "PayPal connection successful"
          : result.error,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});

export default paypalPaymentRouter;
