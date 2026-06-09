import { router, protectedProcedure } from "../_core/trpc";
import * as autoSetup from "../modules/autoApiSetup";

export const autoSetupRouter = router({
  // Setup all APIs automatically
  setupAllApis: protectedProcedure
    .mutation(async () => {
      return await autoSetup.setupAllApisAuto();
    }),

  // Create first campaign
  createFirstCampaign: protectedProcedure
    .mutation(async () => {
      return await autoSetup.createFirstCampaignAuto();
    }),

  // Setup monitoring
  setupMonitoring: protectedProcedure
    .mutation(async () => {
      return await autoSetup.setupMonitoringAuto();
    }),

  // Go live - complete setup
  goLive: protectedProcedure
    .mutation(async () => {
      return await autoSetup.goLiveAuto();
    }),

  // Get setup status
  getStatus: protectedProcedure
    .query(async () => {
      return {
        status: "ready",
        message: "System is ready for automatic setup",
        availableActions: ["setupAllApis", "createFirstCampaign", "setupMonitoring", "goLive"],
      };
    }),
});
