import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { startCompleteGoogleAdsWorkflow } from "../modules/phase62GoogleAdsSetup";

export const googleAdsRouter = router({
  // Start complete Google Ads workflow
  startWorkflow: protectedProcedure.mutation(async () => {
    try {
      const result = await startCompleteGoogleAdsWorkflow();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to start workflow",
      };
    }
  }),

  // Get Google Ads status
  getStatus: protectedProcedure.query(async () => {
    try {
      const result = await startCompleteGoogleAdsWorkflow();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get status",
      };
    }
  }),
});
