/**
 * Stripe Payment Processing Module
 * Handles product purchases, subscriptions, and payment processing
 */

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  type: 'one_time' | 'subscription';
  price: number;
  currency: string;
  image?: string;
  isActive: boolean;
}

export interface StripeCheckoutSession {
  sessionId: string;
  clientSecret?: string;
  publishableKey: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  status: 'succeeded' | 'pending' | 'failed';
  amount: number;
  currency: string;
  receiptUrl?: string;
  message: string;
}

export interface SubscriptionResult {
  success: boolean;
  subscriptionId: string;
  status: 'active' | 'pending' | 'canceled';
  currentPeriodEnd: Date;
  message: string;
}

// Sample products for demonstration
export function generateSampleProducts(): StripeProduct[] {
  return [
    {
      id: 'prod_ai_course',
      name: 'AI Marketing Masterclass',
      description: 'Lerne wie du mit AI automatisiert Geld verdienst',
      type: 'one_time',
      price: 99.99,
      currency: 'EUR',
      image: '/products/ai-course.jpg',
      isActive: true
    },
    {
      id: 'prod_affiliate_toolkit',
      name: 'Affiliate Marketing Toolkit',
      description: 'Komplettes Toolkit für Affiliate Marketing Erfolg',
      type: 'one_time',
      price: 49.99,
      currency: 'EUR',
      image: '/products/toolkit.jpg',
      isActive: true
    },
    {
      id: 'prod_premium_monthly',
      name: 'Premium Membership (Monatlich)',
      description: 'Zugang zu allen Premium Features',
      type: 'subscription',
      price: 29.99,
      currency: 'EUR',
      image: '/products/premium.jpg',
      isActive: true
    },
    {
      id: 'prod_premium_yearly',
      name: 'Premium Membership (Jährlich)',
      description: 'Zugang zu allen Premium Features - 2 Monate sparen',
      type: 'subscription',
      price: 299.99,
      currency: 'EUR',
      image: '/products/premium-yearly.jpg',
      isActive: true
    },
    {
      id: 'prod_agency_service',
      name: 'Agency Setup Service',
      description: 'Wir richten deinen kompletten Affiliate Agent auf',
      type: 'one_time',
      price: 499.99,
      currency: 'EUR',
      image: '/products/agency.jpg',
      isActive: true
    }
  ];
}

export function generateCheckoutSession(productId: string, userId: number): StripeCheckoutSession {
  const products = generateSampleProducts();
  const product = products.find(p => p.id === productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const sessionId = `cs_${Date.now()}_${userId}`;
  const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo';

  return {
    sessionId,
    publishableKey,
    successUrl: `${process.env.VITE_FRONTEND_URL || 'https://affiliagent.xyz'}/checkout/success?session_id=${sessionId}`,
    cancelUrl: `${process.env.VITE_FRONTEND_URL || 'https://affiliagent.xyz'}/checkout/cancel`
  };
}

export function processPayment(productId: string, amount: number, paymentMethodId: string): PaymentResult {
  const paymentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Simulate payment processing
  const isSuccessful = Math.random() > 0.05; // 95% success rate

  return {
    success: isSuccessful,
    paymentId,
    status: isSuccessful ? 'succeeded' : 'failed',
    amount,
    currency: 'EUR',
    receiptUrl: isSuccessful ? `https://receipts.stripe.com/${paymentId}` : undefined,
    message: isSuccessful 
      ? `Zahlung erfolgreich verarbeitet. Zahlungs-ID: ${paymentId}`
      : 'Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.'
  };
}

export function createSubscription(productId: string, userId: number, billingInterval: 'month' | 'year'): SubscriptionResult {
  const subscriptionId = `sub_${Date.now()}_${userId}`;
  const currentDate = new Date();
  const currentPeriodEnd = new Date();
  
  if (billingInterval === 'month') {
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
  } else {
    currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
  }

  return {
    success: true,
    subscriptionId,
    status: 'active',
    currentPeriodEnd,
    message: `Abonnement erfolgreich erstellt. Nächste Abrechnung: ${currentPeriodEnd.toLocaleDateString('de-DE')}`
  };
}

export function cancelSubscription(subscriptionId: string): SubscriptionResult {
  return {
    success: true,
    subscriptionId,
    status: 'canceled',
    currentPeriodEnd: new Date(),
    message: 'Abonnement erfolgreich gekündigt. Zugriff endet am Ende der aktuellen Abrechnungsperiode.'
  };
}

export function generatePaymentMethods(): { id: string; name: string; icon: string }[] {
  return [
    { id: 'card', name: 'Kreditkarte', icon: '💳' },
    { id: 'sepa_debit', name: 'SEPA Lastschrift', icon: '🏦' },
    { id: 'ideal', name: 'iDEAL', icon: '🇳🇱' },
    { id: 'giropay', name: 'giropay', icon: '🇩🇪' },
    { id: 'eps', name: 'eps', icon: '🇦🇹' },
    { id: 'sofort', name: 'Sofort', icon: '💰' }
  ];
}

export function generateBillingPortal(customerId: string): { portalUrl: string; expiresAt: Date } {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  return {
    portalUrl: `https://billing.stripe.com/p/session/${customerId}_${Date.now()}`,
    expiresAt
  };
}

export function calculateSubscriptionCost(basePrice: number, billingInterval: 'month' | 'year'): {
  monthlyPrice: number;
  annualPrice: number;
  savings: number;
  savingsPercent: number;
} {
  const monthlyPrice = basePrice;
  const annualPrice = basePrice * 12 * 0.9; // 10% discount for annual
  const savings = (basePrice * 12) - annualPrice;
  const savingsPercent = (savings / (basePrice * 12)) * 100;

  return {
    monthlyPrice,
    annualPrice,
    savings: Math.round(savings * 100) / 100,
    savingsPercent: Math.round(savingsPercent * 100) / 100
  };
}

export function generateInvoice(paymentId: string, amount: number, productName: string): {
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: string;
  downloadUrl: string;
} {
  const date = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  const invoiceNumber = `INV-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return {
    invoiceNumber,
    date,
    dueDate,
    amount,
    status: 'paid',
    downloadUrl: `https://invoices.stripe.com/${invoiceNumber}.pdf`
  };
}

