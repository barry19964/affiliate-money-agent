import { getDb } from "../db";
import { stripePayments } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * PayPal Integration Module
 * Handles all PayPal payout operations for the affiliate money agent
 * Supports: Google Ads, Email Marketing, Social Media, Affiliate Links, Product Sales, Subscriptions
 */

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: "sandbox" | "live";
  webhookId?: string;
}

interface PayoutRequest {
  email: string;
  amount: number;
  currency: string;
  note?: string;
  senderBatchId: string;
}

interface PayoutResponse {
  success: boolean;
  batchId?: string;
  transactionId?: string;
  error?: string;
}

/**
 * PayPal Configuration
 */
export const paypalConfig: PayPalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID || "",
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || "",
  mode: (process.env.PAYPAL_MODE as "sandbox" | "live") || "sandbox",
  webhookId: process.env.PAYPAL_WEBHOOK_ID,
};

/**
 * Get PayPal Access Token
 */
export async function getPayPalAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(
      `${paypalConfig.clientId}:${paypalConfig.clientSecret}`
    ).toString("base64");

    const url =
      paypalConfig.mode === "sandbox"
        ? "https://api.sandbox.paypal.com/v1/oauth2/token"
        : "https://api.paypal.com/v1/oauth2/token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error);
    throw error;
  }
}

/**
 * Send Payout to PayPal
 */
