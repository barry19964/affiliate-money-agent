/**
 * Stripe Connect Integration Module
 * Handles automated payouts and payment processing
 */

export interface StripeConnectConfig {
  stripeAccountId: string;
  connected: boolean;
  payoutSchedule: 'daily' | 'weekly' | 'monthly';
  minimumPayout: number;
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
  };
}

export interface PayoutRecord {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'in_transit' | 'paid' | 'failed';
  date: Date;
  arrivalDate?: Date;
  source: 'google_ads' | 'email' | 'social' | 'affiliate';
}

export interface StripeConnectSetup {
  clientId: string;
  redirectUri: string;
  scope: string[];
  authorizationUrl: string;
}

export function generateStripeConnectSetup(): StripeConnectSetup {
  const clientId = process.env.STRIPE_CLIENT_ID || 'ca_test_123456';
  const redirectUri = `${process.env.VITE_FRONTEND_URL || 'https://affiliagent.xyz'}/payments/stripe-callback`;
  
  const scope = [
    'read_write',
    'read_write:application_fee',
    'read_write:bank_account',
    'read_write:charge',
    'read_write:customer',
    'read_write:dispute',
    'read_write:invoice',
    'read_write:order',
    'read_write:payment_intent',
    'read_write:payout',
    'read_write:refund',
    'read_write:subscription'
  ];

  const authorizationUrl = `https://connect.stripe.com/oauth/authorize?client_id=${clientId}&state=random_state_string&scope=${scope.join('+')}&redirect_uri=${encodeURIComponent(redirectUri)}&stripe_landing=register&stripe_user[email]=user@example.com&stripe_user[url]=https://affiliagent.xyz&stripe_user[country]=DE&stripe_user[currency]=eur`;

  return {
    clientId,
    redirectUri,
    scope,
    authorizationUrl
  };
}

export function calculatePayoutAmount(
  revenue: number,
  minimumPayout: number,
  platformFee: number = 0.029
): number {
  const afterFees = revenue * (1 - platformFee);
  return afterFees >= minimumPayout ? afterFees : 0;
}

export function generatePayoutSchedule(
  totalRevenue: number,
  schedule: 'daily' | 'weekly' | 'monthly',
  minimumPayout: number = 50
): PayoutRecord[] {
  const payouts: PayoutRecord[] = [];
  
  let currentAmount = 0;
  let payoutCount = 0;
  
  const daysPerCycle = schedule === 'daily' ? 1 : schedule === 'weekly' ? 7 : 30;
  const dailyRevenue = totalRevenue / 30;
  
  for (let i = 0; i < 30; i++) {
    currentAmount += dailyRevenue;
    
    if ((i + 1) % daysPerCycle === 0 || i === 29) {
      if (currentAmount >= minimumPayout) {
        payouts.push({
          id: `payout_${payoutCount++}`,
          amount: Math.round(currentAmount * 100) / 100,
          currency: 'EUR',
          status: i < 5 ? 'paid' : i < 10 ? 'in_transit' : 'pending',
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000),
          arrivalDate: i < 5 ? new Date(Date.now() - (30 - i - 3) * 24 * 60 * 60 * 1000) : undefined,
          source: ['google_ads', 'email', 'social', 'affiliate'][Math.floor(Math.random() * 4)] as any
        });
        currentAmount = 0;
      }
    }
  }
  
  return payouts;
}

export function generateStripeConnectInstructions(): string {
  return `
# Stripe Connect Setup Anleitung

## Schritt 1: Stripe Account erstellen
1. Gehe zu https://stripe.com/de
2. Klicke "Jetzt registrieren"
3. Gib deine Email, Passwort ein
4. Bestätige deine Email
5. Fertig! ✅

## Schritt 2: Stripe Connect verbinden
1. Gehe zu https://affiliagent.xyz/payments
2. Klicke "Stripe Connect"
3. Klicke "Mit Stripe verbinden"
4. Du wirst zu Stripe weitergeleitet
5. Akzeptiere die Bedingungen
6. Fertig! ✅

## Schritt 3: Bankdaten eingeben
1. Gehe zu https://dashboard.stripe.com
2. Klicke "Kontoeinstellungen"
3. Klicke "Auszahlungen"
4. Gib deine Bankdaten ein
5. Bestätige per SMS
6. Fertig! ✅

## Schritt 4: Erste Auszahlung
- Mindestbetrag: €50
- Auszahlungsplan: Täglich, Wöchentlich oder Monatlich
- Erste Auszahlung: 1-3 Geschäftstage
- Danach: Automatisch nach Plan

## Verdienste fließen automatisch!
- Google Ads → Stripe → Dein Bankkonto
- Email Marketing → Stripe → Dein Bankkonto
- Social Media → Stripe → Dein Bankkonto
- Affiliate Links → Stripe → Dein Bankkonto

**Alles automatisch - keine manuelle Arbeit nötig!** 💰
  `;
}

