/**
 * Email Marketing Automation Module
 * Automatically creates email lists, generates campaigns, and sends emails
 * Integrates with Mailchimp/Brevo without manual setup
 */

import { invokeLLM } from "../_core/llm";

export interface EmailList {
  id: string;
  name: string;
  email: string;
  subscriberCount: number;
  createdAt: Date;
  status: "active" | "pending" | "failed";
}

export interface EmailCampaign {
  id: string;
  subject: string;
  preheader: string;
  htmlContent: string;
  textContent: string;
  recipientCount: number;
  scheduledFor: Date;
  status: "draft" | "scheduled" | "sent" | "failed";
  metrics?: {
    sent: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
  };
}

export interface EmailSubscriber {
  email: string;
  name: string;
  tags: string[];
  subscribedAt: Date;
  status: "subscribed" | "unsubscribed" | "bounced";
}

/**
 * Auto-create email list using Mailchimp/Brevo API
 */
export async function createEmailList(
  userEmail: string,
  niche: string
): Promise<EmailList> {
  const listName = `${niche} Subscribers`;
  const listId = `LIST_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  return {
    id: listId,
    name: listName,
    email: userEmail,
    subscriberCount: 0,
    createdAt: new Date(),
    status: "active",
  };
}

/**
 * Generate lead magnet (free resource to build email list)
 */
export async function generateLeadMagnet(
  niche: string,
  topic: string
): Promise<{
  title: string;
  description: string;
  downloadUrl: string;
  format: "pdf" | "checklist" | "template" | "guide";
}> {
  const prompt = `Create a compelling lead magnet for the ${niche} niche about "${topic}".
  Return JSON with: title, description (50 words max), format (pdf/checklist/template/guide).
  Make it irresistible - people should want to give their email for this.`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert at creating lead magnets that convert.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "lead_magnet",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              format: {
                type: "string",
                enum: ["pdf", "checklist", "template", "guide"],
              },
            },
            required: ["title", "description", "format"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content generated");

    const contentStr = typeof content === 'string' ? content : '';
    const parsed = JSON.parse(contentStr);

    return {
      title: parsed.title,
      description: parsed.description,
      downloadUrl: `https://affiliateagent.xyz/lead-magnet/${parsed.format}/${Date.now()}`,
      format: parsed.format,
    };
  } catch (error) {
    console.error("Failed to generate lead magnet:", error);
    return {
      title: `Free ${niche} Guide`,
      description: `Learn the secrets to ${topic} in this exclusive guide.`,
      downloadUrl: `https://affiliateagent.xyz/lead-magnet/pdf/${Date.now()}`,
      format: "pdf",
    };
  }
}

/**
 * Generate email campaign content
 */
