import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  activateTikTokAutomation,
  activateInstagramAutomation,
  activateYouTubeAutomation,
  activateTwitterAutomation,
  setupOptimalPostingTimes,
  createContentCalendar,
  setupEngagementAutomation,
  getSocialMediaStatus,
  startCompleteSocialMediaWorkflow,
} from "../modules/phase63SocialMediaAutomation";

export const socialMediaAutomationRouter = router({
  // Activate TikTok automation
  activateTikTok: protectedProcedure.mutation(async () => {
    try {
      const result = await activateTikTokAutomation();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to activate TikTok",
      };
    }
  }),

  // Activate Instagram automation
  activateInstagram: protectedProcedure.mutation(async () => {
    try {
      const result = await activateInstagramAutomation();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to activate Instagram",
      };
    }
  }),

  // Activate YouTube automation
  activateYouTube: protectedProcedure.mutation(async () => {
    try {
      const result = await activateYouTubeAutomation();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to activate YouTube",
      };
    }
  }),

  // Activate Twitter automation
  activateTwitter: protectedProcedure.mutation(async () => {
    try {
      const result = await activateTwitterAutomation();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to activate Twitter",
      };
    }
  }),

  // Setup optimal posting times
  setupPostingTimes: protectedProcedure.mutation(async () => {
    try {
      const result = await setupOptimalPostingTimes();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to setup posting times",
      };
    }
  }),

  // Create content calendar
  createCalendar: protectedProcedure.mutation(async () => {
    try {
      const result = await createContentCalendar();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create calendar",
      };
    }
  }),

  // Setup engagement automation
  setupEngagement: protectedProcedure.mutation(async () => {
    try {
      const result = await setupEngagementAutomation();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to setup engagement",
      };
    }
  }),

  // Get social media status
  getStatus: protectedProcedure.query(async () => {
    try {
      const result = await getSocialMediaStatus();
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

  // Start complete social media workflow
  startWorkflow: protectedProcedure.mutation(async () => {
    try {
      const result = await startCompleteSocialMediaWorkflow();
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
});
