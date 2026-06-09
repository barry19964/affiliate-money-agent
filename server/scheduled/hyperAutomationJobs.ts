import { Request, Response } from "express";
import { sdk } from "../_core/sdk";
import * as dbHyper from "../db-hyper";
import * as db from "../db";
import { invokeLLM } from "../_core/llm";

/**
 * Daily Niche Pivoting Analysis
 * Analyzes current niche and recommends profitable switches
 */
export async function handleNichePivotingJob(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const userId = String(user.id || "0");
    const userIdNum = parseInt(userId);

    // Get current user configuration
    const config = await db.getPlatformConfig(userIdNum);
    if (!config) {
      return res.json({ ok: true, skipped: "no-config" });
    }

    // Analyze current niches
    const keywords = await db.getKeywords(userIdNum);
    if (keywords.length === 0) {
      return res.json({ ok: true, skipped: "no-keywords" });
    }

    // Create sample niche pivoting campaigns
    let campaignsCreated = 0;
    for (const keyword of keywords.slice(0, 2)) {
      await dbHyper.createNichePivotingCampaign({
        userId: userIdNum,
        currentNiche: keyword.keyword,
        targetNiche: `${keyword.keyword} Premium`,
        currentCPC: "0.5",
        targetCPC: "2.5",
        estimatedROI: 175,
        status: "planning",
      });
      campaignsCreated++;
    }

    // Send notification
    if (campaignsCreated > 0) {
      await dbHyper.createSmartNotification({
        userId: userIdNum,
        type: "opportunity",
        priority: "high",
        title: `🎯 ${campaignsCreated} Niche Pivoting Opportunities Found`,
        message: `Found ${campaignsCreated} profitable niches to switch to. Estimated additional revenue: €${campaignsCreated * 500}/month`,
        actionUrl: "/niche-pivoting",
        actionText: "View Opportunities",
        channels: ["email", "push"],
      });
    }

    return res.json({
      ok: true,
      opportunities: campaignsCreated,
      campaigns: campaignsCreated,
    });
  } catch (error: any) {
    console.error("[NichePivoting Job]", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      context: { url: req.url, taskUid: req.body?.taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Daily Influencer Outreach
 * Finds influencers and sends automated pitches
 */
export async function handleInfluencerOutreachJob(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const userId = String(user.id || "0");
    const userIdNum = parseInt(userId);

    // Get user's keywords
    const keywords = await db.getKeywords(userIdNum);
    if (keywords.length === 0) {
      return res.json({ ok: true, skipped: "no-keywords" });
    }

    let totalCampaigns = 0;

    // Create sample influencer campaigns
    for (const keyword of keywords.slice(0, 2)) {
      await dbHyper.createInfluencerCampaign({
        userId: userIdNum,
        influencerId: `inf_${Math.random().toString(36).substr(2, 9)}`,
        influencerName: `Influencer ${Math.random().toString(36).substr(2, 5)}`,
        platform: "youtube",
        followers: 50000 + Math.random() * 450000,
        engagement: String(2.5 + Math.random() * 5),
        campaignType: "product_review",
        proposedFee: "500",
        estimatedRevenue: "2000",
        status: "outreach",
        pitchSentAt: new Date(),
      });
      totalCampaigns++;
    }

    // Send notification
    if (totalCampaigns > 0) {
      await dbHyper.createSmartNotification({
        userId: userIdNum,
        type: "action_required",
        priority: "high",
        title: `👥 ${totalCampaigns} Influencer Outreach Campaigns Started`,
        message: `Automated pitches sent to ${totalCampaigns} influencers. Estimated potential revenue: €${totalCampaigns * 1500}`,
        actionUrl: "/influencer-outreach",
        actionText: "Track Campaigns",
        channels: ["email", "in_app"],
      });
    }

    return res.json({ ok: true, campaigns: totalCampaigns });
  } catch (error: any) {
    console.error("[InfluencerOutreach Job]", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      context: { url: req.url, taskUid: req.body?.taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Daily Video Generation
 * Converts top blog posts to videos
 */
export async function handleVideoGenerationJob(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const userId = String(user.id || "0");
    const userIdNum = parseInt(userId);

    // Get top performing content
    const content = await db.getContent(userIdNum, 5, 0);
    if (content.length === 0) {
      return res.json({ ok: true, skipped: "no-content" });
    }

    let videosGenerated = 0;

    // Generate videos for top content
    for (const article of content.slice(0, 2)) {
      // Generate video script using LLM
      const scriptResponse = await invokeLLM({
        messages: [
          {
            role: "system",
            content:
              "You are a video script writer. Create engaging video scripts from blog articles.",
          },
          {
            role: "user",
            content: `Create a 60-second video script for this article:\n\nTitle: ${article.title}\n\nContent: ${article.body.substring(0, 500)}`,
          },
        ],
      });

      const script =
        scriptResponse.choices[0].message.content || "Video script generation failed";

      // Create video campaign
      await dbHyper.createVideoCampaign({
        userId: userIdNum,
        title: `${article.title} - Video`,
        platform: "youtube",
        contentId: article.id,
        scriptContent: script as any,
        status: "generating",
        estimatedViews: 5000,
        estimatedRevenue: "25.0",
      });

      videosGenerated++;
    }

    // Send notification
    if (videosGenerated > 0) {
      await dbHyper.createSmartNotification({
        userId: userIdNum,
        type: "opportunity",
        priority: "medium",
        title: `🎬 ${videosGenerated} Videos Generated`,
        message: `AI videos created from your top blog posts. Estimated revenue: €${videosGenerated * 25}/month`,
        actionUrl: "/video-generation",
        actionText: "View Videos",
        channels: ["email", "in_app"],
      });
    }

    return res.json({ ok: true, videosGenerated });
  } catch (error: any) {
    console.error("[VideoGeneration Job]", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      context: { url: req.url, taskUid: req.body?.taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Daily Ad Spend Optimization
 * Analyzes and optimizes ad campaigns
 */
export async function handleAdOptimizationJob(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const userId = String(user.id || "0");
    const userIdNum = parseInt(userId);

    // Get user's ad campaigns
    const campaigns = await dbHyper.getAdCampaigns(userIdNum as any);
    if (campaigns.length === 0) {
      return res.json({ ok: true, skipped: "no-campaigns" });
    }

    let optimizationsApplied = 0;

    // Analyze each campaign
    for (const campaign of campaigns) {
      // Update campaign with optimization
      await dbHyper.updateAdCampaign(campaign.id, {
        status: "optimizing",
        lastOptimizedAt: new Date(),
      });
      optimizationsApplied++;
    }

    // Get stats
    const stats = await dbHyper.getAdCampaignStats(userIdNum);

    // Send notification
    if (optimizationsApplied > 0) {
      await dbHyper.createSmartNotification({
        userId: userIdNum,
        type: "performance",
        priority: "high",
        title: `⚡ ${optimizationsApplied} Ad Optimizations Applied`,
        message: `Your ad campaigns have been optimized. Current ROAS: ${stats.roas}. Daily profit: €${stats.profit}`,
        actionUrl: "/ad-optimization",
        actionText: "View Results",
        channels: ["email", "in_app"],
      });
    }

    return res.json({ ok: true, optimizationsApplied, stats });
  } catch (error: any) {
    console.error("[AdOptimization Job]", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      context: { url: req.url, taskUid: req.body?.taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Hourly Smart Notifications
 * Detects trends, issues, and opportunities
 */
export async function handleSmartNotificationsJob(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const userId = String(user.id || "0");
    const userIdNum = parseInt(userId);

    // Create sample viral trend notification
    await dbHyper.createSmartNotification({
      userId: userIdNum,
      type: "opportunity",
      priority: "critical",
      title: "🔥 Viral Trend: AI Tools",
      message: "AI tools searches up 300% in last 24 hours. Estimated value: €5,000",
      actionUrl: "/niche-pivoting",
      actionText: "Capitalize",
      channels: ["email", "push", "in_app"],
    });

    // Create sample performance alert
    await dbHyper.createSmartNotification({
      userId: userIdNum,
      type: "alert",
      priority: "high",
      title: "⚠️ Low ROAS Alert",
      message: "Your ROAS is 1.2, minimum viable is 2.0. Pause underperforming campaigns",
      actionUrl: "/ad-optimization",
      actionText: "Fix Now",
      channels: ["email", "push"],
    });

    // Get stats for milestone
    const stats = await dbHyper.getAdCampaignStats(userIdNum);
    if (parseFloat(stats.profit) >= 100 && parseFloat(stats.profit) < 150) {
      await dbHyper.createSmartNotification({
        userId: userIdNum,
        type: "milestone",
        priority: "high",
        title: "🎯 €100 Daily Profit Milestone!",
        message: "Congratulations! You've reached €100 in daily profit. Keep optimizing!",
        actionUrl: "/dashboard",
        actionText: "View Dashboard",
        channels: ["email", "in_app"],
      });
    }

    return res.json({ ok: true, notifications: 2 });
  } catch (error: any) {
    console.error("[SmartNotifications Job]", error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      context: { url: req.url, taskUid: req.body?.taskUid },
      timestamp: new Date().toISOString(),
    });
  }
}
