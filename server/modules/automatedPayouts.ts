/**
 * Automated Payouts Module
 * Handles automatic payouts via PayPal and Stripe
 * - Threshold-based payouts (€100, €500, €1000)
 * - Scheduled payouts (daily, weekly)
 * - Tax calculation
 * - Invoice generation
 */

export interface PayoutConfig {
  method: "paypal" | "stripe";
  thresholds: number[]; // [100, 500, 1000]
  frequency: "daily" | "weekly" | "monthly";
  taxRate: number; // 0.19 for Germany
  recipientEmail?: string;
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    accountHolder: string;
  };
}

export interface PayoutRecord {
  id: string;
  amount: number;
  currency: string;
  method: "paypal" | "stripe";
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  completedAt?: Date;
  transactionId?: string;
  taxAmount: number;
  netAmount: number;
}

// ============= Threshold-Based Payouts =============
export async function checkPayoutThreshold(currentBalance: number, thresholds: number[]) {
  const nextThreshold = thresholds.find(t => currentBalance >= t);

  if (nextThreshold) {
    return {
      shouldPayout: true,
      threshold: nextThreshold,
      amount: currentBalance,
      reason: `Balance reached €${nextThreshold} threshold`,
    };
  }

  return {
    shouldPayout: false,
    nextThreshold: thresholds.find(t => t > currentBalance),
    currentBalance,
    reason: "Below payout threshold",
  };
}

// ============= Calculate Tax =============
export async function calculateTax(grossAmount: number, taxRate: number = 0.19) {
  const taxAmount = grossAmount * taxRate;
  const netAmount = grossAmount - taxAmount;

  return {
    grossAmount,
    taxRate: (taxRate * 100).toFixed(1),
    taxAmount: Math.round(taxAmount * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
  };
}

// ============= Generate Invoice =============
export interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  period: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  payoutMethod: string;
  recipientEmail: string;
  description: string;
}

export async function generateInvoice(data: InvoiceData) {
  return {
    invoiceNumber: data.invoiceNumber,
    date: data.date,
    period: data.period,
    lineItems: [
      {
        description: "Affiliate Marketing Revenue",
        amount: data.grossAmount,
      },
    ],
    subtotal: data.grossAmount,
    tax: {
      rate: 19,
      amount: data.taxAmount,
    },
    total: data.netAmount,
    paymentMethod: data.paymentMethod,
    recipientEmail: data.recipientEmail,
    status: "generated",
    pdfUrl: `/invoices/${data.invoiceNumber}.pdf`,
  };
}

// ============= PayPal Payout =============
export interface PayPalPayoutRequest {
  amount: number;
  currency: string;
  recipientEmail: string;
  note: string;
}

export async function createPayPalPayout(request: PayPalPayoutRequest, config: PayoutConfig) {
  const taxCalculation = await calculateTax(request.amount, config.taxRate);

  const payout: PayoutRecord = {
    id: `payout_${Math.random().toString(36).substr(2, 9)}`,
    amount: request.amount,
    currency: request.currency,
    method: "paypal",
    status: "pending",
    createdAt: new Date(),
    taxAmount: taxCalculation.taxAmount,
    netAmount: taxCalculation.netAmount,
  };

  // In production, this would call PayPal API
  // await paypalClient.createPayout({
  //   sender_batch_header: {
  //     sender_batch_id: payout.id,
  //     email_subject: "You have a payment",
  //   },
  //   items: [{
  //     recipient_type: "EMAIL",
  //     amount: {
  //       value: taxCalculation.netAmount.toString(),
  //       currency: request.currency,
  //     },
  //     receiver: request.recipientEmail,
  //     note: request.note,
  //   }],
  // });

  return payout;
}

// ============= Stripe Payout =============
export interface StripePayoutRequest {
  amount: number;
  currency: string;
  bankAccountId: string;
  description: string;
}

export async function createStripePayout(request: StripePayoutRequest, config: PayoutConfig) {
  const taxCalculation = await calculateTax(request.amount, config.taxRate);

  const payout: PayoutRecord = {
    id: `stripe_payout_${Math.random().toString(36).substr(2, 9)}`,
    amount: request.amount,
    currency: request.currency,
    method: "stripe",
    status: "pending",
    createdAt: new Date(),
    taxAmount: taxCalculation.taxAmount,
    netAmount: taxCalculation.netAmount,
  };

  // In production, this would call Stripe API
  // const stripePayout = await stripe.payouts.create({
  //   amount: Math.round(taxCalculation.netAmount * 100),
  //   currency: request.currency.toLowerCase(),
  //   destination: request.bankAccountId,
  //   description: request.description,
  // });
  // payout.transactionId = stripePayout.id;

  return payout;
}

