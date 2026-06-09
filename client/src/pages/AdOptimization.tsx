import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { TrendingUp, Zap, Target, AlertCircle } from "lucide-react";

export default function AdOptimization() {
  const [selectedCampaign, setSelectedCampaign] = useState(0);

  const campaigns = [
    {
      name: "Finance Keywords",
      platform: "Google Ads",
      budget: 500,
      spend: 450,
      revenue: 1125,
      ctr: 2.8,
      cpc: 0.95,
      cpa: 45,
      roas: 2.5,
      status: "Optimizing",
      trend: "up",
    },
    {
      name: "Insurance Ads",
      platform: "Google Ads",
      budget: 300,
      spend: 280,
      revenue: 980,
      ctr: 3.2,
      cpc: 1.2,
      cpa: 38,
      roas: 3.5,
      status: "Active",
      trend: "up",
    },
    {
      name: "Tech Products",
      platform: "Facebook Ads",
      budget: 400,
      spend: 350,
      revenue: 700,
      ctr: 1.5,
      cpc: 0.65,
      cpa: 55,
      roas: 2.0,
      status: "Paused",
      trend: "down",
    },
    {
      name: "Health Supplements",
      platform: "Google Ads",
      budget: 250,
      spend: 240,
      revenue: 960,
      ctr: 2.1,
      cpc: 0.8,
      cpa: 50,
      roas: 4.0,
      status: "Active",
      trend: "up",
    },
  ];

  const performanceTimeline = [
    { day: "Mon", spend: 150, revenue: 375, conversions: 8 },
    { day: "Tue", spend: 160, revenue: 400, conversions: 9 },
    { day: "Wed", spend: 155, revenue: 388, conversions: 8 },
    { day: "Thu", spend: 170, revenue: 425, conversions: 10 },
    { day: "Fri", spend: 165, revenue: 412, conversions: 9 },
    { day: "Sat", spend: 140, revenue: 350, conversions: 7 },
    { day: "Sun", spend: 130, revenue: 325, conversions: 6 },
  ];

  const recommendations = [
    {
      title: "Pause Low-Performing Keywords",
      impact: "high",
      savings: "€150/week",
      description: "5 Keywords haben ROAS < 1.5",
    },
    {
      title: "Increase Budget for Top Performers",
      impact: "high",
      savings: "€200/week additional revenue",
      description: "Insurance Ads haben 3.5 ROAS",
    },
    {
      title: "Improve Ad Copy",
      impact: "medium",
      savings: "€100/week",
      description: "CTR ist unter 2%, sollte 3%+ sein",
    },
    {
      title: "Test New Landing Pages",
      impact: "medium",
      savings: "€75/week",
      description: "Conversion Rate kann um 25% steigen",
    },
  ];

  const budgetAllocation = [
    { campaign: "Finance", allocated: 300, recommended: 350, difference: 50 },
    { campaign: "Insurance", allocated: 200, recommended: 250, difference: 50 },
    { campaign: "Tech", allocated: 150, recommended: 100, difference: -50 },
    { campaign: "Health", allocated: 150, recommended: 150, difference: 0 },
  ];

  const currentCampaign = campaigns[selectedCampaign];
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            Ad Spend Optimization
          </h1>
          <p className="text-gray-400 mt-1">Automatische Google Ads & Facebook Ads Optimierung</p>
        </div>
        <Badge className="bg-green-600 text-white px-3 py-1">Aktiv</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tägliches Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">€{totalBudget}</p>
            <p className="text-xs text-gray-400 mt-1">Alle Kampagnen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Ausgegeben</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">€{totalSpend}</p>
            <p className="text-xs text-gray-400 mt-1">{Math.round((totalSpend / totalBudget) * 100)}% des Budgets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">€{totalRevenue}</p>
            <p className="text-xs text-gray-400 mt-1">Heute</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{totalROAS.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Return on Ad Spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Gewinn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">€{(totalRevenue - totalSpend).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Heute</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Kampagnen</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campaign List */}
            <Card>
              <CardHeader>
                <CardTitle>Aktive Kampagnen</CardTitle>
                <CardDescription>Sortiert nach ROAS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {campaigns.map((campaign, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      selectedCampaign === idx
                        ? "border-blue-600 bg-blue-900 bg-opacity-20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedCampaign(idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{campaign.name}</p>
                        <p className="text-xs text-gray-400">{campaign.platform}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400">ROAS {campaign.roas}</p>
                        <Badge variant="outline" className={campaign.trend === "up" ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                          {campaign.trend === "up" ? "↑" : "↓"} {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <CardTitle>{currentCampaign.name}</CardTitle>
                <CardDescription>{currentCampaign.platform}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-semibold text-white">€{currentCampaign.budget}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Ausgegeben:</span>
                    <span className="font-semibold text-purple-400">€{currentCampaign.spend}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">CTR:</span>
                    <span className="font-semibold text-blue-400">{currentCampaign.ctr}%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">CPC:</span>
                    <span className="font-semibold text-purple-400">€{currentCampaign.cpc}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">CPA:</span>
                    <span className="font-semibold text-orange-400">€{currentCampaign.cpa}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-900 bg-opacity-30 rounded border border-blue-700">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="font-semibold text-green-400">€{currentCampaign.revenue}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Optimieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wöchentliche Performance</CardTitle>
              <CardDescription>Ausgaben vs. Umsatz</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" label={{ value: "€", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: "Conversions", angle: 90, position: "insideRight" }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="spend" fill="#ef4444" name="Spend" />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar yAxisId="right" dataKey="conversions" fill="#3b82f6" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget-Allokation</CardTitle>
              <CardDescription>Empfohlene vs. Aktuelle Aufteilung</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetAllocation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campaign" />
                  <YAxis label={{ value: "€", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="#3b82f6" name="Aktuell" />
                  <Bar dataKey="recommended" fill="#10b981" name="Empfohlen" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimierungs-Aktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {budgetAllocation.map((item, idx) => (
                <div key={idx} className="p-3 border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.campaign}</span>
                    <span className={`font-semibold ${item.difference > 0 ? "text-green-400" : item.difference < 0 ? "text-red-400" : "text-gray-400"}`}>
                      {item.difference > 0 ? "+" : ""}{item.difference} €
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.allocated} € → {item.recommended} €
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Optimierungs-Empfehlungen</CardTitle>
              <CardDescription>Automatisch generiert basierend auf Performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${rec.impact === "high" ? "border-red-700 bg-red-900 bg-opacity-20" : "border-yellow-700 bg-yellow-900 bg-opacity-20"}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${rec.impact === "high" ? "text-red-400" : "text-yellow-400"}`} />
                    <div className="flex-1">
                      <p className="font-semibold text-white">{rec.title}</p>
                      <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                      <p className={`text-sm font-semibold mt-2 ${rec.impact === "high" ? "text-red-400" : "text-yellow-400"}`}>
                        Potenzial: {rec.savings}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Alle Empfehlungen Anwenden
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
