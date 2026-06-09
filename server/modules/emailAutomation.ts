/**
 * Email Automation Module
 * Integrates with Mailchimp to automate email sequences and subscriber management
 */

export interface MailchimpSubscriber {
  email: string;
  firstName: string;
  lastName: string;
  tags: string[];
  mergeFields: Record<string, string>;
}

export interface MailchimpCampaign {
  id: string;
  name: string;
  subject: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  listId: string;
  segmentId?: string;
  content: string;
  scheduledTime?: Date;
  status: "draft" | "scheduled" | "sent";
}

export interface EmailAutomationSequence {
  id: string;
  name: string;
  triggerId: string;
  emails: AutomationEmail[];
  status: "active" | "paused" | "archived";
}

export interface AutomationEmail {
  id: string;
  subject: string;
  content: string;
  delayMinutes: number;
  ctaLink: string;
  ctaText: string;
}

// ============= MAILCHIMP API HELPERS =============

export async function addSubscriberToMailchimp(
  subscriber: MailchimpSubscriber,
  listId: string,
  apiKey: string
): Promise<{ id: string; email: string; status: string }> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: subscriber.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscriber.firstName,
        LNAME: subscriber.lastName,
        ...subscriber.mergeFields,
      },
      tags: subscriber.tags,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mailchimp API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    email: data.email_address,
    status: data.status,
  };
}

export async function createMailchimpCampaign(
  campaign: MailchimpCampaign,
  apiKey: string
): Promise<{ id: string; name: string; status: string }> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/campaigns`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "regular",
      recipients: {
        list_id: campaign.listId,
        segment_opts: campaign.segmentId ? { saved_segment_id: campaign.segmentId } : undefined,
      },
      settings: {
        subject_line: campaign.subject,
        from_name: campaign.fromName,
        reply_to: campaign.replyTo,
        preview_text: campaign.subject.substring(0, 50),
      },
      content: {
        html: campaign.content,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Mailchimp API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    name: data.settings.title,
    status: data.status,
  };
}

export async function scheduleMailchimpCampaign(
  campaignId: string,
  scheduleTime: Date,
  apiKey: string
): Promise<{ status: string; scheduledTime: string }> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/schedule`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      schedule_time: scheduleTime.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Mailchimp API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    status: data.status,
    scheduledTime: data.schedule_time,
  };
}

// ============= EMAIL SEQUENCE GENERATION =============