// ============= Scheduled Payouts =============
export interface ScheduledPayoutConfig {
  frequency: "daily" | "weekly" | "monthly";
  time: string; // "09:00" format
  minAmount: number;
  method: "paypal" | "stripe";
}

export async function schedulePayouts(config: ScheduledPayoutConfig) {
  const schedules = {
    daily: "0 9 * * *", // 9 AM every day
    weekly: "0 9 * * 1", // 9 AM every Monday
    monthly: "0 9 1 * *", // 9 AM on 1st of month
  };

  return {
    schedule: schedules[config.frequency],
    frequency: config.frequency,
    time: config.time,
    minAmount: config.minAmount,
    method: config.method,
    status: "scheduled",
    nextRun: calculateNextRun(config.frequency),
  };
}

function calculateNextRun(frequency: string): Date {
  const now = new Date();
  const next = new Date(now);

  switch (frequency) {
    case "daily":
      next.setDate(next.getDate() + 1);
      break;
    case "weekly":
      next.setDate(next.getDate() + (8 - next.getDay()));
      break;
    case "monthly":
      next.setMonth(next.getMonth() + 1);
      next.setDate(1);
      break;
  }

  next.setHours(9, 0, 0, 0);
  return next;
}

// ============= Payout History =============
export async function getPayoutHistory(userId: number, limit: number = 50) {
  // In production, this would query the database
  return {
    userId,
    payouts: [
      {
        id: "payout_001",
        amount: 500,
        currency: "EUR",
        method: "paypal",
        status: "completed",
        createdAt: new Date(Date.now() - 86400000 * 7),
        completedAt: new Date(Date.now() - 86400000 * 6),
        taxAmount: 95,
        netAmount: 405,
      },
      {
        id: "payout_002",
        amount: 1000,
        currency: "EUR",
        method: "stripe",
        status: "completed",
        createdAt: new Date(Date.now() - 86400000 * 14),
        completedAt: new Date(Date.now() - 86400000 * 12),
        taxAmount: 190,
        netAmount: 810,
      },
    ],
    totalPaidOut: 1215,
    totalTaxPaid: 285,
    averagePayoutAmount: 607.5,
    lastPayoutDate: new Date(Date.now() - 86400000 * 6),
  };
}

// ============= Payout Statistics =============
export async function getPayoutStatistics(userId: number) {
  const history = await getPayoutHistory(userId, 100);

  return {
    totalPayouts: history.payouts.length,
    totalAmount: history.totalPaidOut,
    totalTax: history.totalTaxPaid,
    averagePayoutAmount: history.averagePayoutAmount,
    payoutMethods: {
      paypal: history.payouts.filter(p => p.method === "paypal").length,
      stripe: history.payouts.filter(p => p.method === "stripe").length,
    },
    payoutStatuses: {
      completed: history.payouts.filter(p => p.status === "completed").length,
      pending: history.payouts.filter(p => p.status === "pending").length,
      failed: history.payouts.filter(p => p.status === "failed").length,
    },
    lastPayoutDate: history.lastPayoutDate,
    nextScheduledPayout: calculateNextRun("daily"),
  };
}

// ============= Payout Dashboard Data =============
export async function getPayoutDashboardData(userId: number) {
  const stats = await getPayoutStatistics(userId);
  const history = await getPayoutHistory(userId, 10);

  return {
    statistics: stats,
    recentPayouts: history.payouts.slice(0, 5),
    monthlyPayoutTrend: [
      { month: "Jan", amount: 2000 },
      { month: "Feb", amount: 2500 },
      { month: "Mar", amount: 3200 },
      { month: "Apr", amount: 4100 },
      { month: "May", amount: 5200 },
      { month: "Jun", amount: 6500 },
    ],
    payoutMethodBreakdown: [
      { method: "PayPal", percentage: 60, amount: 3900 },
      { method: "Stripe", percentage: 40, amount: 2600 },
    ],
  };
}
