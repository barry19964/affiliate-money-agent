import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertCircle, CheckCircle2, Clock, DollarSign, TrendingUp } from "lucide-react";

export function PayPalDashboard() {
  const [paypalEmail, setPaypalEmail] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [minimumAmount, setMinimumAmount] = useState(10);

  // Fetch PayPal stats
  const { data: stats, isLoading: statsLoading } = trpc.paypal.getDashboardStats.useQuery();

  // Fetch payout history
  const { data: historyData, isLoading: historyLoading } = trpc.paypal.getPayoutHistory.useQuery();

  // Setup scheduled payout mutation
  const setupPayoutMutation = trpc.paypal.setupScheduledPayout.useMutation();

  // Send immediate payout mutation
  const sendPayoutMutation = trpc.paypal.sendPayout.useMutation();

  // Test connection mutation
  const testConnectionMutation = trpc.paypal.testConnection.useMutation();

  const handleSetupScheduledPayout = async () => {
    if (!paypalEmail) {
      alert("Bitte geben Sie Ihre PayPal-Email ein");
      return;
    }

    try {
      const result = await setupPayoutMutation.mutateAsync({
        paypalEmail,
        frequency,
        minimumAmount,
      });

      if (result.success) {
        alert("Geplante Auszahlung erfolgreich eingerichtet!");
        setPaypalEmail("");
      } else {
        alert("Fehler beim Einrichten der Auszahlung");
      }
    } catch (error) {
      alert("Fehler: " + (error instanceof Error ? error.message : "Unbekannter Fehler"));
    }
  };

  const handleSendImmediatePayout = async () => {
    if (!paypalEmail || !stats?.totalRevenue) {
      alert("PayPal-Email erforderlich und es muss Guthaben vorhanden sein");
      return;
    }

    try {
      const result = await sendPayoutMutation.mutateAsync({
        email: paypalEmail,
        amount: stats.totalRevenue,
      });

      if (result.success) {
        alert("Auszahlung erfolgreich versendet!");
      } else {
        alert("Fehler: " + result.error);
      }
    } catch (error) {
      alert("Fehler: " + (error instanceof Error ? error.message : "Unbekannter Fehler"));
    }
  };

  const handleTestConnection = async () => {
    try {
      const result = await testConnectionMutation.mutateAsync();
      if (result.success) {
        alert("✅ PayPal-Verbindung erfolgreich!");
      } else {
        alert("❌ Fehler: " + result.message);
      }
    } catch (error) {
      alert("Fehler: " + (error instanceof Error ? error.message : "Unbekannter Fehler"));
    }
  };

  // Mock data for charts
  const payoutHistory = [
    { date: "Mo", amount: 150 },
    { date: "Di", amount: 200 },
    { date: "Mi", amount: 180 },
    { date: "Do", amount: 220 },
    { date: "Fr", amount: 250 },
    { date: "Sa", amount: 190 },
    { date: "So", amount: 210 },
  ];

  const revenueByChannel = [
    { channel: "Google Ads", revenue: 450 },
    { channel: "Email", revenue: 320 },
    { channel: "Social", revenue: 280 },
    { channel: "Affiliate", revenue: 150 },
    { channel: "Produkte", revenue: 200 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Revenue Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamteinnahmen</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats?.totalRevenue?.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-muted-foreground">Verfügbar zur Auszahlung</p>
          </CardContent>
        </Card>

        {/* Pending Payout Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausstehend</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats?.pendingPayout?.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-muted-foreground">Nächste geplante Auszahlung</p>
          </CardContent>
        </Card>

        {/* Last Payout Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Letzte Auszahlung</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats && "lastPayoutDate" in stats && stats.lastPayoutDate
                ? new Date(stats.lastPayoutDate).toLocaleDateString("de-DE")
                : "Keine"}
            </div>
            <p className="text-xs text-muted-foreground">Auszahlungsdatum</p>
          </CardContent>
        </Card>

        {/* Next Payout Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nächste Auszahlung</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats && "nextPayoutDate" in stats && stats.nextPayoutDate
                ? new Date(stats.nextPayoutDate).toLocaleDateString("de-DE")
                : "Nicht geplant"}
            </div>
            <p className="text-xs text-muted-foreground">{stats && "payoutFrequency" in stats ? stats.payoutFrequency || "—" : "—"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Payout Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Auszahlungskonfiguration</CardTitle>
          <CardDescription>Richten Sie automatische PayPal-Auszahlungen ein</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="paypal-email">PayPal-Email</Label>
              <Input
                id="paypal-email"
                type="email"
                placeholder="your@paypal.com"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Auszahlungshäufigkeit</Label>
              <Select value={frequency} onValueChange={(value) => setFrequency(value as any)}>
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Täglich</SelectItem>
                  <SelectItem value="weekly">Wöchentlich</SelectItem>
                  <SelectItem value="monthly">Monatlich</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimum">Mindestbetrag (€)</Label>
              <Input
                id="minimum"
                type="number"
                min="1"
                value={minimumAmount}
                onChange={(e) => setMinimumAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSetupScheduledPayout} disabled={setupPayoutMutation.isPending}>
              {setupPayoutMutation.isPending ? "Wird eingerichtet..." : "Geplante Auszahlung einrichten"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSendImmediatePayout}
              disabled={sendPayoutMutation.isPending || !stats?.totalRevenue}
            >
              {sendPayoutMutation.isPending ? "Wird versendet..." : "Sofort auszahlen"}
            </Button>
            <Button variant="ghost" onClick={handleTestConnection} disabled={testConnectionMutation.isPending}>
              {testConnectionMutation.isPending ? "Wird getestet..." : "Verbindung testen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Channel */}
      <Card>
        <CardHeader>
          <CardTitle>Einnahmen nach Kanal</CardTitle>
          <CardDescription>Verteilung der Einnahmen auf verschiedene Kanäle</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByChannel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payout History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Auszahlungsverlauf</CardTitle>
          <CardDescription>Letzte 7 Tage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={payoutHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" name="Auszahlung (€)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payout History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Geplante Auszahlungen</CardTitle>
          <CardDescription>Ihre konfigurierte Auszahlungsplanung</CardDescription>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <p>Wird geladen...</p>
          ) : historyData?.payouts && historyData.payouts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">PayPal-Email</th>
                    <th className="text-left py-2 px-4">Häufigkeit</th>
                    <th className="text-left py-2 px-4">Mindestbetrag</th>
                    <th className="text-left py-2 px-4">Nächste Auszahlung</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.payouts.map((payout: any) => (
                    <tr key={payout.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{payout.paypalEmail}</td>
                      <td className="py-2 px-4 capitalize">{payout.frequency}</td>
                      <td className="py-2 px-4">€{payout.minimumAmount.toFixed(2)}</td>
                      <td className="py-2 px-4">
                        {new Date(payout.nextPayoutDate).toLocaleDateString("de-DE")}
                      </td>
                      <td className="py-2 px-4">
                        {payout.isActive ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" /> Aktiv
                          </span>
                        ) : (
                          <span className="text-red-600">Inaktiv</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">Keine geplanten Auszahlungen</p>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Wichtige Informationen
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>✅ Automatische Auszahlungen sind aktiviert und laufen 24/7</p>
          <p>✅ Alle Einnahmen werden automatisch auf Ihr PayPal-Konto überwiesen</p>
          <p>✅ Auszahlungen erfolgen nach Ihrer konfigurierten Häufigkeit</p>
          <p>✅ Mindestbeträge verhindern zu viele kleine Transaktionen</p>
          <p>💡 Tipp: Stellen Sie den Mindestbetrag auf €10-20 für optimale Auszahlungen</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PayPalDashboard;