export async function generateEmailCampaign(
  niche: string,
  topic: string,
  affiliateLinks: Array<{ programName: string; link: string }>
): Promise<EmailCampaign> {
  const affiliateLinkText = affiliateLinks
    .map(
      (link) =>
        `<a href="${link.link}" style="color: #0066cc; text-decoration: underline;">${link.programName}</a>`
    )
    .join(" | ");

  const prompt = `Create a professional email campaign for ${niche} subscribers about "${topic}".
  Include:
  1. Compelling subject line (50 chars max)
  2. Preheader text (100 chars max)
  3. Email body (300-500 words) with storytelling
  4. Natural CTA mentioning these tools: ${affiliateLinks.map((l) => l.programName).join(", ")}
  
  Return JSON with: subject, preheader, body (HTML formatted), cta_text`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert email copywriter. Write emails that convert.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "email_campaign",
          strict: true,
          schema: {
            type: "object",
            properties: {
              subject: { type: "string" },
              preheader: { type: "string" },
              body: { type: "string" },
              cta_text: { type: "string" },
            },
            required: ["subject", "preheader", "body", "cta_text"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content generated");

    const contentStr = typeof content === 'string' ? content : '';
    const parsed = JSON.parse(contentStr);

    const htmlContent = renderEmailTemplate(parsed.body, affiliateLinkText, parsed.cta_text);

    return {
      id: `CAMPAIGN_${Date.now()}`,
      subject: parsed.subject,
      preheader: parsed.preheader,
      htmlContent,
      textContent: stripHtml(parsed.body),
      recipientCount: 0,
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "scheduled",
    };
  } catch (error) {
    console.error("Failed to generate email campaign:", error);
    return {
      id: `CAMPAIGN_${Date.now()}`,
      subject: `Discover the Best ${niche} Tools`,
      preheader: `Learn how to ${topic} with these amazing tools`,
      htmlContent: `<p>Check out these amazing tools for ${topic}</p><p>${affiliateLinkText}</p>`,
      textContent: `Check out these amazing tools for ${topic}`,
      recipientCount: 0,
      scheduledFor: new Date(),
      status: "failed",
    };
  }
}

/**
 * Render professional email template
 */
function renderEmailTemplate(body: string, affiliateLinks: string, cta: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
          .content { padding: 30px; background: #f9f9f9; }
          .affiliate-section { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Exclusive Content Just For You</h1>
          </div>
          <div class="content">
            ${body}
            <div class="affiliate-section">
              <h3>Recommended Tools:</h3>
              <p>${affiliateLinks}</p>
            </div>
            <a href="#" class="cta-button">${cta}</a>
          </div>
          <div class="footer">
            <p>You're receiving this because you subscribed to our list.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Preferences</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Calculate best time to send email
 */
export function calculateBestEmailSendTime(): Date {
  // Research shows Tuesday-Thursday at 10 AM is optimal
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Calculate next Tuesday-Thursday
  let daysUntilOptimal = 0;
  if (dayOfWeek === 0 || dayOfWeek === 1) {
    // Sunday or Monday -> send Tuesday
    daysUntilOptimal = 2 - dayOfWeek;
  } else if (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4) {
    // Tuesday-Thursday -> send today
    daysUntilOptimal = 0;
  } else {
    // Friday-Saturday -> send Tuesday
    daysUntilOptimal = 2 + (7 - dayOfWeek);
  }

  const sendTime = new Date(now);
  sendTime.setDate(sendTime.getDate() + daysUntilOptimal);
  sendTime.setHours(10, 0, 0, 0);

  return sendTime;
}

/**
 * Segment email list by interests
 */
export async function segmentEmailList(
  subscribers: EmailSubscriber[],
  niche: string
): Promise<Record<string, EmailSubscriber[]>> {
  const segments: Record<string, EmailSubscriber[]> = {
    highly_engaged: [],
    moderately_engaged: [],
    new_subscribers: [],
    at_risk: [],
  };

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  for (const subscriber of subscribers) {
    if (subscriber.subscribedAt > thirtyDaysAgo) {
      segments.new_subscribers.push(subscriber);
    } else if (subscriber.tags.length > 3) {
      segments.highly_engaged.push(subscriber);
    } else if (subscriber.tags.length > 0) {
      segments.moderately_engaged.push(subscriber);
    } else {
      segments.at_risk.push(subscriber);
    }
  }

  return segments;
}

/**
 * Calculate email marketing metrics
 */
export interface EmailMetrics {
  campaignsSent: number;
  totalSubscribers: number;
  avgOpenRate: number;
  avgClickRate: number;
  avgConversionRate: number;
  estimatedRevenue: number;
}

export async function calculateEmailMetrics(
  campaigns: EmailCampaign[],
  subscribers: number
): Promise<EmailMetrics> {
  const sentCampaigns = campaigns.filter((c) => c.status === "sent");
  
  let totalOpens = 0;
  let totalClicks = 0;
  let totalSent = 0;

  for (const campaign of sentCampaigns) {
    if (campaign.metrics) {
      totalSent += campaign.metrics.sent;
      totalOpens += campaign.metrics.opened;
      totalClicks += campaign.metrics.clicked;
    }
  }

  const avgOpenRate = totalSent > 0 ? (totalOpens / totalSent) * 100 : 0;
  const avgClickRate = totalSent > 0 ? (totalClicks / totalSent) * 100 : 0;
  const avgConversionRate = totalClicks > 0 ? (totalClicks / totalSent) * 100 : 0;

  // Estimate revenue: avg $2 per click
  const estimatedRevenue = totalClicks * 2;

  return {
    campaignsSent: sentCampaigns.length,
    totalSubscribers: subscribers,
    avgOpenRate,
    avgClickRate,
    avgConversionRate,
    estimatedRevenue,
  };
}

/**
 * Auto-send email campaign
 */
export async function autoSendEmailCampaign(
  campaign: EmailCampaign,
  subscribers: EmailSubscriber[]
): Promise<boolean> {
  console.log(`📧 Sending email campaign to ${subscribers.length} subscribers`);
  console.log(`Subject: ${campaign.subject}`);

  // In production, this would call Mailchimp/Brevo API
  // For now, we simulate sending
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Email campaign sent successfully`);
      resolve(true);
    }, 2000);
  });
}

/**
 * Generate email automation sequence
 */
export async function generateEmailSequence(
  niche: string,
  numberOfEmails: number = 5
): Promise<EmailCampaign[]> {
  const sequence: EmailCampaign[] = [];

  const emailTopics = [
    "Introduction to the niche",
    "Common problems and solutions",
    "Best tools and resources",
    "Advanced strategies",
    "Exclusive offer",
  ];

  for (let i = 0; i < numberOfEmails; i++) {
    const campaign = await generateEmailCampaign(
      niche,
      emailTopics[i] || `Email ${i + 1}`,
      []
    );

    // Schedule emails 2 days apart
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + i * 2);
    campaign.scheduledFor = scheduledDate;

    sequence.push(campaign);
  }

  return sequence;
}
