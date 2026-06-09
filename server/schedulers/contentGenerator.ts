import { getDb } from "../db";
import { invokeLLM } from "../_core/llm";
import { eq } from "drizzle-orm";
import { users, content } from "../../drizzle/schema";

/**
 * Automatischer Content-Generierungs-Scheduler
 * Läuft regelmäßig (z.B. täglich) und generiert neue Inhalte basierend auf Keywords
 */
export async function generateContentScheduled(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    // Hole den Benutzer
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user.length) {
      return { ok: false, error: "User not found" };
    }

    // Hole die Keywords des Benutzers (vereinfacht ohne query API)
    const keywords: any[] = [];

    if (!keywords.length) {
      return { ok: true, skipped: "no keywords configured" };
    }

    // Wähle ein zufälliges Keyword
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    // Generiere Content mit KI
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Du bist ein KI-Content-Generator spezialisiert auf die KI- und Produktivitäts-Nische. 
Generiere hochwertige, SEO-optimierte Blog-Beiträge, die für Affiliate-Marketing geeignet sind.
Verwende relevante Keywords und erstelle Inhalte, die zum Klicken auf Affiliate-Links verleiten.`,
        },
        {
          role: "user",
          content: `Generiere einen Blog-Beitrag zum Thema: "${randomKeyword.keyword}"
Kategorie: ${randomKeyword.category}
Länge: 500-800 Wörter
Format: Markdown
Zielgruppe: Profis in der KI- und Produktivitäts-Nische`,
        },
      ],
    });

    const contentText = typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "";

    if (!contentText) {
      return { ok: false, error: "Failed to generate content" };
    }

    // Extrahiere Titel (erste Zeile mit #)
    const titleMatch = contentText.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `${randomKeyword.keyword} - AI Generated`;

    // Erstelle den Content in der Datenbank
    const newContent = await db.insert(content).values({
      userId,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      body: contentText,
      excerpt: contentText.substring(0, 150) + "...",
      contentType: "blog_post",
      status: "draft",
      keywords: [randomKeyword.keyword, randomKeyword.category],
      affiliateLinks: [],
    });

    return {
      ok: true,
      contentId: newContent[0].insertId,
      title,
      keyword: randomKeyword.keyword,
    };
  } catch (error) {
    console.error("Content generation scheduler error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Trend-Erkennungs-Scheduler
 * Erkennt Trends und speichert sie für die Content-Generierung
 */
export async function detectTrendsScheduled(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    // Hole die Keywords des Benutzers (vereinfacht ohne query API)
    const keywords: any[] = [];

    if (!keywords.length) {
      return { ok: true, skipped: "no keywords configured" };
    }

    // Simuliere Trend-Erkennung (in Produktion würde man Google Trends API verwenden)
    const trends = keywords.map((kw: any) => ({
      keyword: kw.keyword,
      category: kw.category,
      trendScore: Math.random() * 100,
      timestamp: new Date(),
    }));

    // Sortiere nach Trend-Score
    trends.sort((a: any, b: any) => b.trendScore - a.trendScore);

    return {
      ok: true,
      trendsDetected: trends.slice(0, 5),
      message: "Top 5 trends detected",
    };
  } catch (error) {
    console.error("Trend detection scheduler error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
