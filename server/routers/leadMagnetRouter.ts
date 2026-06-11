import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import {
  LEAD_MAGNET_IDEAS,
  generateEmailSequence,
  generateLeadCaptureForm,
  generateMonetizationStrategies,
  calculateLeadMagnetROI,
  generateLeadMagnetContent,
  getLeadMagnetDashboardData,
  scoreLeads,
} from "../modules/leadMagnetFunnel";

export const leadMagnetRouter = router({
  // Get all lead magnets
  getAllLeadMagnets: protectedProcedure.query(() => {
    return {
      leadMagnets: LEAD_MAGNET_IDEAS,
      count: LEAD_MAGNET_IDEAS.length,
    };
  }),

  // Get lead magnet by ID
  getLeadMagnet: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const leadMagnet = LEAD_MAGNET_IDEAS.find((lm) => lm.id === input.id);
      if (!leadMagnet) {
        return { error: "Lead magnet not found" };
      }
      return { leadMagnet };
    }),

  // Generate email sequence for lead magnet
  generateEmailSequence: protectedProcedure
    .input(z.object({ leadMagnetTitle: z.string(), niche: z.string() }))
    .query(({ input }) => {
      const sequence = generateEmailSequence(input.leadMagnetTitle, input.niche);
      return {
        sequence,
        emailCount: sequence.emails.length,
      };
    }),

  // Generate lead capture form
  generateLeadCaptureForm: protectedProcedure
    .input(z.object({ leadMagnetTitle: z.string() }))
    .query(({ input }) => {
      const form = generateLeadCaptureForm(input.leadMagnetTitle);
      return {
        form,
      };
    }),

  // Get monetization strategies
  getMonetizationStrategies: protectedProcedure
    .input(z.object({ leadMagnetTitle: z.string(), niche: z.string() }))
    .query(({ input }) => {
      const strategies = generateMonetizationStrategies(input.leadMagnetTitle, input.niche);
      const totalRevenue = strategies.reduce((sum, s) => sum + s.estimatedRevenue, 0);
      return {
        strategies,
        totalEstimatedRevenue: totalRevenue,
      };
    }),

  // Calculate ROI for lead magnet
  calculateROI: protectedProcedure
    .input(
      z.object({
        leadMagnetId: z.string(),
        monthlyLeads: z.number().default(100),
      })
    )
    .query(({ input }) => {
      const leadMagnet = LEAD_MAGNET_IDEAS.find((lm) => lm.id === input.leadMagnetId);
      if (!leadMagnet) {
        return { error: "Lead magnet not found" };
      }

      const sequence = generateEmailSequence(leadMagnet.title, leadMagnet.niche);
      const roi = calculateLeadMagnetROI(leadMagnet, sequence, input.monthlyLeads);

      return {
        leadMagnet: leadMagnet.title,
        ...roi,
      };
    }),

  // Generate lead magnet content
  generateContent: protectedProcedure
    .input(z.object({ title: z.string(), niche: z.string() }))
    .query(({ input }) => {
      const content = generateLeadMagnetContent(input.title, input.niche);
      return {
        content,
      };
    }),

  // Get dashboard data
  getDashboardData: protectedProcedure.query(() => {
    return getLeadMagnetDashboardData();
  }),

  // Score leads
  scoreLeads: protectedProcedure
    .input(
      z.object({
        leads: z.array(
          z.object({
            email: z.string(),
            engagement: z.number(),
            clicks: z.number(),
            purchases: z.number(),
          })
        ),
      })
    )
    .query(({ input }) => {
      const scoredLeads = scoreLeads(input.leads);
      const hotLeads = scoredLeads.filter((l) => l.tier === "hot").length;
      const warmLeads = scoredLeads.filter((l) => l.tier === "warm").length;
      const coldLeads = scoredLeads.filter((l) => l.tier === "cold").length;

      return {
        scoredLeads,
        summary: {
          hotLeads,
          warmLeads,
          coldLeads,
          totalLeads: scoredLeads.length,
        },
      };
    }),

  // Get lead magnet by niche
  getByNiche: protectedProcedure
    .input(z.object({ niche: z.string() }))
    .query(({ input }) => {
      const leadMagnets = LEAD_MAGNET_IDEAS.filter((lm) => lm.niche === input.niche);
      return {
        niche: input.niche,
        leadMagnets,
        count: leadMagnets.length,
        totalRevenue: leadMagnets.reduce((sum, lm) => sum + lm.estimatedRevenue, 0),
      };
    }),

  // Get top performing lead magnets
  getTopPerformers: protectedProcedure
    .input(z.object({ limit: z.number().default(3) }))
    .query(({ input }) => {
      const topPerformers = LEAD_MAGNET_IDEAS.sort(
        (a, b) => b.estimatedRevenue - a.estimatedRevenue
      ).slice(0, input.limit);

      return {
        topPerformers,
        count: topPerformers.length,
      };
    }),

  // Get email sequence preview
  getEmailSequencePreview: protectedProcedure
    .input(z.object({ leadMagnetId: z.string() }))
    .query(({ input }) => {
      const leadMagnet = LEAD_MAGNET_IDEAS.find((lm) => lm.id === input.leadMagnetId);
      if (!leadMagnet) {
        return { error: "Lead magnet not found" };
      }

      const sequence = generateEmailSequence(leadMagnet.title, leadMagnet.niche);
      return {
        leadMagnet: leadMagnet.title,
        sequence: sequence.emails.map((email) => ({
          day: email.daysSinceSignup,
          subject: email.subject,
          cta: email.cta,
        })),
      };
    }),
});