export function generateLeadMagnetEmailSequence(
  leadMagnetTitle: string,
  niche: string
): EmailAutomationSequence {
  const sequences: Record<string, AutomationEmail[]> = {
    "AI Tools & Automation": [
      {
        id: "1",
        subject: "🚀 Your AI Tools Guide is Ready!",
        content: `Hi {{FNAME}},

Thanks for downloading "${leadMagnetTitle}". Inside, you'll find the 10 best AI tools that can save you 10 hours per week.

Start with the first tool today and let me know how it goes!

Best,
Affiliate Money Agent`,
        delayMinutes: 5,
        ctaText: "Download Now",
        ctaLink: "/lead-magnets/ai-tools-guide.pdf",
      },
      {
        id: "2",
        subject: "💡 The #1 AI Tool I Use Every Day",
        content: `Hi {{FNAME}},

After using these AI tools for years, I've found one that stands out above the rest. It's saved me hundreds of hours.

Check out this detailed review and see if it's right for you.

Best,
Affiliate Money Agent`,
        delayMinutes: 1440, // 1 day
        ctaText: "See the Review",
        ctaLink: "/ai-tools/best-tool",
      },
      {
        id: "3",
        subject: "⚡ How to Make Money with AI Tools",
        content: `Hi {{FNAME}},

Most people don't realize you can actually make money using AI tools. Here are 5 proven ways to turn your AI skills into income.

Some people are making €5,000+ per month!

Best,
Affiliate Money Agent`,
        delayMinutes: 4320, // 3 days
        ctaText: "Learn the Strategies",
        ctaLink: "/ai-tools/monetization",
      },
      {
        id: "4",
        subject: "🎁 Exclusive: AI Tools Discount (24 hours only)",
        content: `Hi {{FNAME}},

I negotiated an exclusive discount for my subscribers. Get 40% off the premium AI tools bundle.

This offer expires in 24 hours!

Best,
Affiliate Money Agent`,
        delayMinutes: 7200, // 5 days
        ctaText: "Claim Your Discount",
        ctaLink: "/ai-tools/discount",
      },
      {
        id: "5",
        subject: "📊 See How Others Are Using AI to Scale",
        content: `Hi {{FNAME}},

Real case studies from people using AI tools to grow their businesses. One person went from €0 to €10,000/month in 3 months.

Here's how they did it.

Best,
Affiliate Money Agent`,
        delayMinutes: 10080, // 7 days
        ctaText: "Read the Case Studies",
        ctaLink: "/ai-tools/case-studies",
      },
    ],
    "Crypto & Web3": [
      {
        id: "1",
        subject: "🎉 Your Crypto Checklist is Ready!",
        content: `Hi {{FNAME}},

Welcome! Your complete crypto investment checklist is attached. Follow these steps and you'll be set up to start investing safely and securely.

Best,
Affiliate Money Agent`,
        delayMinutes: 5,
        ctaText: "Download Checklist",
        ctaLink: "/lead-magnets/crypto-checklist.pdf",
      },
      {
        id: "2",
        subject: "💰 The Best Crypto Exchange for Beginners",
        content: `Hi {{FNAME}},

Not all crypto exchanges are created equal. I've tested 10+ exchanges and found the best one for beginners.

Low fees, great security, and easy to use.

Best,
Affiliate Money Agent`,
        delayMinutes: 1440,
        ctaText: "See My Review",
        ctaLink: "/crypto/best-exchange",
      },
      {
        id: "3",
        subject: "🚀 How to Earn Passive Income with Crypto",
        content: `Hi {{FNAME}},

Did you know you can earn 5-20% APY just by holding crypto? Here's how staking works and which coins offer the best returns right now.

Best,
Affiliate Money Agent`,
        delayMinutes: 4320,
        ctaText: "Learn Staking",
        ctaLink: "/crypto/staking-guide",
      },
      {
        id: "4",
        subject: "⚠️ Avoid These Common Crypto Mistakes",
        content: `Hi {{FNAME}},

Most beginners make these 5 critical mistakes that cost them thousands. I made them too! Here's how to avoid them.

Best,
Affiliate Money Agent`,
        delayMinutes: 7200,
        ctaText: "See the Mistakes",
        ctaLink: "/crypto/mistakes-to-avoid",
      },
      {
        id: "5",
        subject: "🎁 Exclusive: €50 Bonus on Your First Trade",
        content: `Hi {{FNAME}},

My exclusive partner is offering €50 bonus for new users. This is only available for my subscribers.

Claim it now!

Best,
Affiliate Money Agent`,
        delayMinutes: 10080,
        ctaText: "Get Your Bonus",
        ctaLink: "/crypto/bonus-offer",
      },
    ],
  };

  const emails = sequences[niche] || sequences["AI Tools & Automation"];

  return {
    id: `seq-${Date.now()}`,
    name: `Email Sequence for ${leadMagnetTitle}`,
    triggerId: "lead-magnet-signup",
    emails,
    status: "active",
  };
}

// ============= AUTOMATION WORKFLOW =============

export async function setupAutomationWorkflow(
  leadMagnetId: string,
  listId: string,
  apiKey: string
): Promise<{
  sequenceId: string;
  status: string;
  emailCount: number;
}> {
  // This would integrate with Mailchimp's automation workflows
  // For now, we return a mock response

  return {
    sequenceId: `auto-${leadMagnetId}`,
    status: "active",
    emailCount: 5,
  };
}

// ============= EMAIL TRACKING =============

export interface EmailMetrics {
  campaignId: string;
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
  revenue: number;
}

export async function getEmailMetrics(
  campaignId: string,
  apiKey: string
): Promise<EmailMetrics> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/reports/${campaignId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      campaignId,
      sent: data.emails_sent,
      opened: data.opens.unique_opens,
      clicked: data.clicks.unique_clicks,
      bounced: data.bounces.hard_bounces + data.bounces.soft_bounces,
      unsubscribed: data.unsubscribed,
      openRate: (data.opens.unique_opens / data.emails_sent) * 100,
      clickRate: (data.clicks.unique_clicks / data.emails_sent) * 100,
      revenue: 0, // Would need to integrate with revenue tracking
    };
  } catch (error) {
    console.error("Error fetching email metrics:", error);
    return {
      campaignId,
      sent: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0,
      clickRate: 0,
      revenue: 0,
    };
  }
}

// ============= SUBSCRIBER MANAGEMENT =============

export async function getSubscriberCount(listId: string, apiKey: string): Promise<number> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.stats.member_count;
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return 0;
  }
}

export async function segmentSubscribers(
  listId: string,
  segmentName: string,
  criteria: Record<string, unknown>,
  apiKey: string
): Promise<{ segmentId: string; name: string; status: string }> {
  const dataCenter = apiKey.split("-")[1];
  const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/segments`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: segmentName,
      static_segment: [],
      options: criteria,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mailchimp API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    segmentId: data.id,
    name: data.name,
    status: "created",
  };
}
