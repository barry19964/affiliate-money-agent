import { invokeLLM } from "../_core/llm";

interface EmailTemplate {
  subject: string;
  previewText: string;
  body: string;
  ctaText: string;
  ctaLink: string;
}

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  unsubscribed: boolean;
}

/**
 * Generiert eine Email-Kampagne aus Blog-Inhalten
 */
export async function generateEmailCampaign(
  blogTitle: string,
  blogExcerpt: string,
  blogLink: string,
  affiliateLink: string
): Promise<EmailTemplate> {
  const prompt = `Generate a professional email campaign for this blog article:

Title: "${blogTitle}"
Excerpt: "${blogExcerpt}"
Blog Link: ${blogLink}
Affiliate Link: ${affiliateLink}

Requirements:
- Subject line: Compelling, under 50 characters, with curiosity gap
- Preview text: 50-100 characters, enticing
- Body: 200-300 words, benefit-focused, with clear CTA
- CTA Text: Action-oriented, e.g., "Get Instant Access", "Learn More"
- Include urgency and social proof

Format as JSON with keys: subject, previewText, body, ctaText, ctaLink`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an email marketing expert who creates high-converting email campaigns. Focus on benefits, urgency, and clear CTAs. Make every word count.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  try {
    const content = typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    return JSON.parse(jsonMatch[0]) as EmailTemplate;
  } catch (error) {
    console.error("Failed to generate email campaign:", error);
    throw error;
  }
}

/**
 * Erstellt eine HTML-Email aus dem Template
 */
export function renderEmailHTML(template: EmailTemplate): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
    .content { padding: 20px 0; }
    .cta-button { 
      display: inline-block; 
      background: #667eea; 
      color: white; 
      padding: 12px 24px; 
      border-radius: 4px; 
      text-decoration: none; 
      font-weight: bold;
      margin: 20px 0;
    }
    .footer { color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Affiliate Money Agent</h1>
    </div>
    <div class="content">
      ${template.body.split('\n').map((p) => `<p>${p}</p>`).join('')}
      <a href="${template.ctaLink}" class="cta-button">${template.ctaText}</a>
    </div>
    <div class="footer">
      <p>© 2026 Affiliate Money Agent. All rights reserved.</p>
      <p><a href="#">Unsubscribe</a> | <a href="#">Preferences</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Segmentiert Subscriber basierend auf Verhalten
 */
export function segmentSubscribers(
  subscribers: Subscriber[],
  criteria: "active" | "inactive" | "new"
): Subscriber[] {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  switch (criteria) {
    case "active":
      return subscribers.filter((s) => s.subscribedAt > thirtyDaysAgo && !s.unsubscribed);
    case "inactive":
      return subscribers.filter((s) => s.subscribedAt < thirtyDaysAgo && !s.unsubscribed);
    case "new":
      return subscribers.filter((s) => s.subscribedAt > sevenDaysAgo && !s.unsubscribed);
    default:
      return subscribers;
  }
}

/**
 * Berechnet die beste Zeit zum Email-Versand
 */
export function getBestEmailSendTime(): Date {
  const now = new Date();
  const sendTime = new Date(now);

  // Beste Email-Versandzeit: Dienstag-Donnerstag, 9-11 Uhr
  const dayOfWeek = sendTime.getDay();
  const hour = sendTime.getHours();

  // Wenn es Wochenende ist, verschiebe auf Montag
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const daysToAdd = dayOfWeek === 0 ? 1 : 2;
    sendTime.setDate(sendTime.getDate() + daysToAdd);
    sendTime.setHours(9, 0, 0, 0);
  } else if (hour < 9) {
    // Wenn es vor 9 Uhr ist, versende um 9 Uhr
    sendTime.setHours(9, 0, 0, 0);
  } else if (hour < 11) {
    // Wenn es zwischen 9-11 Uhr ist, versende sofort
    return now;
  } else {
    // Sonst verschiebe auf morgen um 9 Uhr
    sendTime.setDate(sendTime.getDate() + 1);
    sendTime.setHours(9, 0, 0, 0);
  }

  return sendTime;
}

/**
 * Berechnet die Email-Engagement-Metriken
 */
export interface EmailMetrics {
  sent: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
}

export function calculateEmailMetrics(
  sent: number,
  opened: number,
  clicked: number,
  unsubscribed: number
): EmailMetrics {
  return {
    sent,
    opened,
    clicked,
    unsubscribed,
    openRate: sent > 0 ? (opened / sent) * 100 : 0,
    clickRate: opened > 0 ? (clicked / opened) * 100 : 0,
  };
}