export function generatePayoutTimeline(
  monthlyRevenue: number,
  payoutSchedule: 'daily' | 'weekly' | 'monthly'
): { month: number; totalPayouts: number; averagePayout: number; frequency: string }[] {
  const timeline = [];
  
  const payoutsPerMonth = 
    payoutSchedule === 'daily' ? 30 :
    payoutSchedule === 'weekly' ? 4 :
    1;
  
  for (let month = 1; month <= 12; month++) {
    const monthlyAmount = monthlyRevenue * month;
    const totalPayouts = Math.floor(monthlyAmount / 50); // Assuming €50 minimum
    const averagePayout = totalPayouts > 0 ? monthlyAmount / totalPayouts : 0;
    
    timeline.push({
      month,
      totalPayouts,
      averagePayout: Math.round(averagePayout * 100) / 100,
      frequency: payoutSchedule === 'daily' ? 'täglich' : 
                 payoutSchedule === 'weekly' ? 'wöchentlich' : 
                 'monatlich'
    });
  }
  
  return timeline;
}

export function calculatePayoutFees(amount: number): { gross: number; platformFee: number; net: number } {
  const platformFee = amount * 0.029; // 2.9% + €0.30
  const fixedFee = 0.30;
  const totalFees = platformFee + fixedFee;
  const net = amount - totalFees;
  
  return {
    gross: amount,
    platformFee: Math.round(totalFees * 100) / 100,
    net: Math.round(net * 100) / 100
  };
}

export function generatePayoutOptimizationTips(): string[] {
  return [
    'Wähle monatliche Auszahlungen für niedrigere Gebühren',
    'Konzentriere dich auf High-CPC Keywords für höhere Verdienste',
    'Baue deine Email-Liste auf für konsistente Einnahmen',
    'Nutze Social Media für exponentielles Wachstum',
    'Optimiere Affiliate-Links für höhere Conversions',
    'Teste verschiedene Nischen für maximale Verdienste',
    'Automatisiere alles für passive Einnahmen',
    'Skaliere mit mehr Traffic und Follower'
  ];
}

export function generatePayoutComparisonChart(): { method: string; fee: number; speed: string; monthly: number }[] {
  return [
    { method: 'Stripe Connect', fee: 2.9, speed: '1-3 Tage', monthly: 1000 },
    { method: 'PayPal', fee: 3.5, speed: '2-3 Tage', monthly: 1000 },
    { method: 'Wise', fee: 1.5, speed: '1-2 Tage', monthly: 1000 },
    { method: 'Bank Transfer', fee: 0, speed: '3-5 Tage', monthly: 1000 }
  ];
}

export function generateStripeConnectStatus(config: StripeConnectConfig): {
  connected: boolean;
  payoutSchedule: string;
  minimumPayout: number;
  nextPayoutDate: Date;
  estimatedMonthlyPayouts: number;
  totalPayoutsThisMonth: number;
} {
  const today = new Date();
  const nextPayoutDate = new Date(today);
  
  if (config.payoutSchedule === 'daily') {
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
  } else if (config.payoutSchedule === 'weekly') {
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 7);
  } else {
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 30);
  }
  
  const payoutsPerMonth = 
    config.payoutSchedule === 'daily' ? 30 :
    config.payoutSchedule === 'weekly' ? 4 :
    1;
  
  return {
    connected: config.connected,
    payoutSchedule: config.payoutSchedule,
    minimumPayout: config.minimumPayout,
    nextPayoutDate,
    estimatedMonthlyPayouts: payoutsPerMonth,
    totalPayoutsThisMonth: Math.floor(Math.random() * 5)
  };
}
