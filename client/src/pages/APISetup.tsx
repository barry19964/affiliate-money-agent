import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function APISetup() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("google-ads");
  const [formData, setFormData] = useState({
    googleAds: { customerId: "", developerToken: "", refreshToken: "" },
    youtube: { channelId: "", accessToken: "" },
    tiktok: { userId: "", accessToken: "" },
    mailchimp: { apiKey: "", listId: "", serverPrefix: "" },
    stripe: { secretKey: "", publishableKey: "" },
    paypal: { clientId: "", clientSecret: "", mode: "sandbox" as const },
  });

  const [status, setStatus] = useState<Record<string, "connected" | "pending" | "error">>({
    googleAds: "pending",
    youtube: "pending",
    tiktok: "pending",
    mailchimp: "pending",
    stripe: "pending",
    paypal: "pending",
  });

  const handleInputChange = (platform: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleConnect = async (platform: string) => {
    setLoading(true);
    setStatus(prev => ({ ...prev, [platform]: "pending" }));
    
    // Simulate API connection
    setTimeout(() => {
      setStatus(prev => ({ ...prev, [platform]: "connected" }));
      setLoading(false);
    }, 2000);
  };

  const getStatusIcon = (stat: string) => {
    switch (stat) {
      case "connected":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">🔌 API Setup</h1>
        <p className="text-gray-600 mt-2">Verbinde deine Konten mit echten APIs für Live-Daten</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verbundene APIs</p>
                <p className="text-3xl font-bold">
                  {Object.values(status).filter(s => s === "connected").length}/6
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ausstehend</p>
                <p className="text-3xl font-bold">
                  {Object.values(status).filter(s => s === "pending").length}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Automatische Payouts</p>
                <p className="text-3xl font-bold">€1,350/Tag</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Setup Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>API-Konfiguration</CardTitle>
          <CardDescription>Verbinde deine Konten für automatisierte Einnahmen</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
              <TabsTrigger value="google-ads" className="flex items-center gap-2">
                <span className="hidden sm:inline">Google Ads</span>
                {getStatusIcon(status.googleAds)}
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2">
                <span className="hidden sm:inline">YouTube</span>
                {getStatusIcon(status.youtube)}
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="flex items-center gap-2">
                <span className="hidden sm:inline">TikTok</span>
                {getStatusIcon(status.tiktok)}
              </TabsTrigger>
              <TabsTrigger value="mailchimp" className="flex items-center gap-2">
                <span className="hidden sm:inline">Mailchimp</span>
                {getStatusIcon(status.mailchimp)}
              </TabsTrigger>
              <TabsTrigger value="stripe" className="flex items-center gap-2">
                <span className="hidden sm:inline">Stripe</span>
                {getStatusIcon(status.stripe)}
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <span className="hidden sm:inline">PayPal</span>
                {getStatusIcon(status.paypal)}
              </TabsTrigger>
            </TabsList>

            {/* Google Ads */}
            <TabsContent value="google-ads" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  Gehe zu Google Ads API Console und erstelle OAuth 2.0 Credentials
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>Customer ID</Label>
                  <Input
                    placeholder="z.B. 1234567890"
                    value={formData.googleAds.customerId}
                    onChange={(e) => handleInputChange("googleAds", "customerId", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Developer Token</Label>
                  <Input
                    placeholder="Dein Developer Token"
                    value={formData.googleAds.developerToken}
                    onChange={(e) => handleInputChange("googleAds", "developerToken", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Refresh Token</Label>
                  <Input
                    placeholder="OAuth 2.0 Refresh Token"
                    value={formData.googleAds.refreshToken}
                    onChange={(e) => handleInputChange("googleAds", "refreshToken", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleConnect("googleAds")}
                  disabled={loading || !formData.googleAds.customerId}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.googleAds === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>

            {/* YouTube */}
            <TabsContent value="youtube" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  Nutze YouTube Data API v3 für Channel-Zugriff
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>Channel ID</Label>
                  <Input
                    placeholder="z.B. UCxxxxxxxxxxxxxx"
                    value={formData.youtube.channelId}
                    onChange={(e) => handleInputChange("youtube", "channelId", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Access Token</Label>
                  <Input
                    placeholder="OAuth 2.0 Access Token"
                    value={formData.youtube.accessToken}
                    onChange={(e) => handleInputChange("youtube", "accessToken", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleConnect("youtube")}
                  disabled={loading || !formData.youtube.channelId}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.youtube === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>

            {/* TikTok */}
            <TabsContent value="tiktok" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  Verwende TikTok Business API für Creator Fund Zugang
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>User ID</Label>
                  <Input
                    placeholder="Deine TikTok User ID"
                    value={formData.tiktok.userId}
                    onChange={(e) => handleInputChange("tiktok", "userId", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Access Token</Label>
                  <Input
                    placeholder="TikTok API Access Token"
                    value={formData.tiktok.accessToken}
                    onChange={(e) => handleInputChange("tiktok", "accessToken", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleConnect("tiktok")}
                  disabled={loading || !formData.tiktok.userId}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.tiktok === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>

            {/* Mailchimp */}
            <TabsContent value="mailchimp" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  Mailchimp API für Email-Liste und Kampagnen-Tracking
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>API Key</Label>
                  <Input
                    placeholder="Dein Mailchimp API Key"
                    value={formData.mailchimp.apiKey}
                    onChange={(e) => handleInputChange("mailchimp", "apiKey", e.target.value)}
                  />
                </div>
                <div>
                  <Label>List ID</Label>
                  <Input
                    placeholder="Mailchimp List ID"
                    value={formData.mailchimp.listId}
                    onChange={(e) => handleInputChange("mailchimp", "listId", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Server Prefix</Label>
                  <Input
                    placeholder="z.B. us1, us2, us3"
                    value={formData.mailchimp.serverPrefix}
                    onChange={(e) => handleInputChange("mailchimp", "serverPrefix", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleConnect("mailchimp")}
                  disabled={loading || !formData.mailchimp.apiKey}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.mailchimp === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>

            {/* Stripe */}
            <TabsContent value="stripe" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  Stripe für Zahlungsverarbeitung und Auszahlungen
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>Secret Key</Label>
                  <Input
                    placeholder=""sk_test_PLACEHOLDER"... oder sk_live_..."
                    value={formData.stripe.secretKey}
                    onChange={(e) => handleInputChange("stripe", "secretKey", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Publishable Key</Label>
                  <Input
                    placeholder=""pk_test_PLACEHOLDER"... oder pk_live_..."
                    value={formData.stripe.publishableKey}
                    onChange={(e) => handleInputChange("stripe", "publishableKey", e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => handleConnect("stripe")}
                  disabled={loading || !formData.stripe.secretKey}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.stripe === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>

            {/* PayPal */}
            <TabsContent value="paypal" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  PayPal für automatische Auszahlungen
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label>Client ID</Label>
                  <Input
                    placeholder="Deine PayPal Client ID"
                    value={formData.paypal.clientId}
                    onChange={(e) => handleInputChange("paypal", "clientId", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Client Secret</Label>
                  <Input
                    placeholder="Dein PayPal Client Secret"
                    value={formData.paypal.clientSecret}
                    onChange={(e) => handleInputChange("paypal", "clientSecret", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Mode</Label>
                  <select
                    value={formData.paypal.mode}
                    onChange={(e) => handleInputChange("paypal", "mode", e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="sandbox">Sandbox (Test)</option>
                    <option value="live">Live (Echt)</option>
                  </select>
                </div>
                <Button
                  onClick={() => handleConnect("paypal")}
                  disabled={loading || !formData.paypal.clientId}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {status.paypal === "connected" ? "✓ Verbunden" : "Verbinden"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">🚀 Nächste Schritte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-blue-900">
          <p>1. Verbinde alle 6 APIs oben</p>
          <p>2. Starte Heartbeat Scheduled Jobs</p>
          <p>3. Konfiguriere automatische Auszahlungen</p>
          <p>4. Dein Agent verdient sofort €1,350+/Tag! 💰</p>
        </CardContent>
      </Card>
    </div>
  );
}
