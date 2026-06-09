/**
 * Content Scheduling Module
 * Manages blog posts, social media, and email scheduling
 */

export interface ScheduledContent {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email';
  platform?: string;
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  content: string;
  keywords?: string[];
  affiliateLinks?: string[];
  estimatedViews?: number;
  estimatedRevenue?: number;
}

export interface ContentCalendar {
  month: number;
  year: number;
  totalScheduled: number;
  byType: {
    blog: number;
    social: number;
    email: number;
  };
  byPlatform?: {
    tiktok: number;
    instagram: number;
    linkedin: number;
    twitter: number;
  };
}

export function generateContentSchedule(days: number = 30): ScheduledContent[] {
  const schedule: ScheduledContent[] = [];
  const types: ('blog' | 'social' | 'email')[] = ['blog', 'social', 'email'];
  const platforms = ['tiktok', 'instagram', 'linkedin', 'twitter'];
  const keywords = [
    'AI Marketing',
    'Affiliate Money',
    'Passive Income',
    'Digital Marketing',
    'Content Strategy',
    'Email Marketing',
    'Social Media Growth',
    'SEO Tips'
  ];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    // Blog post every 3 days
    if (i % 3 === 0) {
      schedule.push({
        id: `content_blog_${i}`,
        title: `${keywords[i % keywords.length]} - Vollständiger Guide`,
        type: 'blog',
        scheduledDate: date,
        status: i < 5 ? 'published' : i < 10 ? 'scheduled' : 'draft',
        content: `Erfahre alles über ${keywords[i % keywords.length]}...`,
        keywords: [keywords[i % keywords.length], 'Tutorial', 'Guide'],
        affiliateLinks: ['stripe.com', 'gumroad.com', 'appsumo.com'],
        estimatedViews: Math.floor(Math.random() * 1000) + 100,
        estimatedRevenue: Math.floor(Math.random() * 50) + 10
      });
    }

    // Social media posts daily
    if (i % 1 === 0) {
      const platform = platforms[i % platforms.length];
      schedule.push({
        id: `content_social_${i}`,
        title: `${platform.toUpperCase()} Post - ${keywords[i % keywords.length]}`,
        type: 'social',
        platform,
        scheduledDate: date,
        status: i < 5 ? 'published' : i < 10 ? 'scheduled' : 'draft',
        content: `🚀 Tipps zu ${keywords[i % keywords.length]}...`,
        keywords: [keywords[i % keywords.length], 'Tips', 'Tricks'],
        affiliateLinks: ['stripe.com'],
        estimatedViews: Math.floor(Math.random() * 5000) + 500,
        estimatedRevenue: Math.floor(Math.random() * 100) + 20
      });
    }

    // Email campaigns every 7 days
    if (i % 7 === 0) {
      schedule.push({
        id: `content_email_${i}`,
        title: `Email Campaign - ${keywords[i % keywords.length]}`,
        type: 'email',
        scheduledDate: date,
        status: i < 5 ? 'published' : i < 10 ? 'scheduled' : 'draft',
        content: `Hallo Subscriber, heute möchte ich dir ${keywords[i % keywords.length]} zeigen...`,
        keywords: [keywords[i % keywords.length], 'Email', 'Offer'],
        affiliateLinks: ['gumroad.com', 'appsumo.com', 'udemy.com'],
        estimatedViews: Math.floor(Math.random() * 2000) + 100,
        estimatedRevenue: Math.floor(Math.random() * 200) + 50
      });
    }
  }

  return schedule;
}

export function generateContentCalendar(month: number, year: number): ContentCalendar {
  const schedule = generateContentSchedule(30);
  
  const byType = {
    blog: schedule.filter(c => c.type === 'blog').length,
    social: schedule.filter(c => c.type === 'social').length,
    email: schedule.filter(c => c.type === 'email').length
  };

  const byPlatform = {
    tiktok: schedule.filter(c => c.platform === 'tiktok').length,
    instagram: schedule.filter(c => c.platform === 'instagram').length,
    linkedin: schedule.filter(c => c.platform === 'linkedin').length,
    twitter: schedule.filter(c => c.platform === 'twitter').length
  };

  return {
    month,
    year,
    totalScheduled: schedule.length,
    byType,
    byPlatform
  };
}

