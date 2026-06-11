import { Request, Response } from "express";
import { sdk } from "../_core/sdk";
import { generateContentScheduled, detectTrendsScheduled } from "./contentGenerator";

/**
 * Handler für automatische Content-Generierung
 * Wird vom Scheduler aufgerufen
 */
export async function handleContentGenerationSchedule(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    
    if (!user.isCron || !user.id) {
      return res.status(403).json({ error: "cron-only" });
    }

    const result = await generateContentScheduled(user.id);
    
    if (!result.ok) {
      return res.status(500).json({
        error: result.error,
        context: {
          userId: user.id,
          taskUid: user.taskUid,
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.json({
      ok: true,
      contentGenerated: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Content generation handler error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      context: { url: req.url },
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Handler für Trend-Erkennung
 * Wird vom Scheduler aufgerufen
 */
export async function handleTrendDetectionSchedule(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    
    if (!user.isCron || !user.id) {
      return res.status(403).json({ error: "cron-only" });
    }

    const result = await detectTrendsScheduled(user.id);
    
    if (!result.ok) {
      return res.status(500).json({
        error: result.error,
        context: {
          userId: user.id,
          taskUid: user.taskUid,
        },
        timestamp: new Date().toISOString(),
      });
    }

    res.json({
      ok: true,
      trendsDetected: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Trend detection handler error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      context: { url: req.url },
      timestamp: new Date().toISOString(),
    });
  }
}
