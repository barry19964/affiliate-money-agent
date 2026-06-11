import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createHeartbeatJob, updateHeartbeatJob, deleteHeartbeatJob, listHeartbeatJobs } from "../_core/heartbeat";
import { parse as parseCookie } from "cookie";
import { COOKIE_NAME } from "@shared/const";

/**
 * Scheduler Router für Verwaltung von automatisierten Tasks
 */
export const schedulerRouter = router({
  /**
   * Erstelle einen automatischen Content-Generierungs-Job
   */
  createContentGenerationJob: protectedProcedure
    .input(
      z.object({
        cron: z.string().describe("6-field cron expression (sec min hour dom mon dow)"),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

      const job = await createHeartbeatJob(
        {
          name: `content-gen-${ctx.user.id}-${Date.now()}`,
          cron: input.cron,
          path: "/api/scheduled/generateContent",
          description: input.description || "Automatische Content-Generierung",
          payload: { userId: ctx.user.id },
        },
        sessionToken
      );

      return {
        taskUid: job.taskUid,
        nextExecutionAt: job.nextExecutionAt,
        message: "Content-Generierungs-Job erstellt",
      };
    }),

  /**
   * Erstelle einen Trend-Erkennungs-Job
   */
  createTrendDetectionJob: protectedProcedure
    .input(
      z.object({
        cron: z.string().describe("6-field cron expression (sec min hour dom mon dow)"),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

      const job = await createHeartbeatJob(
        {
          name: `trend-detect-${ctx.user.id}-${Date.now()}`,
          cron: input.cron,
          path: "/api/scheduled/detectTrends",
          description: input.description || "Automatische Trend-Erkennung",
          payload: { userId: ctx.user.id },
        },
        sessionToken
      );

      return {
        taskUid: job.taskUid,
        nextExecutionAt: job.nextExecutionAt,
        message: "Trend-Erkennungs-Job erstellt",
      };
    }),

  /**
   * Liste alle Scheduler-Jobs des Benutzers auf
   */
  listJobs: protectedProcedure.query(async ({ ctx }) => {
    const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

    const result = await listHeartbeatJobs(sessionToken);

    return {
      total: result.total,
      jobs: result.jobs.map((job) => ({
        taskUid: job.taskUid,
        name: job.name,
        description: job.description,
        cronExpression: job.cronExpression,
        isEnabled: job.isEnable,
        createdAt: job.createdAt,
        lastExecutedAt: job.lastExecutedAt,
        nextExecutionAt: job.nextExecutionAt,
      })),
    };
  }),

  /**
   * Pausiere oder fortsetze einen Job
   */
  toggleJob: protectedProcedure
    .input(
      z.object({
        taskUid: z.string(),
        enable: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

      const result = await updateHeartbeatJob(
        input.taskUid,
        { enable: input.enable },
        sessionToken
      );

      return {
        taskUid: input.taskUid,
        enabled: input.enable,
        nextExecutionAt: result.nextExecutionAt,
        message: input.enable ? "Job aktiviert" : "Job pausiert",
      };
    }),

  /**
   * Lösche einen Job
   */
  deleteJob: protectedProcedure
    .input(z.object({ taskUid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

      await deleteHeartbeatJob(input.taskUid, sessionToken);

      return {
        taskUid: input.taskUid,
        message: "Job gelöscht",
      };
    }),
});
