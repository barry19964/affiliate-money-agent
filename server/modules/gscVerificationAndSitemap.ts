/**
 * Google Search Console Verification and Sitemap Generation
 * Complete GSC setup workflow with sitemap generation and submission
 */

export interface GSCVerificationStep {
  step: number;
  title: string;
  description: string;
  action: string;
  estimatedTime: number; // in minutes
  completed: boolean;
}

export interface SitemapConfig {
  domain: string;
  protocol: "http" | "https";
  baseUrl: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export interface URLEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

/**
 * Generate GSC verification steps
 */
export function generateGSCVerificationSteps(): GSCVerificationStep[] {
  return [
    {
      step: 1,
      title: "Google Search Console öffnen",
      description: "Gehe zu https://search.google.com/search-console/",
      action: "Öffne Google Search Console",
      estimatedTime: 2,
      completed: false,
    },
    {
      step: 2,
      title: "Property hinzufügen",
      description: "Klicke auf 'Property hinzufügen' und wähle 'URL-Präfix'",
      action: "Gib deine Domain ein: https://affiliagent.xyz",
      estimatedTime: 2,
      completed: false,
    },
    {
      step: 3,
      title: "Domain verifizieren",
      description: "Wähle eine Verifizierungsmethode (DNS oder HTML)",
      action: "DNS TXT Record hinzufügen oder HTML-Datei hochladen",
      estimatedTime: 5,
      completed: false,
    },
    {
      step: 4,
      title: "Verifizierung bestätigen",
      description: "Klicke auf 'Verifizieren' in Google Search Console",
      action: "Warte auf Bestätigung (kann bis zu 48 Stunden dauern)",
      estimatedTime: 5,
      completed: false,
    },
    {
      step: 5,
      title: "Sitemap einreichen",
      description: "Gehe zu Sitemaps und reiche deine Sitemap ein",
      action: "Gib ein: https://affiliagent.xyz/sitemap.xml",
      estimatedTime: 2,
      completed: false,
    },
    {
      step: 6,
      title: "URLs für Indexierung einreichen",
      description: "Nutze die Inspect URL Funktion für wichtige Seiten",
      action: "Reiche deine Top 10 URLs ein",
      estimatedTime: 5,
      completed: false,
    },
  ];
}

/**
 * Generate sitemap XML content
 */
export function generateSitemapXML(urls: URLEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = "</urlset>";

  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("\n");

  return xmlHeader + urlsetOpen + urlEntries + "\n" + urlsetClose;
}

/**
 * Generate sample URLs for sitemap
 */
export function generateSampleSitemapURLs(domain: string): URLEntry[] {
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      loc: `https://${domain}/`,
      lastmod: today,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `https://${domain}/affiliate-marketing`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `https://${domain}/ai-content-generation`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `https://${domain}/passive-income`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/automation`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/seo-tips`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      loc: `https://${domain}/affiliate-programs`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      loc: `https://${domain}/blog`,
      lastmod: today,
      changefreq: "daily",
      priority: 0.8,
    },
    {
      loc: `https://${domain}/resources`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `https://${domain}/contact`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.5,
    },
  ];
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTXT(domain: string): string {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/

Sitemap: https://${domain}/sitemap.xml

# Google
User-agent: Googlebot
Allow: /

# Bing
User-agent: Bingbot
Allow: /

# Rate limiting
User-agent: *
Crawl-delay: 1
Request-rate: 1/10s
`;
}

/**
 * Generate DNS verification record
 */
export function generateDNSVerificationRecord(domain: string): {
  recordType: string;
  recordName: string;
  recordValue: string;
  instructions: string[];
} {
  // In production, would get this from Google Search Console API
  const verificationCode = Buffer.from(domain).toString("base64").substring(0, 43);

  return {
    recordType: "TXT",
    recordName: domain,
    recordValue: `google-site-verification=${verificationCode}`,
    instructions: [
      "1. Gehe zu deinem Domain-Registrar (GoDaddy, Namecheap, etc.)",
      "2. Öffne die DNS-Einstellungen",
      "3. Füge einen neuen TXT Record hinzu",
      `4. Name: ${domain}`,
      `5. Value: google-site-verification=${verificationCode}`,
      "6. Speichere die Änderungen",
      "7. Warte 24-48 Stunden auf DNS-Propagation",
      "8. Bestätige in Google Search Console",
    ],
  };
}

/**
 * Generate HTML verification file
 */
export function generateHTMLVerificationFile(domain: string): {
  fileName: string;
  content: string;
  uploadPath: string;
  instructions: string[];
} {
  const verificationCode = Buffer.from(domain).toString("base64").substring(0, 43);
  const fileName = `google${verificationCode}.html`;

  return {
    fileName,
    content: `google-site-verification: ${fileName}`,
    uploadPath: `/.well-known/${fileName}`,
    instructions: [
      "1. Lade diese Datei herunter",
      `2. Lade die Datei in das Root-Verzeichnis deiner Website hoch`,
      `3. Überprüfe, dass die Datei unter dieser URL erreichbar ist:`,
      `   https://${domain}/${fileName}`,
      "4. Bestätige in Google Search Console",
    ],
  };
}

