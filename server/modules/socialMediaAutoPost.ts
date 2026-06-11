import { invokeLLM } from "../_core/llm";

interface SocialMediaPost {
  platform: "twitter" | "linkedin" | "instagram" | "tiktok";
  content: string;
  hashtags: string[];
  imageUrl?: string;
  scheduledFor?: Date;
}

interface PostingResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
}

/**
 * Generiert Social Media Posts aus Blog-Inhalten
 */
export async function generateSocialMediaPosts(
  blogTitle: string,
  blogExcerpt: string,
  affiliateLink: string
): Promise<SocialMediaPost[]> {
  const prompt = `Generate 4 different social media posts (one for each platform: Twitter, LinkedIn, Instagram, TikTok) based on this blog article:

Title: "${blogTitle}"
Excerpt: "${blogExcerpt}"

Requirements:
- Twitter: 280 characters max, engaging, with call-to-action
- LinkedIn: Professional tone, 1300 characters max, thought leadership
- Instagram: Casual, trendy, 2200 characters max, with emojis
- TikTok: Viral, trendy, 150 characters max, with trending hashtags

Include this affiliate link naturally: ${affiliateLink}

Format your response as JSON array with objects containing: platform, content, hashtags (array)`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a social media expert who creates viral, platform-specific content that drives affiliate conversions. Generate posts that are authentic, engaging, and optimized for each platform's algorithm.",
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

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const posts = JSON.parse(jsonMatch[0]) as Array<{
      platform: "twitter" | "linkedin" | "instagram" | "tiktok";
      content: string;
      hashtags: string[];
    }>;

    return posts.map((post) => ({
      ...post,
      scheduledFor: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000), // Random time within 24h
    }));
  } catch (error) {
    console.error("Failed to parse social media posts:", error);
    return [];
  }
}

/**
 * Simuliert das Posten auf Social Media Plattformen
 * In der Produktion würde dies echte API-Aufrufe machen
 */
export async function postToSocialMedia(
  posts: SocialMediaPost[]
): Promise<PostingResult[]> {
  const results: PostingResult[] = [];

  for (const post of posts) {
    try {
      // Simulierte API-Aufrufe
      // In der Produktion würden echte API-Clients hier verwendet
      const result = await simulatePostToAPI(post);
      results.push(result);
    } catch (error) {
      results.push({
        platform: post.platform,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return results;
}

/**
 * Simuliert einen API-Aufruf zu einer Social Media Plattform
 */
async function simulatePostToAPI(post: SocialMediaPost): Promise<PostingResult> {
  // Simuliere API-Verzögerung
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simuliere erfolgreiche Posts (95% Erfolgsrate)
  if (Math.random() > 0.05) {
    return {
      platform: post.platform,
      success: true,
      postId: `${post.platform}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  } else {
    return {
      platform: post.platform,
      success: false,
      error: "Rate limit exceeded or API error",
    };
  }
}

/**
 * Berechnet die beste Zeit zum Posten basierend auf Plattform
 */
export function getBestPostingTime(platform: string): Date {
  const now = new Date();
  const hour = now.getHours();

  // Beste Posting-Zeiten pro Plattform
  const bestTimes: Record<string, number[]> = {
    twitter: [9, 12, 17, 19], // Morgens, Mittags, Nachmittags, Abends
    linkedin: [7, 12, 17], // Arbeitszeiten
    instagram: [11, 19, 20], // Mittags und Abends
    tiktok: [18, 19, 20, 21], // Abends
  };

  const times = bestTimes[platform] || [12];
  const nextBestTime = times.find((t) => t > hour) || times[0];

  const postTime = new Date(now);
  postTime.setHours(nextBestTime, Math.floor(Math.random() * 60), 0, 0);

  // Falls die Zeit bereits vorbei ist, auf morgen verschieben
  if (postTime <= now) {
    postTime.setDate(postTime.getDate() + 1);
  }

  return postTime;
}