export function getScheduleStats(schedule: ScheduledContent[]): {
  total: number;
  published: number;
  scheduled: number;
  draft: number;
  failed: number;
  totalEstimatedViews: number;
  totalEstimatedRevenue: number;
} {
  return {
    total: schedule.length,
    published: schedule.filter(c => c.status === 'published').length,
    scheduled: schedule.filter(c => c.status === 'scheduled').length,
    draft: schedule.filter(c => c.status === 'draft').length,
    failed: schedule.filter(c => c.status === 'failed').length,
    totalEstimatedViews: schedule.reduce((sum, c) => sum + (c.estimatedViews || 0), 0),
    totalEstimatedRevenue: schedule.reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0)
  };
}

export function generateSchedulingTips(): string[] {
  return [
    'Poste täglich auf Social Media für maximale Reichweite',
    'Veröffentliche Blog-Posts um 9 Uhr morgens für beste Rankings',
    'Sende Emails um 10 Uhr morgens für höchste Open Rates',
    'Nutze Evergreen Content für kontinuierliche Verdienste',
    'Plane 30 Tage im Voraus für konsistente Veröffentlichungen',
    'Teste verschiedene Posting-Zeiten für deine Audience',
    'Nutze Keywords in Titeln für bessere SEO',
    'Integriere Affiliate-Links natürlich in den Content',
    'Verfolge Performance und optimiere basierend auf Daten',
    'Automatisiere Posting mit Tools wie Buffer oder Later'
  ];
}

export function generateContentPerformanceMetrics(schedule: ScheduledContent[]): {
  type: string;
  avgViews: number;
  avgRevenue: number;
  bestPerformer: ScheduledContent | null;
}[] {
  const metrics = [];

  const types = ['blog', 'social', 'email'];
  
  for (const type of types) {
    const typeContent = schedule.filter(c => c.type === type);
    const avgViews = typeContent.length > 0 
      ? typeContent.reduce((sum, c) => sum + (c.estimatedViews || 0), 0) / typeContent.length 
      : 0;
    const avgRevenue = typeContent.length > 0 
      ? typeContent.reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0) / typeContent.length 
      : 0;
    const bestPerformer = typeContent.reduce((best, current) => 
      (current.estimatedRevenue || 0) > (best.estimatedRevenue || 0) ? current : best, 
      typeContent[0] || null
    );

    metrics.push({
      type,
      avgViews: Math.round(avgViews),
      avgRevenue: Math.round(avgRevenue * 100) / 100,
      bestPerformer
    });
  }

  return metrics;
}

export function generateOptimalPostingTimes(): { platform: string; time: string; reason: string }[] {
  return [
    { platform: 'TikTok', time: '18:00-22:00', reason: 'Peak User Activity' },
    { platform: 'Instagram', time: '11:00-13:00', reason: 'Lunch Break Scrolling' },
    { platform: 'LinkedIn', time: '08:00-10:00', reason: 'Morning Commute' },
    { platform: 'Twitter', time: '09:00-17:00', reason: 'Business Hours' },
    { platform: 'Email', time: '10:00', reason: 'Morning Open Rates' },
    { platform: 'Blog', time: '09:00', reason: 'SEO Boost' }
  ];
}

export function calculateContentROI(schedule: ScheduledContent[]): {
  totalContent: number;
  totalEstimatedRevenue: number;
  avgRevenuePerContent: number;
  bestChannel: string;
  recommendation: string;
} {
  const stats = getScheduleStats(schedule);
  const totalRevenue = stats.totalEstimatedRevenue;
  const avgRevenue = totalRevenue / schedule.length;

  const byType = {
    blog: schedule.filter(c => c.type === 'blog').reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0),
    social: schedule.filter(c => c.type === 'social').reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0),
    email: schedule.filter(c => c.type === 'email').reduce((sum, c) => sum + (c.estimatedRevenue || 0), 0)
  };

  const bestChannel = Object.entries(byType).reduce((a, b) => b[1] > a[1] ? b : a)[0];

  return {
    totalContent: schedule.length,
    totalEstimatedRevenue: Math.round(totalRevenue * 100) / 100,
    avgRevenuePerContent: Math.round(avgRevenue * 100) / 100,
    bestChannel,
    recommendation: `Konzentriere dich auf ${bestChannel} für maximale Verdienste. Poste täglich auf Social Media und wöchentlich Blog-Posts.`
  };
}
