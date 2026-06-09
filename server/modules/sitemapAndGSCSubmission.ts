/**
 * Sitemap Generation and Google Search Console Submission Module
 * Generates XML sitemap and provides GSC submission instructions
 */

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export interface GSCVerificationMethod {
  method: string;
  steps: string[];
  code?: string;
  record?: string;
}

export interface SitemapSubmissionResult {
  domain: string;
  sitemapUrl: string;
  status: "ready" | "submitted" | "verified";
  lastSubmitted?: string;
  indexedPages?: number;
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(urls: SitemapURL[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';

  const urlEntries = urls
    .map((url) => {
      return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return xmlHeader + urlsetOpen + urlEntries + "\n" + urlsetClose;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTXT(domain: string): string {
  return `User-agent: *
Allow: /

Sitemap: https://${domain}/sitemap.xml

# Disallow crawling of admin and private pages
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$

# Crawl delay for respectful crawling
Crawl-delay: 1

# Allow specific search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;
}

/**
 * Generate DNS TXT verification record for GSC
 */
export function generateDNSVerificationRecord(domain: string): GSCVerificationMethod {
  const verificationCode = generateVerificationCode();

  return {
    method: "DNS TXT Record",
    steps: [
      "1. Gehe zu deinem Domain-Provider (z.B. GoDaddy, Namecheap, etc.)",
      "2. Öffne die DNS-Einstellungen",
      "3. Füge einen neuen TXT-Record hinzu",
      "4. Name/Host: @ oder leer lassen",
      "5. Value: google-site-verification=" + verificationCode,
      "6. Speichere die Änderungen",
      "7. Warte 24-48 Stunden auf Propagation",
      "8. Gehe zu Google Search Console und klicke 'Verifizieren'",
    ],
    record: `google-site-verification=${verificationCode}`,
  };
}

/**
 * Generate HTML file verification for GSC
 */
export function generateHTMLVerificationFile(domain: string): GSCVerificationMethod {
  const verificationCode = generateVerificationCode();

  return {
    method: "HTML File Upload",
    steps: [
      "1. Lade diese Datei herunter: google" + verificationCode + ".html",
      "2. Öffne dein FTP/SFTP-Programm oder Dateimanager",
      "3. Verbinde dich mit deinem Server",
      "4. Gehe in das Root-Verzeichnis (public_html oder www)",
      "5. Lade die Datei hoch",
      "6. Überprüfe, dass die Datei erreichbar ist unter:",
      "   https://" + domain + "/google" + verificationCode + ".html",
      "7. Gehe zu Google Search Console und klicke 'Verifizieren'",
    ],
    code: verificationCode,
  };
}

/**
 * Generate GSC submission instructions
 */
export function generateGSCSubmissionInstructions(domain: string): string[] {
  return [
    "=== Google Search Console Anmeldung ===",
    "",
    "Schritt 1: Öffne Google Search Console",
    "URL: https://search.google.com/search-console/",
    "",
    "Schritt 2: Wähle 'Property hinzufügen'",
    "Klicke auf das Plus-Symbol (+) oben links",
    "",
    "Schritt 3: Wähle 'URL-Präfix'",
    "Gib ein: https://" + domain,
    "",
    "Schritt 4: Verifiziere deine Website",
    "Wähle eine Verifizierungsmethode:",
    "  - DNS TXT Record (empfohlen)",
    "  - HTML File Upload",
    "  - HTML Tag",
    "  - Google Analytics",
    "  - Google Tag Manager",
    "",
    "Schritt 5: Folge den Anweisungen",
    "Siehe oben für detaillierte Schritte",
    "",
    "Schritt 6: Klicke 'Verifizieren'",
    "Nach erfolgreicher Verifizierung kannst du die Sitemap einreichen",
  ];
}

/**
 * Generate sitemap submission instructions
 */
export function generateSitemapSubmissionInstructions(domain: string): string[] {
  return [
    "=== Sitemap-Einreichung in Google Search Console ===",
    "",
    "Schritt 1: Öffne Google Search Console",
    "URL: https://search.google.com/search-console/",
    "",
    "Schritt 2: Wähle deine Website aus",
    "Klicke auf deine verifizierte Website",
    "",
    "Schritt 3: Gehe zu 'Sitemaps'",
    "Im linken Menü unter 'Index' → 'Sitemaps'",
    "",
    "Schritt 4: Klicke 'Neue Sitemap hinzufügen'",
    "Gib ein: https://" + domain + "/sitemap.xml",
    "",
    "Schritt 5: Klicke 'Einreichen'",
    "Google wird deine Sitemap crawlen und indexieren",
    "",
    "Schritt 6: Überwache den Status",
    "Überprüfe täglich, wie viele URLs indexiert wurden",
    "Erwartet: Indexierung innerhalb von 1-2 Wochen",
    "",
    "Schritt 7: Überprüfe die Search Analytics",
    "Gehe zu 'Performance' um deine Rankings zu sehen",
  ];
}

/**
 * Generate sample sitemap URLs for a blog
 */
export function generateSampleSitemapURLs(domain: string): SitemapURL[] {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const lastWeek = new Date(Date.now() - 604800000).toISOString().split("T")[0];

  return [
    {
      loc: `https://${domain}/`,
      lastmod: today,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `https://${domain}/blog`,
      lastmod: today,
      changefreq: "daily",
      priority: 0.9,
    },
    {
      loc: `https://${domain}/blog/ai-content-generation`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/blog/affiliate-marketing-tips`,
      lastmod: yesterday,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/blog/passive-income-strategies`,
      lastmod: lastWeek,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/blog/seo-optimization`,
      lastmod: lastWeek,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/blog/content-marketing`,
      lastmod: lastWeek,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/about`,
      lastmod: lastWeek,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `https://${domain}/contact`,
      lastmod: lastWeek,
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      loc: `https://${domain}/privacy`,
      lastmod: lastWeek,
      changefreq: "yearly",
      priority: 0.3,
    },
  ];
}

/**
 * Generate GSC monitoring checklist
 */
export function generateGSCMonitoringChecklist(): string[] {
  return [
    "=== Google Search Console Monitoring Checkliste ===",
    "",
    "Täglich überprüfen:",
    "☐ Neue Fehler in der Search Console",
    "☐ Indexierungsstatus (wie viele URLs indexiert)",
    "☐ Coverage-Bericht (Fehler und Warnungen)",
    "☐ Mobile Usability (Fehler auf Mobilgeräten)",
    "",
    "Wöchentlich überprüfen:",
    "☐ Performance-Bericht (Rankings und CTR)",
    "☐ Top-Keywords und ihre Positionen",
    "☐ Top-Seiten und deren Impressionen",
    "☐ Backlinks (neue und verlorene)",
    "☐ Crawl-Statistiken",
    "",
    "Monatlich überprüfen:",
    "☐ Traffic-Trends",
    "☐ Ranking-Verbesserungen",
    "☐ Neue Chancen (Keywords mit Potenzial)",
    "☐ Technische SEO-Probleme",
    "☐ Core Web Vitals",
    "",
    "Optimierungsmaßnahmen:",
    "☐ Keywords mit Position 5-10 optimieren (Top 3 Ziel)",
    "☐ Backlinks zu Top-Seiten aufbauen",
    "☐ Content für fehlende Keywords erstellen",
    "☐ Interne Links zu wichtigen Seiten hinzufügen",
    "☐ Meta-Descriptions und Titles optimieren",
  ];
}

/**
 * Generate verification code
 */
function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate complete GSC setup guide
 */
export function generateCompleteGSCSetupGuide(domain: string): {
  verification: GSCVerificationMethod[];
  sitemapInstructions: string[];
  gscInstructions: string[];
  monitoringChecklist: string[];
} {
  return {
    verification: [generateDNSVerificationRecord(domain), generateHTMLVerificationFile(domain)],
    sitemapInstructions: generateSitemapSubmissionInstructions(domain),
    gscInstructions: generateGSCSubmissionInstructions(domain),
    monitoringChecklist: generateGSCMonitoringChecklist(),
  };
}
