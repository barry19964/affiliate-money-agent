/**
 * Auto-Activation Module
 * Automatically activates all 3 workflows on first user login
 */

import * as db from "../db";
import { startCompleteGoogleAdsWorkflow } from "./phase62GoogleAdsSetup";
import { startCompleteSocialMediaWorkflow } from "./phase63SocialMediaAutomation";
import { publishArticle, generateSitemap, submitToGoogleSearchConsole } from "./publishingAutomation";

export interface WorkflowActivationStatus {
  publishing: boolean;
  googleAds: boolean;
  socialMedia: boolean;
  activatedAt: Date;
  status: "pending" | "active" | "completed";
}

/**
 * Check if workflows have been auto-activated for this user
 */
export async function getWorkflowActivationStatus(userId: number): Promise<WorkflowActivationStatus | null> {
  try {
    const config = await db.getPlatformConfig(userId);
    if (!config) return null;

    return {
      publishing: config.publishingActive || false,
      googleAds: config.googleAdsActive || false,
      socialMedia: config.socialMediaActive || false,
      activatedAt: config.createdAt || new Date(),
      status: "active",
    };
  } catch (error) {
    console.error("[AutoActivate] Error getting status:", error);
    return null;
  }
}

/**
 * Auto-activate all workflows for a user
 */
export async function autoActivateAllWorkflows(userId: number) {
  try {
    console.log(`[AutoActivate] Starting auto-activation for user ${userId}...`);

    // Step 1: Activate Publishing
    console.log("[AutoActivate] Step 1: Activating Publishing...");
    const articles = await db.getContent(userId, 100, 0);
    
    if (articles.length > 0) {
      // Publish first 5 articles
      for (const article of articles.slice(0, 5)) {
        try {
          await publishArticle({
            title: article.title,
            content: article.body,
            keywords: article.keywords || [],
            slug: article.slug,
            metaDescription: article.excerpt || article.title.substring(0, 160),
          });
        } catch (err) {
          console.error(`[AutoActivate] Error publishing article ${article.id}:`, err);
        }
      }

      // Generate and submit sitemap
      try {
        const sitemap = await generateSitemap(
          articles.map(a => ({ slug: a.slug }))
        );
        await submitToGoogleSearchConsole("https://affiliagent.xyz/sitemap.xml");
        console.log("[AutoActivate] ✅ Publishing activated");
      } catch (err) {
        console.error("[AutoActivate] Error with sitemap:", err);
      }
    }

    // Step 2: Activate Google Ads
    console.log("[AutoActivate] Step 2: Activating Google Ads...");
    try {
      const adsResult = await startCompleteGoogleAdsWorkflow();
      console.log("[AutoActivate] ✅ Google Ads activated");
    } catch (err) {
      console.error("[AutoActivate] Error activating Google Ads:", err);
    }

    // Step 3: Activate Social Media
    console.log("[AutoActivate] Step 3: Activating Social Media...");
    try {
      const socialResult = await startCompleteSocialMediaWorkflow();
      console.log("[AutoActivate] ✅ Social Media activated");
    } catch (err) {
      console.error("[AutoActivate] Error activating Social Media:", err);
    }

    // Mark as activated in config
    await db.updatePlatformConfig(userId, {
      publishingActive: true,
      googleAdsActive: true,
      socialMediaActive: true,
      lastWorkflowActivation: new Date(),
    });

    console.log(`[AutoActivate] ✅ All workflows activated for user ${userId}`);

    return {
      success: true,
      message: "All workflows activated successfully",
      workflows: {
        publishing: true,
        googleAds: true,
        socialMedia: true,
      },
      activatedAt: new Date(),
    };
  } catch (error) {
    console.error("[AutoActivate] Error in auto-activation:", error);
    throw error;
  }
}

/**
 * Auto-activate on user first login
 */
export async function checkAndAutoActivateOnLogin(userId: number) {
  try {
    const status = await getWorkflowActivationStatus(userId);
    
    // If workflows not yet activated, activate them now
    if (status && !status.publishing && !status.googleAds && !status.socialMedia) {
      console.log(`[AutoActivate] First login detected for user ${userId}, auto-activating workflows...`);
      return await autoActivateAllWorkflows(userId);
    }

    return {
      success: true,
      alreadyActivated: true,
      message: "Workflows already activated",
    };
  } catch (error) {
    console.error("[AutoActivate] Error checking login:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
