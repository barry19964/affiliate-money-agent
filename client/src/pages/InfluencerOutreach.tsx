import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Mail, TrendingUp, CheckCircle, Clock, DollarSign } from "lucide-react";

export default function InfluencerOutreach() {
  const [selectedInfluencer, setSelectedInfluencer] = useState(0);

  const influencers = [
    {
      name: "Alex Crypto",
      platform: "YouTube",
      followers: 250000,
      engagement: 8.5,
      niche: "Finance",
      costPerPost: 2000,
      estimatedReach: 37500,
      estimatedConversions: 750,
      estimatedRevenue: 18750,
      status: "Available",
    },
    {
      name: "Stock Market Sam",
      platform: "TikTok",
      followers: 500000,
      engagement: 12.3,
      niche: "Finance",
      costPerPost: 3000,
      estimatedReach: 75000,
      estimatedConversions: 1500,
      estimatedRevenue: 37500,
      status: "Available",
    },
    {
      name: "Fitness Fiona",
      platform: "Instagram",
      followers: 320000,
      engagement: 9.8,
      niche: "Health",
      costPerPost: 1800,
      estimatedReach: 48000,
      estimatedConversions: 960,
      estimatedRevenue: 24000,
      status: "Negotiating",
    },
    {
      name: "Tech Guru Greg",
      platform: "YouTube",
      followers: 550000,
      engagement: 11.2,
      niche: "Technology",
      costPerPost: 3500,
      estimatedReach: 82500,
      estimatedConversions: 1650,
      estimatedRevenue: 41250,
      status: "Available",
    },
  ];

  const campaignTimeline = [
    { week: 1, campaigns: 0, revenue: 0, status: "Outreach" },
    { week: 2, campaigns: 2, revenue: 0, status: "Negotiation" },
    { week: 3, campaigns: 4, revenue: 0, status: "Preparation" },
    { week: 4, campaigns: 4, revenue: 5000, status: "Live" },
    { week: 5, campaigns: 6, revenue: 15000, status: "Scaling" },
    { week: 6, campaigns: 8, revenue: 30000, status: "Optimization" },
    { week: 8, campaigns: 12, revenue: 60000, status: "Full Scale" },
  ];

  const platformStats = [
    { platform: "YouTube", influencers: 3, avgCost: 2500, avgReach: 60000, revenue: 45000 },
    { platform: "TikTok", influencers: 2, avgCost: 2000, avgReach: 100000, revenue: 50000 },
    { platform: "Instagram", influencers: 4, avgCost: 1500, avgReach: 40000, revenue: 30000 },
    { platform: "LinkedIn", influencers: 2, avgCost: 1200, avgReach: 20000, revenue: 12000 },
  ];

  const currentInfluencer = influencers[selectedInfluencer];
  const totalBudget = influencers.reduce((sum, inf) => sum + inf.costPerPost, 0);
  const totalRevenue = influencers.reduce((sum, inf) => sum + inf.estimatedRevenue, 0);
  const totalROI = ((totalRevenue - totalBudget) / totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Influencer Outreach
          </h1>
          <p className="text-gray-400 mt-1">Automatische Influencer-Kooperationen & Kampagnen</p>
        </div>
        <Badge className="bg-green-600 text-white px-3 py-1">Aktiv</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Verfügbare Influencer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{influencers.length}</p>
            <p className="text-xs text-gray-400 mt-1">In deiner Nische</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Gesamtbudget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">€{totalBudget.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Für alle Kampagnen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Geschätzter Verdienst</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">€{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Potenzial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">+{Math.round(totalROI)}%</p>
            <p className="text-xs text-gray-400 mt-1">Return on Investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="influencers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="influencers">Influencer</TabsTrigger>
          <TabsTrigger value="campaigns">Kampagnen</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Influencers Tab */}
        <TabsContent value="influencers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Influencer List */}
            <Card>
              <CardHeader>
                <CardTitle>Top Influencer</CardTitle>
                <CardDescription>Nach Verdienst-Potenzial sortiert</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {influencers.map((inf, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      selectedInfluencer === idx
                        ? "border-blue-600 bg-blue-900 bg-opacity-20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedInfluencer(idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{inf.name}</p>
                        <p className="text-xs text-gray-400">{inf.platform} • {inf.followers.toLocaleString()} Follower</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400">€{inf.estimatedRevenue.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs mt-1">{inf.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Influencer Details */}
            <Card>
              <CardHeader>
                <CardTitle>{currentInfluencer.name}</CardTitle>
                <CardDescription>{currentInfluencer.platform} • {currentInfluencer.niche} Niche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Follower:</span>
                    <span className="font-semibold text-white">{currentInfluencer.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Engagement Rate:</span>
                    <span className="font-semibold text-blue-400">{currentInfluencer.engagement}%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Kosten pro Post:</span>
                    <span className="font-semibold text-purple-400">€{currentInfluencer.costPerPost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Geschätzte Reichweite:</span>
                    <span className="font-semibold text-green-400">{currentInfluencer.estimatedReach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Erwartete Conversions:</span>
                    <span className="font-semibold text-orange-400">{currentInfluencer.estimatedConversions}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-900 bg-opacity-30 rounded border border-blue-700">
                    <span className="text-gray-400">Geschätzter Verdienst:</span>
                    <span className="font-semibold text-green-400">€{currentInfluencer.estimatedRevenue.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Pitch-Email Generieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktive Kampagnen</CardTitle>
              <CardDescription>Übersicht aller laufenden Kooperationen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { influencer: "Alex Crypto", type: "Product Review", status: "In Negotiation", revenue: "€18,750" },
                  { influencer: "Stock Market Sam", type: "Affiliate Promotion", status: "Accepted", revenue: "€37,500" },
                  { influencer: "Tech Guru Greg", type: "Sponsored Post", status: "Content Creation", revenue: "€41,250" },
                  { influencer: "Fitness Fiona", type: "Collaboration", status: "Pending", revenue: "€24,000" },
                ].map((campaign, idx) => (
                  <div key={idx} className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{campaign.influencer}</p>
                        <p className="text-sm text-gray-400">{campaign.type}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            campaign.status === "Accepted"
                              ? "text-green-400"
                              : campaign.status === "Content Creation"
                              ? "text-blue-400"
                              : "text-yellow-400"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        <p className="text-sm font-semibold text-green-400 mt-2">{campaign.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampagnen-Timeline</CardTitle>
              <CardDescription>Erwartete Revenue-Entwicklung</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" label={{ value: "Woche", position: "insideBottomRight", offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: "€ Revenue", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: "Kampagnen", angle: 90, position: "insideRight" }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="Revenue (€)" />
                  <Line yAxisId="right" type="monotone" dataKey="campaigns" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} name="Kampagnen" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform-Analyse</CardTitle>
              <CardDescription>Performance nach Platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue (€)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-300">
                <p>✓ Wähle Influencer mit hohem Engagement (&gt;5%)</p>
                <p>✓ Ziel-Audience muss zu deinem Produkt passen</p>
                <p>✓ Authentische Kooperationen = bessere Conversions</p>
                <p>✓ Langfristige Beziehungen aufbauen</p>
                <p>✓ Performance tracken und optimieren</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nächste Schritte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Neue Kampagne Starten
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Analysieren
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Zahlungen Verwalten
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