export async function sendPayoutToPayPal(
  request: PayoutRequest
): Promise<PayoutResponse> {
  try {
    const accessToken = await getPayPalAccessToken();

    const url =
      paypalConfig.mode === "sandbox"
        ? "https://api.sandbox.paypal.com/v1/payments/payouts"
        : "https://api.paypal.com/v1/payments/payouts";

    const payload = {
      sender_batch_header: {
        sender_batch_id: request.senderBatchId,
        email_subject: "You have a payment",
        email_message: request.note || "You have received a payment",
      },
      items: [
        {
          recipient_type: "EMAIL",
          amount: {
            value: request.amount.toFixed(2),
            currency: request.currency,
          },
          description: "Affiliate Money Agent Payout",
          receiver: request.email,
          note: request.note || "Payout from Affiliate Money Agent",
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      batch_header?: { payout_batch_id: string };
      message?: string;
    };

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "PayPal payout failed",
      };
    }

    return {
      success: true,
      batchId: data.batch_header?.payout_batch_id,
    };
  } catch (error) {
    console.error("Error sending payout to PayPal:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get Payout Status from PayPal
 */
export async function getPayoutStatus(batchId: string): Promise<{
  status: string;
  items: Array<{ status: string; amount: number }>;
}> {
  try {
    const accessToken = await getPayPalAccessToken();

    const url =
      paypalConfig.mode === "sandbox"
        ? `https://api.sandbox.paypal.com/v1/payments/payouts/${batchId}`
        : `https://api.paypal.com/v1/payments/payouts/${batchId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as {
      batch_header?: { batch_status: string };
      items?: Array<{ transfer_status: string; amount: { value: string } }>;
    };

    return {
      status: data.batch_header?.batch_status || "UNKNOWN",
      items: (data.items || []).map((item) => ({
        status: item.transfer_status,
        amount: parseFloat(item.amount.value),
      })),
    };
  } catch (error) {
    console.error("Error getting payout status:", error);
    throw error;
  }
}

/**
 * Calculate Total Revenue from All Channels
 */
export async function calculateTotalRevenue(userId: number): Promise<number> {
  try {
    const db = await getDb();
    if (!db) return 0;

    // Get all payments for user
    const payments = await db
      .select()
      .from(stripePayments)
      .where(eq(stripePayments.userId, userId));

    return payments.reduce((sum: number, payment: any) => {
      return sum + (parseFloat(payment.amount) || 0);
    }, 0);
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    return 0;
  }
}

/**
 * Create Scheduled Payout
 */
export interface ScheduledPayout {
  id: string;
  userId: number;
  paypalEmail: string;
  frequency: "daily" | "weekly" | "monthly";
  minimumAmount: number;
  lastPayoutDate?: Date;
  nextPayoutDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const scheduledPayouts: Map<string, ScheduledPayout> = new Map();

/**
 * Setup Scheduled Payout
 */
export function setupScheduledPayout(
  userId: number,
  paypalEmail: string,
  frequency: "daily" | "weekly" | "monthly",
  minimumAmount: number = 10
): ScheduledPayout {
  const id = `payout-${userId}-${Date.now()}`;

  const nextPayoutDate = new Date();
  if (frequency === "daily") {
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
  } else if (frequency === "weekly") {
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 7);
  } else if (frequency === "monthly") {
    nextPayoutDate.setMonth(nextPayoutDate.getMonth() + 1);
  }

  const payout: ScheduledPayout = {
    id,
    userId,
    paypalEmail,
    frequency,
    minimumAmount,
    nextPayoutDate,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  scheduledPayouts.set(id, payout);
  return payout;
}

/**
 * Process Scheduled Payouts
 */
export async function processScheduledPayouts(): Promise<void> {
  const now = new Date();
  const entries: Array<[string, ScheduledPayout]> = [];
  scheduledPayouts.forEach((payout, id) => {
    entries.push([id, payout]);
  });

  for (const [id, payout] of entries) {
    if (!payout.isActive || payout.nextPayoutDate > now) {
      continue;
    }

    try {
      const totalRevenue = await calculateTotalRevenue(payout.userId);

      if (totalRevenue >= payout.minimumAmount) {
        const result = await sendPayoutToPayPal({
          email: payout.paypalEmail,
          amount: totalRevenue,
          currency: "EUR",
          note: `Affiliate Money Agent Payout - ${payout.frequency}`,
          senderBatchId: `batch-${payout.userId}-${Date.now()}`,
        });

        if (result.success) {
          payout.lastPayoutDate = new Date();

          // Calculate next payout date
          const nextDate = new Date();
          if (payout.frequency === "daily") {
            nextDate.setDate(nextDate.getDate() + 1);
          } else if (payout.frequency === "weekly") {
            nextDate.setDate(nextDate.getDate() + 7);
          } else if (payout.frequency === "monthly") {
            nextDate.setMonth(nextDate.getMonth() + 1);
          }
          payout.nextPayoutDate = nextDate;
          payout.updatedAt = new Date();

          console.log(
            `[PayPal] Payout processed for user ${payout.userId}: €${totalRevenue.toFixed(2)}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Error processing payout for user ${payout.userId}:`,
        error
      );
    }
  }
}

/**
 * Get Payout History
 */
export function getPayoutHistory(userId: number): ScheduledPayout[] {
  const payouts: ScheduledPayout[] = [];
  scheduledPayouts.forEach((payout) => {
    if (payout.userId === userId) {
      payouts.push(payout);
    }
  });
  return payouts;
}

/**
 * Update Scheduled Payout
 */
export function updateScheduledPayout(
  id: string,
  updates: Partial<ScheduledPayout>
): ScheduledPayout | null {
  const payout = scheduledPayouts.get(id);
  if (!payout) return null;

  const updated = { ...payout, ...updates, updatedAt: new Date() };
  scheduledPayouts.set(id, updated);
  return updated;
}

/**
 * Cancel Scheduled Payout
 */
export function cancelScheduledPayout(id: string): boolean {
  const payout = scheduledPayouts.get(id);
  if (!payout) return false;

  payout.isActive = false;
  payout.updatedAt = new Date();
  scheduledPayouts.set(id, payout);
  return true;
}

/**
 * Get PayPal Dashboard Stats
 */
export async function getPayPalDashboardStats(userId: number): Promise<{
  totalRevenue: number;
  pendingPayout: number;
  lastPayoutDate?: Date;
  nextPayoutDate?: Date;
  payoutFrequency?: string;
}> {
  try {
    const totalRevenue = await calculateTotalRevenue(userId);
    const payouts = getPayoutHistory(userId);
    const activePayouts = payouts.filter((p) => p.isActive);

    return {
      totalRevenue,
      pendingPayout: totalRevenue,
      lastPayoutDate: activePayouts[0]?.lastPayoutDate,
      nextPayoutDate: activePayouts[0]?.nextPayoutDate,
      payoutFrequency: activePayouts[0]?.frequency,
    };
  } catch (error) {
    console.error("Error getting PayPal dashboard stats:", error);
    return {
      totalRevenue: 0,
      pendingPayout: 0,
    };
  }
}

export default {
  getPayPalAccessToken,
  sendPayoutToPayPal,
  getPayoutStatus,
  calculateTotalRevenue,
  setupScheduledPayout,
  processScheduledPayouts,
  getPayoutHistory,
  updateScheduledPayout,
  cancelScheduledPayout,
  getPayPalDashboardStats,
};