/**
 * Generate GSC monitoring checklist
 */
export function generateGSCMonitoringChecklist(): {
  metric: string;
  frequency: string;
  target: string;
  action: string;
}[] {
  return [
    {
      metric: "Indexierte Seiten",
      frequency: "Täglich",
      target: "Alle Seiten indexiert",
      action: "Überprüfe Coverage Report",
    },
    {
      metric: "Crawl-Fehler",
      frequency: "Täglich",
      target: "0 Fehler",
      action: "Repariere Fehler sofort",
    },
    {
      metric: "Mobile Usability",
      frequency: "Wöchentlich",
      target: "Keine Probleme",
      action: "Optimiere für Mobile",
    },
    {
      metric: "Core Web Vitals",
      frequency: "Wöchentlich",
      target: "Alle grün",
      action: "Optimiere Performance",
    },
    {
      metric: "Sicherheitsprobleme",
      frequency: "Täglich",
      target: "Keine Probleme",
      action: "Behebe Sicherheitsprobleme",
    },
    {
      metric: "Backlinks",
      frequency: "Wöchentlich",
      target: "Wachsend",
      action: "Baue mehr Backlinks auf",
    },
    {
      metric: "Rankings",
      frequency: "Täglich",
      target: "Position 1-10",
      action: "Optimiere Top Keywords",
    },
    {
      metric: "Impressionen",
      frequency: "Täglich",
      target: "Wachsend",
      action: "Erstelle mehr Content",
    },
  ];
}

/**
 * Calculate expected traffic timeline
 */
export function calculateExpectedTrafficTimeline(): {
  week: number;
  milestone: string;
  expectedTraffic: number;
  expectedRevenue: number;
}[] {
  return [
    {
      week: 1,
      milestone: "Google indexiert Website",
      expectedTraffic: 0,
      expectedRevenue: 0,
    },
    {
      week: 2,
      milestone: "Erste Rankings erscheinen (Position 50+)",
      expectedTraffic: 5,
      expectedRevenue: 0.5,
    },
    {
      week: 3,
      milestone: "Rankings verbessern sich (Position 20-50)",
      expectedTraffic: 20,
      expectedRevenue: 2,
    },
    {
      week: 4,
      milestone: "Gute Rankings (Position 5-20)",
      expectedTraffic: 50,
      expectedRevenue: 5,
    },
    {
      week: 6,
      milestone: "Top Rankings (Position 1-5)",
      expectedTraffic: 200,
      expectedRevenue: 20,
    },
    {
      week: 8,
      milestone: "Stabiler Traffic",
      expectedTraffic: 500,
      expectedRevenue: 50,
    },
    {
      week: 12,
      milestone: "Hoher Traffic",
      expectedTraffic: 2000,
      expectedRevenue: 200,
    },
  ];
}

/**
 * Generate revenue projection
 */
export function generateRevenueProjection(): {
  month: number;
  traffic: number;
  conversions: number;
  revenue: number;
  cumulative: number;
}[] {
  const projections = [];
  let cumulative = 0;

  for (let month = 1; month <= 12; month++) {
    // Traffic grows exponentially in first 3 months, then linearly
    let traffic = 0;
    if (month === 1) traffic = 50;
    else if (month === 2) traffic = 200;
    else if (month === 3) traffic = 500;
    else traffic = 500 + (month - 3) * 300;

    const conversions = Math.round(traffic * 0.03);
    const avgOrderValue = 50;
    const commission = 0.25;
    const revenue = Math.round(conversions * avgOrderValue * commission);
    cumulative += revenue;

    projections.push({
      month,
      traffic,
      conversions,
      revenue,
      cumulative,
    });
  }

  return projections;
}
