import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { addSubscriberToMailchimp, generateLeadMagnetEmailSequence } from "../modules/emailAutomation";

export const webhookRouter = router({
  // Handle lead magnet signup from landing page
  handleLeadSignup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string(),
        leadMagnetId: z.string(),
        niche: z.string(),
        source: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Get Mailchimp credentials from env
        const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
        const mailchimpListId = process.env.MAILCHIMP_LIST_ID || "default-list";

        if (!mailchimpApiKey) {
          return {
            success: false,
            error: "Mailchimp not configured",
            message: "Email service is not available",
          };
        }

        // Add subscriber to Mailchimp
        const subscriber = await addSubscriberToMailchimp(
          {
            email: input.email,
            firstName: input.firstName,
            lastName: "",
            tags: [input.niche, input.leadMagnetId, "lead-magnet"],
            mergeFields: {
              LEADMAG: input.leadMagnetId,
              NICHE: input.niche,
              SOURCE: input.source || "landing-page",
              UTMSOURCE: input.utmSource || "",
              UTMMEDIUM: input.utmMedium || "",
              UTMCAMP: input.utmCampaign || "",
            },
          },
          mailchimpListId,
          mailchimpApiKey
        );

        // Generate email sequence for this lead magnet
        const emailSequence = generateLeadMagnetEmailSequence(input.leadMagnetId, input.niche);

        // Log the signup for analytics
        console.log(`Lead signup: ${input.email} for ${input.leadMagnetId}`);

        return {
          success: true,
          message: "Signup successful! Check your email for the guide.",
          subscriberId: subscriber.id,
          emailSequenceId: emailSequence.id,
        };
      } catch (error) {
        console.error("Webhook error:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          message: "There was an error processing your signup. Please try again.",
        };
      }
    }),

  // Track lead magnet download
  trackDownload: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        leadMagnetId: z.string(),
        timestamp: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Log download event for analytics
      console.log(`Lead magnet downloaded: ${input.email} - ${input.leadMagnetId}`);

      return {
        success: true,
        message: "Download tracked",
      };
    }),

  // Track email click
  trackEmailClick: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        emailId: z.string(),
        linkUrl: z.string(),
        timestamp: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Log email click for analytics
      console.log(`Email click: ${input.email} - ${input.emailId} - ${input.linkUrl}`);

      return {
        success: true,
        message: "Click tracked",
      };
    }),

  // Track conversion (purchase/signup)
  trackConversion: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        leadMagnetId: z.string(),
        conversionType: z.enum(["purchase", "signup", "affiliate-click", "course-purchase"]),
        revenue: z.number().optional(),
        timestamp: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Log conversion for analytics
      console.log(
        `Conversion: ${input.email} - ${input.conversionType} - €${input.revenue || 0}`
      );

      return {
        success: true,
        message: "Conversion tracked",
      };
    }),

  // Get webhook status
  getStatus: protectedProcedure.query(() => {
    return {
      status: "active",
      mailchimpConnected: !!process.env.MAILCHIMP_API_KEY,
      analyticsEnabled: true,
      conversionTrackingEnabled: true,
    };
  }),

  // Test webhook
  testWebhook: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        leadMagnetId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(`Test webhook: ${input.email} - ${input.leadMagnetId}`);

      return {
        success: true,
        message: "Test webhook successful",
        testData: {
          email: input.email,
          leadMagnetId: input.leadMagnetId,
          timestamp: new Date().toISOString(),
        },
      };
    }),
});
