export interface VideoContent {
  id: string;
  title: string;
  sourceArticle: string;
  duration: number; // in seconds
  platform: "youtube" | "tiktok" | "instagram" | "podcast";
  status: "draft" | "published" | "monetized";
  views: number;
  likes: number;
  shares: number;
  revenue: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: number;
  platform: "spotify" | "apple" | "youtube" | "custom";
  status: "draft" | "published" | "monetized";
  listeners: number;
  sponsorships: number;
  revenue: number;
}

/**
 * Generiert Video-Inhalte aus Blog-Artikeln
 */
export function generateVideoFromArticle(
  articleTitle: string,
  articleContent: string
): {
  videoScript: string;
  keyPoints: string[];
  duration: number;
  thumbnailIdea: string;
} {
  const keyPoints = articleContent.split(".").slice(0, 5);
  const videoScript = `
    INTRO (0:00-0:15):
    "Hey everyone! Today we're diving into: ${articleTitle}. Stay tuned!"
    
    MAIN CONTENT (0:15-${Math.min(10, keyPoints.length)}:00):
    ${keyPoints.map((point, i) => `Point ${i + 1}: ${point.trim()}`).join("\n")}
    
    CTA (${Math.min(10, keyPoints.length)}:00-${Math.min(10, keyPoints.length) + 0.5}:00):
    "Don't forget to like, subscribe, and check the links in the description!"
    
    OUTRO (${Math.min(10, keyPoints.length) + 0.5}:00-${Math.min(10, keyPoints.length) + 1}:00):
    "Thanks for watching! See you in the next video!"
  `;

  return {
    videoScript,
    keyPoints: keyPoints.map((p) => p.trim()).filter((p) => p.length > 0),
    duration: Math.min(10, keyPoints.length) * 60,
    thumbnailIdea: `Bold text: "${articleTitle.substring(0, 30)}..." with eye-catching colors`,
  };
}

/**
 * Berechnet YouTube-Monetarisierungspotential
 */
export function calculateYouTubeRevenue(
  monthlyViews: number,
  avgCPM: number = 5
): {
  monthlyRevenue: number;
  annualRevenue: number;
  requiredViews: number;
} {
  const monthlyRevenue = (monthlyViews / 1000) * avgCPM;
  const annualRevenue = monthlyRevenue * 12;
  const requiredViews = (1000 * 1000) / avgCPM; // Views needed for €1000/month

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    annualRevenue: Math.round(annualRevenue),
    requiredViews: Math.round(requiredViews),
  };
}

/**
 * Generiert Podcast-Sponsorship-Opportunities
 */
export function generatePodcastSponsorships(): {
  company: string;
  budget: string;
  minListeners: number;
  placement: string;
}[] {
  return [
    {
      company: "Skillshare",
      budget: "€500-1000 per episode",
      minListeners: 5000,
      placement: "Mid-roll sponsorship",
    },
    {
      company: "Udemy",
      budget: "€300-600 per episode",
      minListeners: 3000,
      placement: "Host-read ad",
    },
    {
      company: "Stripe",
      budget: "€1000-2000 per episode",
      minListeners: 10000,
      placement: "Premium sponsorship",
    },
    {
      company: "ConvertKit",
      budget: "€400-800 per episode",
      minListeners: 5000,
      placement: "Native ad read",
    },
  ];
}

/**
 * Generiert Podcast-Episode-Templates
 */
export function generatePodcastTemplate(topic: string): {
  section: string;
  duration: string;
  content: string;
}[] {
  return [
    {
      section: "Intro",
      duration: "2 min",
      content: `Welcome to the AI Insights Podcast! Today we're discussing: ${topic}`,
    },
    {
      section: "Main Discussion",
      duration: "20 min",
      content: `Deep dive into ${topic} with practical insights and examples`,
    },
    {
      section: "Sponsor Segment",
      duration: "2 min",
      content: "Featured sponsor message (€500-2000 per episode)",
    },
    {
      section: "Q&A",
      duration: "8 min",
      content: "Answer listener questions about the topic",
    },
    {
      section: "Call to Action",
      duration: "2 min",
      content: "Subscribe, share, and check affiliate links in show notes",
    },
  ];
}

/**
 * Berechnet Multi-Platform-Video-Strategie
 */
export function calculateMultiPlatformStrategy(
  videoLength: number
): {
  platform: string;
  format: string;
  duration: number;
  estimatedReach: number;
  monetizationMethod: string;
}[] {
  return [
    {
      platform: "YouTube",
      format: "Full video",
      duration: videoLength,
      estimatedReach: 100000,
      monetizationMethod: "AdSense + Affiliate Links",
    },
    {
      platform: "TikTok",
      format: "Shorts (15-60 sec)",
      duration: 30,
      estimatedReach: 500000,
      monetizationMethod: "Creator Fund + Affiliate",
    },
    {
      platform: "Instagram",
      format: "Reels (15-90 sec)",
      duration: 45,
      estimatedReach: 200000,
      monetizationMethod: "Bonuses + Affiliate",
    },
    {
      platform: "Podcast",
      format: "Full episode",
      duration: videoLength / 60,
      estimatedReach: 50000,
      monetizationMethod: "Sponsorships + Affiliate",
    },
  ];
}

/**
 * Generiert Video-SEO-Optimierungen
 */
export function generateVideoSEO(title: string, topic: string): {
  element: string;
  value: string;
}[] {
  return [
    {
      element: "Title",
      value: `${title} - Complete Guide [2024]`,
    },
    {
      element: "Description",
      value: `Learn about ${topic}. This video covers everything you need to know...`,
    },
    {
      element: "Tags",
      value: `${topic}, AI, tutorial, how-to, ${topic.toLowerCase()}, 2024`,
    },
    {
      element: "Thumbnail",
      value: "Eye-catching design with bold text and contrasting colors",
    },
    {
      element: "Playlist",
      value: `${topic} Series - helps with watch time and recommendations`,
    },
  ];
}
