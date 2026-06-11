/**
 * A/B Testing Framework Module
 * Optimizes headlines, CTAs, and affiliate links for maximum conversions
 */

export interface ABTest {
  id: string;
  name: string;
  type: 'headline' | 'cta' | 'affiliate_link' | 'email_subject' | 'landing_page';
  variantA: string;
  variantB: string;
  startDate: Date;
  endDate?: Date;
  status: 'running' | 'completed' | 'paused';
  sampleSize: number;
  resultsA: TestResults;
  resultsB: TestResults;
  winner?: 'A' | 'B' | 'tie';
  confidence: number;
}

export interface TestResults {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number; // Click-through rate
  conversionRate: number;
  rpc: number; // Revenue per click
}

export interface ABTestRecommendation {
  testId: string;
  recommendation: string;
  expectedRevenueLift: number;
  confidence: number;
  nextSteps: string[];
}

export function generateABTest(type: 'headline' | 'cta' | 'affiliate_link' | 'email_subject' | 'landing_page'): ABTest {
  const templates = {
    headline: {
      A: '10 Tipps zum passiven Einkommen mit AI',
      B: 'Wie ich €5000/Monat mit AI verdiene (ohne Erfahrung)'
    },
    cta: {
      A: 'Jetzt kostenlos starten',
      B: 'Verdiene jetzt Geld - 100% kostenlos'
    },
    affiliate_link: {
      A: 'stripe.com/de',
      B: 'stripe.com/de?ref=affiliagent'
    },
    email_subject: {
      A: 'Dein wöchentlicher Verdienst-Report',
      B: '💰 Du hast diese Woche €150 verdient!'
    },
    landing_page: {
      A: 'Standard Landing Page',
      B: 'Video-basierte Landing Page'
    }
  };

  const variant = templates[type];
  const now = new Date();
  const endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  return {
    id: `test_${type}_${Date.now()}`,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Test`,
    type,
    variantA: variant.A,
    variantB: variant.B,
    startDate: now,
    endDate,
    status: 'running',
    sampleSize: Math.floor(Math.random() * 5000) + 1000,
    resultsA: generateTestResults(),
    resultsB: generateTestResults(),
    confidence: Math.floor(Math.random() * 30) + 70
  };
}

export function generateTestResults(): TestResults {
  const views = Math.floor(Math.random() * 10000) + 1000;
  const clicks = Math.floor(views * (Math.random() * 0.1 + 0.02));
  const conversions = Math.floor(clicks * (Math.random() * 0.3 + 0.1));
  const revenue = conversions * (Math.random() * 50 + 10);

  return {
    views,
    clicks,
    conversions,
    revenue: Math.round(revenue * 100) / 100,
    ctr: Math.round((clicks / views) * 10000) / 100,
    conversionRate: Math.round((conversions / clicks) * 10000) / 100,
    rpc: Math.round((revenue / clicks) * 100) / 100
  };
}

export function analyzeABTest(test: ABTest): {
  winner: 'A' | 'B' | 'tie';
  winnerRevenue: number;
  loserRevenue: number;
  revenueLift: number;
  revenueLiftPercent: number;
  statistically_significant: boolean;
  recommendation: string;
} {
  const revenueA = test.resultsA.revenue;
  const revenueB = test.resultsB.revenue;

  const winner = revenueA > revenueB ? 'A' : revenueB > revenueA ? 'B' : 'tie';
  const winnerRevenue = Math.max(revenueA, revenueB);
  const loserRevenue = Math.min(revenueA, revenueB);
  const revenueLift = winnerRevenue - loserRevenue;
  const revenueLiftPercent = loserRevenue > 0 ? (revenueLift / loserRevenue) * 100 : 0;

  const statistically_significant = test.confidence > 95;

  let recommendation = '';
  if (winner === 'tie') {
    recommendation = 'Kein signifikanter Unterschied. Weitere Tests nötig.';
  } else {
    recommendation = `Variante ${winner} gewinnt mit €${winnerRevenue.toFixed(2)} (+${revenueLiftPercent.toFixed(1)}%). Implementiere diese Variante.`;
  }

  return {
    winner,
    winnerRevenue,
    loserRevenue,
    revenueLift: Math.round(revenueLift * 100) / 100,
    revenueLiftPercent: Math.round(revenueLiftPercent * 100) / 100,
    statistically_significant,
    recommendation
  };
}

export function generateABTestRecommendations(tests: ABTest[]): ABTestRecommendation[] {
  return tests.map(test => {
    const analysis = analyzeABTest(test);
    const expectedLift = analysis.revenueLiftPercent;

    return {
      testId: test.id,
      recommendation: analysis.recommendation,
      expectedRevenueLift: expectedLift,
      confidence: test.confidence,
      nextSteps: [
        `Implementiere Variante ${analysis.winner}`,
        `Erwartete Umsatzsteigerung: +${expectedLift.toFixed(1)}%`,
        `Starten Sie den nächsten Test in 7 Tagen`,
        `Testen Sie andere Elemente (z.B. Farben, Bilder, Copy)`
      ]
    };
  });
}

export function generateHeadlineVariants(): { variant: string; expectedCTR: number }[] {
  return [
    { variant: '10 Tipps zum passiven Einkommen mit AI', expectedCTR: 2.1 },
    { variant: 'Wie ich €5000/Monat mit AI verdiene (ohne Erfahrung)', expectedCTR: 3.5 },
    { variant: 'Die ultimative Anleitung zu passivem Einkommen', expectedCTR: 2.8 },
    { variant: 'Verdiene €10000/Monat mit diesem geheimen Trick', expectedCTR: 4.2 },
    { variant: 'Automatisiertes Geldverdienen für Anfänger', expectedCTR: 2.5 },
    { variant: 'Mein System: €1000/Woche mit Content Marketing', expectedCTR: 3.8 }
  ];
}

export function generateCTAVariants(): { variant: string; expectedConversionRate: number }[] {
  return [
    { variant: 'Jetzt kostenlos starten', expectedConversionRate: 2.1 },
    { variant: 'Verdiene jetzt Geld - 100% kostenlos', expectedConversionRate: 3.2 },
    { variant: 'Starten Sie Ihren AI Agent heute', expectedConversionRate: 2.8 },
    { variant: 'Erhalten Sie sofortigen Zugang', expectedConversionRate: 2.5 },
    { variant: 'Jetzt 7 Tage kostenlos testen', expectedConversionRate: 3.5 },
    { variant: 'Beginnen Sie Ihre Reise zum passiven Einkommen', expectedConversionRate: 2.9 }
  ];
}

export function generateEmailSubjectVariants(): { variant: string; expectedOpenRate: number }[] {
  return [
    { variant: 'Dein wöchentlicher Verdienst-Report', expectedOpenRate: 25 },
    { variant: '💰 Du hast diese Woche €150 verdient!', expectedOpenRate: 35 },
    { variant: 'Deine Verdienste sind gestiegen - Hier sind die Details', expectedOpenRate: 28 },
    { variant: 'Schnelle Aktion: Verdienste verdoppeln', expectedOpenRate: 32 },
    { variant: 'Du schuldest mir einen Kaffee ☕ (€5 Verdienste)', expectedOpenRate: 38 },
    { variant: 'Wöchentliches Update: Dein Agent arbeitet für dich', expectedOpenRate: 26 }
  ];
}

export function generateLandingPageVariants(): { variant: string; expectedConversionRate: number }[] {
  return [
    { variant: 'Standard Text-basiert', expectedConversionRate: 2.1 },
    { variant: 'Video-basiert mit Demo', expectedConversionRate: 3.8 },
    { variant: 'Testimonials + Social Proof', expectedConversionRate: 3.2 },
    { variant: 'Countdown Timer (Scarcity)', expectedConversionRate: 4.1 },
    { variant: 'Interactive Calculator', expectedConversionRate: 3.5 },
    { variant: 'Minimalist Design', expectedConversionRate: 2.8 }
  ];
}

export function generateABTestingStrategy(): string {
  return `
# A/B Testing Strategie für maximale Verdienste

## Phase 1: Headline Testing (Woche 1-2)
- Teste 3-5 verschiedene Headlines
- Messe: CTR, Bounce Rate, Time on Page
- Gewinne: Beste Headline verwenden

## Phase 2: CTA Testing (Woche 3-4)
- Teste 3-5 verschiedene CTAs
- Messe: Click Rate, Conversion Rate
- Gewinne: Beste CTA verwenden

## Phase 3: Affiliate Link Testing (Woche 5-6)
- Teste verschiedene Affiliate-Links
- Messe: Conversions, Revenue per Click
- Gewinne: Beste Links verwenden

## Phase 4: Email Subject Testing (Woche 7-8)
- Teste verschiedene Email-Betreffzeilen
- Messe: Open Rate, Click Rate
- Gewinne: Beste Betreffzeilen verwenden

## Phase 5: Landing Page Testing (Woche 9-10)
- Teste verschiedene Landing Page Designs
- Messe: Conversion Rate, Time on Page
- Gewinne: Beste Design verwenden

## Erwartete Ergebnisse:
- Headline Optimierung: +15-30% CTR
- CTA Optimierung: +20-40% Conversions
- Affiliate Link Optimierung: +10-25% Revenue
- Email Subject Optimierung: +25-50% Open Rate
- Landing Page Optimierung: +30-60% Conversions

## Gesamterwartete Umsatzsteigerung: +100-200%

**Kontinuierliches Testing = Exponentielles Wachstum!** 📈
  `;
}

export function generateABTestDashboard(tests: ABTest[]): {
  activeTests: number;
  completedTests: number;
  avgRevenueLift: number;
  bestPerformer: ABTest | null;
  recommendation: string;
} {
  const activeTests = tests.filter(t => t.status === 'running').length;
  const completedTests = tests.filter(t => t.status === 'completed').length;

  const revenueLift = tests.map(test => {
    const analysis = analyzeABTest(test);
    return analysis.revenueLiftPercent;
  });

  const avgRevenueLift = revenueLift.length > 0 
    ? revenueLift.reduce((a, b) => a + b, 0) / revenueLift.length 
    : 0;

  const bestPerformer = tests.reduce((best, current) => {
    const bestAnalysis = analyzeABTest(best);
    const currentAnalysis = analyzeABTest(current);
    return currentAnalysis.revenueLift > bestAnalysis.revenueLift ? current : best;
  }, tests[0] || null);

  return {
    activeTests,
    completedTests,
    avgRevenueLift: Math.round(avgRevenueLift * 100) / 100,
    bestPerformer,
    recommendation: `Durchschnittliche Umsatzsteigerung: +${avgRevenueLift.toFixed(1)}%. Implementiere Best Practices und starten Sie neue Tests.`
  };
}
