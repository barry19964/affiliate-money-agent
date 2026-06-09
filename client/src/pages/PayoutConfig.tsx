import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function PayoutConfig() {
  const [payoutMethod, setPayoutMethod] = useState<"paypal" | "stripe">("paypal");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [thresholds, setThresholds] = useState({
    threshold1: 100,
    threshold2: 500,
    threshold3: 1000,
  });
  const [recipientEmail, setRecipientEmail] = useState("");
  const [bankAccount, setBankAccount] = useState({
    accountNumber: "",
    routingNumber: "",
    accountHolder: "",
  });

  const payoutHistory = [
    {
      id: "payout_001",
      date: "2026-06-03",
      amount: 500,
      method: "PayPal",
      status: "completed",
      tax: 95,
      net: 405,
    },
    {
      id: "payout_002",
      date: "2026-06-02",
      amount: 1000,
      method: "Stripe",
      status: "completed",
      tax: 190,
      net: 810,
    },
    {
      id: "payout_003",
      date: "2026-06-01",
      amount: 750,
      method: "PayPal",
      status: "completed",
      tax: 142.5,
      net: 607.5,
    },
  ];

  const monthlyTrend = [
    { month: "Jan", payouts: 2000 },
    { month: "Feb", payouts: 2500 },
    { month: "Mar", payouts: 3200 },
    { month: "Apr", payouts: 4100 },
    { month: "May", payouts: 5200 },
    { month: "Jun", payouts: 6500 },
  ];

  const totalPaidOut = payoutHistory.reduce((sum, p) => sum + p.net, 0);
  const totalTax = payoutHistory.reduce((sum, p) => sum + p.tax, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">💰 Auszahlungskonfiguration</h1>
        <p className="text-gray-600 mt-2">Automatische Auszahlungen bei Schwellenwerten</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gesamt Ausgezahlt</p>
                <p className="text-2xl font-bold">€{totalPaidOut.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Steuern Gezahlt</p>
                <p className="text-2xl font-bold">€{totalTax.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Auszahlungen</p>
                <p className="text-2xl font-bold">{payoutHistory.length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Durchschnitt</p>
                <p className="text-2xl font-bold">€{(totalPaidOut / payoutHistory.length).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Auszahlungseinstellungen</CardTitle>
          <CardDescription>Konfiguriere automatische Auszahlungen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payout Method */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Auszahlungsmethode</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPayoutMethod("paypal")}
                className={`p-4 rounded-lg border-2 transition ${
                  payoutMethod === "paypal"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">🅿️</div>
                <p className="font-semibold">PayPal</p>
                <p className="text-sm text-gray-600">1-2 Tage</p>
              </button>
              <button
                onClick={() => setPayoutMethod("stripe")}
                className={`p-4 rounded-lg border-2 transition ${
                  payoutMethod === "stripe"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">💳</div>
                <p className="font-semibold">Stripe</p>
                <p className="text-sm text-gray-600">2-3 Tage</p>
              </button>
            </div>
          </div>

          {/* Recipient Email (PayPal) */}
          {payoutMethod === "paypal" && (
            <div>
              <Label>PayPal Email</Label>
              <Input
                placeholder="deine@email.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
          )}

          {/* Bank Account (Stripe) */}
          {payoutMethod === "stripe" && (
            <div className="space-y-4">
              <div>
                <Label>Kontoinhaber</Label>
                <Input
                  placeholder="Max Mustermann"
                  value={bankAccount.accountHolder}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountHolder: e.target.value })}
                />
              </div>
              <div>
                <Label>IBAN</Label>
                <Input
                  placeholder="DE89370400440532013000"
                  value={bankAccount.accountNumber}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
                />
              </div>
              <div>
                <Label>BIC</Label>
                <Input
                  placeholder="COBADEFFXXX"
                  value={bankAccount.routingNumber}
                  onChange={(e) => setBankAccount({ ...bankAccount, routingNumber: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Frequency */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Auszahlungshäufigkeit</Label>
            <div className="grid grid-cols-3 gap-3">
              {["daily", "weekly", "monthly"].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq as any)}
                  className={`p-3 rounded-lg border-2 transition ${
                    frequency === freq
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Calendar className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-semibold text-sm">
                    {freq === "daily" ? "Täglich" : freq === "weekly" ? "Wöchentlich" : "Monatlich"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Thresholds */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Auszahlungsschwellen</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm">Schwelle 1</Label>
                <Input
                  type="number"
                  value={thresholds.threshold1}
                  onChange={(e) => setThresholds({ ...thresholds, threshold1: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label className="text-sm">Schwelle 2</Label>
                <Input
                  type="number"
                  value={thresholds.threshold2}
                  onChange={(e) => setThresholds({ ...thresholds, threshold2: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label className="text-sm">Schwelle 3</Label>
                <Input
                  type="number"
                  value={thresholds.threshold3}
                  onChange={(e) => setThresholds({ ...thresholds, threshold3: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            ✓ Einstellungen Speichern
          </Button>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Auszahlungstrend</CardTitle>
          <CardDescription>Monatliche Auszahlungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyTrend.map((item) => (
              <div key={item.month} className="flex items-center justify-between">
                <p className="font-semibold">{item.month}</p>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div
                    className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                    style={{ width: `${(item.payouts / 6500) * 100}%` }}
                  />
                  <p className="font-bold text-right w-20">€{item.payouts.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Auszahlungsverlauf</CardTitle>
          <CardDescription>Letzte Auszahlungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold">{payout.date}</p>
                  <p className="text-sm text-gray-600">{payout.method}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">€{payout.net.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Brutto: €{payout.amount.toLocaleString()}</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Info */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-900">
          <p className="font-semibold mb-2">📊 Steuern</p>
          <p>Alle Auszahlungen werden mit 19% Steuersatz berechnet. Rechnungen werden automatisch generiert.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