export function generatePaymentHistory(userId: number): Array<{
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: string;
  receiptUrl?: string;
}> {
  const history = [];
  const products = generateSampleProducts();
  
  for (let i = 0; i < 5; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));

    history.push({
      id: `pi_${Date.now()}_${i}`,
      date,
      description: product.name,
      amount: product.price,
      status: 'succeeded',
      receiptUrl: `https://receipts.stripe.com/pi_${Date.now()}_${i}`
    });
  }

  return history;
}

export function generateStripeSetupGuide(): string {
  return `
# Stripe Setup Anleitung

## Schritt 1: Stripe Account erstellen
1. Gehe zu https://stripe.com
2. Klicke "Jetzt starten"
3. Melde dich mit deiner Email an
4. Verifiziere deine Identität

## Schritt 2: API Keys kopieren
1. Gehe zu Dashboard → Entwickler → API-Schlüssel
2. Kopiere deinen "Publishable Key"
3. Kopiere deinen "Secret Key"
4. Speichere diese sicher

## Schritt 3: Produkte erstellen
1. Gehe zu Katalog → Produkte
2. Klicke "Neues Produkt"
3. Gib Name, Beschreibung und Preis ein
4. Speichere das Produkt

## Schritt 4: Zahlungsmethoden aktivieren
1. Gehe zu Einstellungen → Zahlungsmethoden
2. Aktiviere alle gewünschten Methoden
3. Konfiguriere die Einstellungen

## Schritt 5: Webhook konfigurieren
1. Gehe zu Entwickler → Webhooks
2. Klicke "Endpoint hinzufügen"
3. Gib deine Website URL ein
4. Wähle die Events aus

## Fertig! 🎉
Deine Website kann jetzt Zahlungen verarbeiten.

## Tipps:
- Nutze Test-Modus für Entwicklung
- Verwende Test-Kartennummern: 4242 4242 4242 4242
- Aktiviere 3D Secure für mehr Sicherheit
- Richte Benachrichtigungen ein
  `;
}

export function generatePricingPlans(): Array<{
  name: string;
  price: number;
  billingInterval: 'month' | 'year';
  features: string[];
  popular: boolean;
}> {
  return [
    {
      name: 'Starter',
      price: 29.99,
      billingInterval: 'month',
      features: [
        'Bis zu 5 Produkte',
        'Basis Analytics',
        'Email Support',
        'Stripe Integration'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 79.99,
      billingInterval: 'month',
      features: [
        'Unbegrenzte Produkte',
        'Erweiterte Analytics',
        'Prioritäts Support',
        'Stripe + PayPal Integration',
        'A/B Testing',
        'Email Marketing'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199.99,
      billingInterval: 'month',
      features: [
        'Alles aus Professional',
        'Dedizierter Account Manager',
        'Custom Integrations',
        'API Access',
        'White Label Option',
        'Priority Support'
      ],
      popular: false
    }
  ];
}

export function generatePaymentSecurity(): {
  feature: string;
  description: string;
  icon: string;
}[] {
  return [
    {
      feature: 'PCI DSS Compliance',
      description: 'Höchste Sicherheitsstandards für Zahlungsdaten',
      icon: '🔒'
    },
    {
      feature: '3D Secure',
      description: 'Zusätzliche Authentifizierung für Kreditkarten',
      icon: '🛡️'
    },
    {
      feature: 'Fraud Detection',
      description: 'Automatische Betrugserkennung',
      icon: '🚨'
    },
    {
      feature: 'SSL Encryption',
      description: 'Verschlüsselte Datenübertragung',
      icon: '🔐'
    },
    {
      feature: 'Tokenization',
      description: 'Sichere Speicherung von Zahlungsdaten',
      icon: '🎫'
    },
    {
      feature: 'Compliance',
      description: 'GDPR und lokale Datenschutzgesetze',
      icon: '✅'
    }
  ];
}
