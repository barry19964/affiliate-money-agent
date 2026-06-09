/**
 * Email Notifications Module
 * Sends daily/weekly revenue reports and milestone notifications
 */

export interface EmailNotificationConfig {
  email: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  threshold: number; // Minimum revenue to trigger notification
  enabled: boolean;
}

export interface RevenueReport {
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  byChannel: {
    googleAds: number;
    email: number;
    social: number;
    affiliate: number;
  };
  growth: number; // percentage
  topChannel: string;
}

export function generateRevenueReportEmail(report: RevenueReport, email: string): string {
  const period = report.period === 'daily' ? 'Täglicher' : 
                 report.period === 'weekly' ? 'Wöchentlicher' : 
                 'Monatlicher';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
    .revenue-box { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; }
    .channel-box { background: #f9fafb; padding: 10px; margin: 10px 0; border-radius: 4px; }
    .footer { color: #666; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${period} Verdienst-Report</h1>
      <p>${report.startDate.toLocaleDateString('de-DE')} - ${report.endDate.toLocaleDateString('de-DE')}</p>
    </div>

    <div class="revenue-box">
      <h2 style="margin: 0; color: #10b981;">Gesamt Verdienste</h2>
      <p style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #10b981;">€${report.totalRevenue.toFixed(2)}</p>
      <p style="margin: 0; color: #666;">Wachstum: <span style="color: #10b981; font-weight: bold;">+${report.growth.toFixed(1)}%</span></p>
    </div>

    <h3>Verdienste nach Kanal:</h3>
    <div class="channel-box">
      <strong>Google Ads:</strong> €${report.byChannel.googleAds.toFixed(2)}
    </div>
    <div class="channel-box">
      <strong>Email Marketing:</strong> €${report.byChannel.email.toFixed(2)}
    </div>
    <div class="channel-box">
      <strong>Social Media:</strong> €${report.byChannel.social.toFixed(2)}
    </div>
    <div class="channel-box">
      <strong>Affiliate Links:</strong> €${report.byChannel.affiliate.toFixed(2)}
    </div>

    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>Top Kanal:</strong> ${report.topChannel}</p>
      <p style="margin: 5px 0; color: #666; font-size: 14px;">Dieser Kanal hat die meisten Verdienste generiert.</p>
    </div>

    <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <h4 style="margin-top: 0;">💡 Tipps zum Verdienste steigern:</h4>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>Optimiere deinen Top-Kanal (${report.topChannel}) für mehr Verdienste</li>
        <li>Baue deine Email-Liste auf für passive Einnahmen</li>
        <li>Poste konsistent auf Social Media</li>
        <li>Nutze High-CPC Keywords in deinem Content</li>
      </ul>
    </div>

    <div class="footer">
      <p>Dies ist ein automatischer Report von deinem Affiliate Money Agent.</p>
      <p>Melde dich an, um detaillierte Analysen zu sehen: <a href="https://affiliagent.xyz/revenue">Revenue Hub</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

export function generateMilestoneEmail(milestone: string, amount: number, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .celebration { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
    .amount { font-size: 48px; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="celebration">
      <h1>🎉 Glückwunsch!</h1>
      <p>Du hast einen wichtigen Meilenstein erreicht!</p>
      <div class="amount">€${amount.toFixed(2)}</div>
      <p style="font-size: 18px; margin: 20px 0;">${milestone}</p>
    </div>

    <div style="background: #f0fdf4; padding: 20px; margin: 20px 0; border-radius: 8px;">
      <h3>Nächste Schritte:</h3>
      <ul>
        <li>Überprüfe deine Auszahlungseinstellungen</li>
        <li>Optimiere deine Top-Performer Kanäle</li>
        <li>Baue deine Audience weiter auf</li>
        <li>Experimentiere mit neuen Inhalten</li>
      </ul>
    </div>

    <p style="text-align: center; color: #666;">
      <a href="https://affiliagent.xyz/revenue" style="color: #667eea; text-decoration: none; font-weight: bold;">Zum Revenue Hub</a>
    </p>
  </div>
</body>
</html>
  `;
}

export function generatePayoutNotificationEmail(amount: number, date: Date, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .payout-box { background: #f0fdf4; border: 2px solid #10b981; padding: 20px; border-radius: 8px; }
    .amount { font-size: 36px; font-weight: bold; color: #10b981; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>💰 Auszahlung verarbeitet</h2>
    
    <div class="payout-box">
      <p><strong>Auszahlungsbetrag:</strong></p>
      <div class="amount">€${amount.toFixed(2)}</div>
      
      <p><strong>Auszahlungsdatum:</strong> ${date.toLocaleDateString('de-DE')}</p>
      <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✓ Verarbeitet</span></p>
    </div>

    <div style="background: #f9fafb; padding: 15px; margin: 20px 0; border-radius: 8px;">
      <h4>Auszahlungsdetails:</h4>
      <ul style="margin: 10px 0;">
        <li>Zahlungsmethode: PayPal</li>
        <li>Bearbeitungszeit: 1-3 Geschäftstage</li>
        <li>Referenznummer: #${Math.random().toString(36).substring(7).toUpperCase()}</li>
      </ul>
    </div>

    <p style="color: #666; font-size: 14px;">
      Die Auszahlung sollte in 1-3 Geschäftstagen auf deinem PayPal-Konto ankommen.
    </p>
  </div>
</body>
</html>
  `;
}

export function calculateRevenueReport(
  dailyData: { googleAds: number; email: number; social: number; affiliate: number }[],
  period: 'daily' | 'weekly' | 'monthly'
): RevenueReport {
  const totalByChannel = {
    googleAds: 0,
    email: 0,
    social: 0,
    affiliate: 0
  };

  dailyData.forEach(day => {
    totalByChannel.googleAds += day.googleAds;
    totalByChannel.email += day.email;
    totalByChannel.social += day.social;
    totalByChannel.affiliate += day.affiliate;
  });

  const totalRevenue = Object.values(totalByChannel).reduce((a, b) => a + b, 0);
  
  const topChannel = Object.entries(totalByChannel).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];

  const startDate = new Date();
  const endDate = new Date();
  
  if (period === 'daily') {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === 'weekly') {
    startDate.setDate(startDate.getDate() - 7);
  } else {
    startDate.setDate(1);
  }

  return {
    period,
    startDate,
    endDate,
    totalRevenue,
    byChannel: totalByChannel,
    growth: Math.random() * 50, // Simulated growth
    topChannel: topChannel.charAt(0).toUpperCase() + topChannel.slice(1)
  };
}

export async function sendRevenueEmail(
  email: string,
  report: RevenueReport,
  type: 'report' | 'milestone' | 'payout',
  additionalData?: any
): Promise<boolean> {
  try {
    let htmlContent = '';
    
    if (type === 'report') {
      htmlContent = generateRevenueReportEmail(report, email);
    } else if (type === 'milestone') {
      htmlContent = generateMilestoneEmail(additionalData.milestone, additionalData.amount, email);
    } else if (type === 'payout') {
      htmlContent = generatePayoutNotificationEmail(additionalData.amount, additionalData.date, email);
    }

    // In production, this would call an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log it
    console.log(`Email sent to ${email}:`, htmlContent);
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function shouldSendNotification(
  config: EmailNotificationConfig,
  currentRevenue: number,
  lastNotificationRevenue: number
): boolean {
  if (!config.enabled) return false;
  
  const revenueDifference = currentRevenue - lastNotificationRevenue;
  
  if (revenueDifference < config.threshold) return false;
  
  return true;
}
