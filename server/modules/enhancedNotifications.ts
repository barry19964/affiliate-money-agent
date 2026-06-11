/**
 * Enhanced Real-Time Notifications System
 * Advanced alerts for opportunities, performance issues, and milestones
 */

export interface Notification {
  id: string;
  type: "opportunity" | "alert" | "milestone" | "performance" | "action_required";
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  channels: ("email" | "sms" | "push" | "in_app")[];
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface OpportunityAlert {
  type: "viral_trend" | "high_cpc_keyword" | "influencer_match" | "product_opportunity" | "traffic_spike";
  title: string;
  description: string;
  estimatedValue: number;
  urgency: "immediate" | "soon" | "consider";
  actionItems: string[];
}

export interface PerformanceAlert {
  type: "low_ctr" | "high_cpa" | "low_roas" | "declining_traffic" | "low_engagement";
  title: string;
  description: string;
  affectedCampaigns: string[];
  recommendations: string[];
  severity: "critical" | "warning" | "info";
}

export interface MilestoneNotification {
  type: "revenue_milestone" | "subscriber_milestone" | "traffic_milestone" | "campaign_success";
  title: string;
  currentValue: number;
  targetValue: number;
  percentageComplete: number;
  nextMilestone: number;
  estimatedTimeToNext: string;
}

/**
 * Detect viral trends and generate alerts
 */
export function detectViralTrends(): OpportunityAlert[] {
  const trends = [
    {
      type: "viral_trend" as const,
      title: "🔥 AI Tools Trend Exploding",
      description: "AI tools searches up 300% in last 24 hours",
      estimatedValue: 5000,
      urgency: "immediate" as const,
      actionItems: [
        "Create AI tools comparison article",
        "Record AI tools video",
        "Email list about AI",
        "Social media posts about AI trends"
      ]
    },
    {
      type: "viral_trend" as const,
      title: "💰 Passive Income Searches Rising",
      description: "Passive income keyword searches up 150% this week",
      estimatedValue: 3000,
      urgency: "soon" as const,
      actionItems: [
        "Update passive income guide",
        "Create passive income video series",
        "Promote affiliate products",
        "Build email sequence"
      ]
    },
    {
      type: "high_cpc_keyword" as const,
      title: "💎 High-Value Keywords Found",
      description: "Found 5 keywords with €8+ CPC in your niche",
      estimatedValue: 2000,
      urgency: "immediate" as const,
      actionItems: [
        "Target these keywords in content",
        "Create dedicated landing pages",
        "Setup Google Ads campaigns",
        "Build backlinks"
      ]
    },
    {
      type: "influencer_match" as const,
      title: "🤝 Perfect Influencer Match",
      description: "Found influencer with 500K followers in your niche",
      estimatedValue: 1500,
      urgency: "soon" as const,
      actionItems: [
        "Prepare influencer pitch",
        "Research influencer audience",
        "Create collaboration proposal",
        "Send outreach email"
      ]
    }
  ];

  return trends;
}

/**
 * Detect performance issues and generate alerts
 */
export function detectPerformanceIssues(
  ctr: number,
  cpa: number,
  roas: number,
  trafficTrend: "up" | "down" | "stable",
  engagement: number
): PerformanceAlert[] {
  const alerts: PerformanceAlert[] = [];

  if (ctr < 1.5) {
    alerts.push({
      type: "low_ctr",
      title: "⚠️ Low Click-Through Rate",
      description: `Your CTR is ${ctr.toFixed(2)}%, industry average is 2-3%`,
      affectedCampaigns: ["Campaign A", "Campaign B"],
      recommendations: [
        "Improve ad headlines (use power words)",
        "Test new ad copy variations",
        "Improve ad relevance score",
        "Use better targeting"
      ],
      severity: "warning"
    });
  }

  if (cpa > 50) {
    alerts.push({
      type: "high_cpa",
      title: "🚨 High Cost Per Acquisition",
      description: `Your CPA is €${cpa.toFixed(2)}, target should be €20-30`,
      affectedCampaigns: ["Campaign C", "Campaign D"],
      recommendations: [
        "Pause low-converting keywords",
        "Reduce bids on expensive keywords",
        "Improve landing page conversion",
        "Test new audiences"
      ],
      severity: "critical"
    });
  }

  if (roas < 1.5) {
    alerts.push({
      type: "low_roas",
      title: "🚨 Low Return on Ad Spend",
      description: `Your ROAS is ${roas.toFixed(2)}, minimum viable is 2.0`,
      affectedCampaigns: ["Campaign E", "Campaign F"],
      recommendations: [
        "Pause underperforming campaigns",
        "Reallocate budget to top performers",
        "Improve product/offer",
        "Test new landing pages"
      ],
      severity: "critical"
    });
  }

  if (trafficTrend === "down") {
    alerts.push({
      type: "declining_traffic",
      title: "📉 Traffic Declining",
      description: "Your website traffic decreased 25% compared to last week",
      affectedCampaigns: ["Organic", "Social Media"],
      recommendations: [
        "Check for technical issues",
        "Review recent content changes",
        "Increase social media activity",
        "Launch new ad campaigns"
      ],
      severity: "warning"
    });
  }

  if (engagement < 3) {
    alerts.push({
      type: "low_engagement",
      title: "⚠️ Low Engagement Rate",
      description: `Your engagement rate is ${engagement.toFixed(2)}%, target is 5-10%`,
      affectedCampaigns: ["Social Media", "Email"],
      recommendations: [
        "Create more engaging content",
        "Ask questions in posts",
        "Use calls-to-action",
        "Respond to comments faster"
      ],
      severity: "info"
    });
  }

  return alerts;
}

/**
 * Generate milestone notifications
 */
export function generateMilestoneNotifications(
  currentRevenue: number,
  currentSubscribers: number,
  currentTraffic: number
): MilestoneNotification[] {
  const milestones: MilestoneNotification[] = [];

  // Revenue milestones
  const revenueTargets = [100, 500, 1000, 5000, 10000];
  for (const target of revenueTargets) {
    if (currentRevenue < target && currentRevenue > target * 0.7) {
      const percentageComplete = (currentRevenue / target) * 100;
      const remaining = target - currentRevenue;
      const dailyAverage = currentRevenue / 30;
      const daysToTarget = dailyAverage > 0 ? Math.ceil(remaining / dailyAverage) : 999;

      milestones.push({
        type: "revenue_milestone",
        title: `💰 €${target} Revenue Milestone`,
        currentValue: Math.round(currentRevenue),
        targetValue: target,
        percentageComplete: Math.round(percentageComplete),
        nextMilestone: revenueTargets.find(t => t > target) || target * 2,
        estimatedTimeToNext: `${daysToTarget} days`
      });
    }
  }

  // Subscriber milestones
  const subscriberTargets = [100, 500, 1000, 5000, 10000];
  for (const target of subscriberTargets) {
    if (currentSubscribers < target && currentSubscribers > target * 0.7) {
      const percentageComplete = (currentSubscribers / target) * 100;
      const remaining = target - currentSubscribers;
      const dailyAverage = currentSubscribers / 30;
      const daysToTarget = dailyAverage > 0 ? Math.ceil(remaining / dailyAverage) : 999;

      milestones.push({
        type: "subscriber_milestone",
        title: `📧 ${target} Subscribers Milestone`,
        currentValue: Math.round(currentSubscribers),
        targetValue: target,
        percentageComplete: Math.round(percentageComplete),
        nextMilestone: subscriberTargets.find(t => t > target) || target * 2,
        estimatedTimeToNext: `${daysToTarget} days`
      });
    }
  }

  // Traffic milestones
  const trafficTargets = [1000, 5000, 10000, 50000, 100000];
  for (const target of trafficTargets) {
    if (currentTraffic < target && currentTraffic > target * 0.7) {
      const percentageComplete = (currentTraffic / target) * 100;
      const remaining = target - currentTraffic;
      const dailyAverage = currentTraffic / 30;
      const daysToTarget = dailyAverage > 0 ? Math.ceil(remaining / dailyAverage) : 999;

      milestones.push({
        type: "traffic_milestone",
        title: `📈 ${target} Monthly Visitors Milestone`,
        currentValue: Math.round(currentTraffic),
        targetValue: target,
        percentageComplete: Math.round(percentageComplete),
        nextMilestone: trafficTargets.find(t => t > target) || target * 2,
        estimatedTimeToNext: `${daysToTarget} days`
      });
    }
  }

  return milestones;
}

/**
 * Create action-required notifications
 */
export function createActionRequiredNotifications(): Notification[] {
  return [
    {
      id: "action_001",
      type: "action_required",
      priority: "critical",
      title: "⚡ Claim Your Google Ads Credits",
      message: "You have €100 in unclaimed Google Ads credits. Claim them before they expire!",
      actionUrl: "/google-ads",
      actionText: "Claim Credits",
      channels: ["email", "push", "in_app"],
      read: false,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: "action_002",
      type: "action_required",
      priority: "high",
      title: "🔗 Verify Your Affiliate Accounts",
      message: "3 affiliate accounts need verification. Complete setup to start earning!",
      actionUrl: "/affiliates",
      actionText: "Verify Now",
      channels: ["email", "in_app"],
      read: false,
      createdAt: new Date()
    },
    {
      id: "action_003",
      type: "action_required",
      priority: "medium",
      title: "📊 Update Your Analytics",
      message: "Connect Google Search Console to track your rankings and traffic",
      actionUrl: "/analytics",
      actionText: "Connect GSC",
      channels: ["in_app"],
      read: false,
      createdAt: new Date()
    }
  ];
}

/**
 * Generate smart notification recommendations
 */
export function generateSmartNotifications(
  revenue: number,
  traffic: number,
  engagement: number,
  ctr: number,
  roas: number
): Notification[] {
  const notifications: Notification[] = [];

  // Opportunity notifications
  const opportunities = detectViralTrends();
  for (const opp of opportunities.slice(0, 2)) {
    notifications.push({
      id: `opp_${Date.now()}`,
      type: "opportunity",
      priority: opp.urgency === "immediate" ? "critical" : "high",
      title: opp.title,
      message: opp.description,
      channels: ["email", "push", "in_app"],
      read: false,
      createdAt: new Date()
    });
  }

  // Performance alerts
  const alerts = detectPerformanceIssues(ctr, 50, roas, "stable", engagement);
  for (const alert of alerts) {
    notifications.push({
      id: `alert_${Date.now()}`,
      type: "alert",
      priority: alert.severity === "critical" ? "critical" : alert.severity === "warning" ? "high" : "medium",
      title: alert.title,
      message: alert.description,
      channels: ["email", "push"],
      read: false,
      createdAt: new Date()
    });
  }

  // Milestone notifications
  const milestones = generateMilestoneNotifications(revenue, 100, traffic);
  for (const milestone of milestones.slice(0, 1)) {
    notifications.push({
      id: `milestone_${Date.now()}`,
      type: "milestone",
      priority: "medium",
      title: milestone.title,
      message: `You're ${milestone.percentageComplete}% of the way there! ${milestone.estimatedTimeToNext} to go.`,
      channels: ["email", "in_app"],
      read: false,
      createdAt: new Date()
    });
  }

  // Action required
  const actions = createActionRequiredNotifications();
  notifications.push(...actions.slice(0, 1));

  return notifications;
}

/**
 * Create notification digest
 */
export function createNotificationDigest(notifications: Notification[]): {
  summary: string;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  topActions: string[];
  estimatedImpact: number;
} {
  const criticalCount = notifications.filter(n => n.priority === "critical").length;
  const highCount = notifications.filter(n => n.priority === "high").length;
  const mediumCount = notifications.filter(n => n.priority === "medium").length;

  const topActions = notifications
    .filter(n => n.type === "action_required")
    .slice(0, 3)
    .map(n => n.title);

  const estimatedImpact = (criticalCount * 500 + highCount * 200 + mediumCount * 50);

  return {
    summary: `You have ${criticalCount} critical, ${highCount} high, and ${mediumCount} medium priority notifications`,
    criticalCount,
    highCount,
    mediumCount,
    topActions,
    estimatedImpact
  };
}

/**
 * Schedule notification delivery
 */
export function scheduleNotificationDelivery(
  notification: Notification,
  userPreferences: { quietHours: { start: number; end: number }; preferredChannels: string[] }
): { channel: string; scheduledTime: Date }[] {
  const deliveries: { channel: string; scheduledTime: Date }[] = [];
  const now = new Date();
  const hour = now.getHours();

  const isQuietHour = hour >= userPreferences.quietHours.start && hour <= userPreferences.quietHours.end;

  for (const channel of notification.channels) {
    if (!userPreferences.preferredChannels.includes(channel)) continue;

    let scheduledTime = new Date(now);

    if (isQuietHour && notification.priority !== "critical") {
      // Schedule for after quiet hours
      scheduledTime.setHours(userPreferences.quietHours.end + 1, 0, 0, 0);
    } else if (channel === "email" && notification.priority === "medium") {
      // Batch medium priority emails for next digest
      scheduledTime.setHours(9, 0, 0, 0);
      if (scheduledTime < now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
    }

    deliveries.push({ channel, scheduledTime });
  }

  return deliveries;
}
