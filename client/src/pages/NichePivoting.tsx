import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Target, Zap, ArrowRight } from "lucide-react";

export default function NichePivoting() {
  const [selectedNiche, setSelectedNiche] = useState("Finance & Investing");

  const niches = [
    { name: "Finance & Investing", cpc: 8.5, revenue: 5000, viral: 65, trend: "rising" },
    { name: "Health & Medical", cpc: 7.2, revenue: 4500, viral: 75, trend: "rising" },
    { name: "Technology & Software", cpc: 6.8, revenue: 4200, viral: 70, trend: "rising" },
    { name: "Insurance & Legal", cpc: 9.2, revenue: 5500, viral: 40, trend: "stable" },
    { name: "Real Estate", cpc: 8.9, revenue: 5300, viral: 55, trend: "rising" },
    { name: "Business & Entrepreneurship", cpc: 6.2, revenue: 3800, viral: 70, trend: "rising" },
  ];

  const pivotTimeline = [
    { week: 1, revenue: 500, status: "Research & Planning" },
    { week: 2, revenue: 550, status: "Create Content" },
    { week: 3, revenue: 600, status: "Build Email List" },
    { week: 4, revenue: 700, status: "Setup Affiliate" },
    { week: 5, revenue: 850, status: "Social Promotion" },
    { week: 6, revenue: 1000, status: "First Conversions" },
    { week: 8, revenue: 1250, status: "Optimization" },
    { week: 12, revenue: 1500, status: "Full Implementation" },
  ];

  const revenueComparison = [
    { niche: "Current", revenue: 500 },
    { niche: "Finance", revenue: 1250 },
    { niche: "Insurance", revenue: 1375 },
    { niche: "Real Estate", revenue: 1325 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            Niche Pivoting System
          </h1>
          <p className="text-gray-400 mt-1">Automatisch zu höher bezahlten Nischen wechseln</p>
        </div>
        <Badge className="bg-green-600 text-white px-3 py-1">Aktiv</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Aktuelle Nische</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">Tech</p>
            <p className="text-xs text-gray-400 mt-1">€6.8 CPC</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Beste Nische</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">Insurance</p>
            <p className="text-xs text-gray-400 mt-1">€9.2 CPC</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Mögliche Steigerung</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">+175%</p>
            <p className="text-xs text-gray-400 mt-1">Verdienst</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Zeitaufwand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">2-4 Wo</p>
            <p className="text-xs text-gray-400 mt-1">Implementierung</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="niches">Nischen</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="strategy">Strategie</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Potential Vergleich</CardTitle>
              <CardDescription>Monatliches Verdienst-Potenzial nach Nische</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="niche" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Empfehlung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700">
                  <p className="font-semibold text-blue-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Wechsel zu Insurance & Legal
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Höchster CPC (€9.2) + stabiler Trend = €5500/Monat Potenzial
                  </p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Pivot-Plan Generieren
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ROI Berechnung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Implementierungs-Kosten:</span>
                    <span className="text-white font-semibold">€500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monatliche Steigerung:</span>
                    <span className="text-green-400 font-semibold">+€875</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
                    <span className="text-gray-400">Payback Period:</span>
                    <span className="text-blue-400 font-semibold">0.6 Monate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI:</span>
                    <span className="text-purple-400 font-semibold">+175%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Niches Tab */}
        <TabsContent value="niches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verfügbare Nischen</CardTitle>
              <CardDescription>Sortiert nach Verdienst-Potenzial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {niches.map((niche, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      selectedNiche === niche.name
                        ? "border-blue-600 bg-blue-900 bg-opacity-20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedNiche(niche.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{niche.name}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-400">
                          <span>CPC: €{niche.cpc}</span>
                          <span>Monthly: €{niche.revenue}</span>
                          <span>Viral: {niche.viral}%</span>
                          <Badge variant="outline" className={niche.trend === "rising" ? "text-green-400" : "text-gray-400"}>
                            {niche.trend}
                          </Badge>
                        </div>
                      </div>
                      <TrendingUp className={`w-5 h-5 ${niche.trend === "rising" ? "text-green-400" : "text-gray-400"}`} />
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
              <CardTitle>Pivot-Implementierungs-Timeline</CardTitle>
              <CardDescription>Erwartete Verdienste nach Woche</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pivotTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" label={{ value: "Woche", position: "insideBottomRight", offset: -5 }} />
                  <YAxis label={{ value: "€ Verdienst", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meilensteine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pivotTimeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-gray-900">
                    <div className="w-12 h-12 rounded-full bg-blue-900 bg-opacity-30 flex items-center justify-center text-sm font-semibold text-blue-400">
                      W{item.week}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{item.status}</p>
                      <p className="text-sm text-gray-400">€{item.revenue}/Monat</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hybrid-Nischen-Strategie</CardTitle>
              <CardDescription>Kombiniere mehrere Nischen für maximale Verdienste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-700">
                  <p className="text-sm text-gray-400">Primär (50%)</p>
                  <p className="font-semibold text-blue-400 mt-1">Finance & Investing</p>
                  <p className="text-xs text-gray-500 mt-2">€2500/Monat</p>
                </div>
                <div className="p-4 bg-purple-900 bg-opacity-20 rounded-lg border border-purple-700">
                  <p className="text-sm text-gray-400">Sekundär (30%)</p>
                  <p className="font-semibold text-purple-400 mt-1">Insurance & Legal</p>
                  <p className="text-xs text-gray-500 mt-2">€1650/Monat</p>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-20 rounded-lg border border-green-700">
                  <p className="text-sm text-gray-400">Tertiär (20%)</p>
                  <p className="font-semibold text-green-400 mt-1">Real Estate</p>
                  <p className="text-xs text-gray-500 mt-2">€1060/Monat</p>
                </div>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <p className="font-semibold text-white mb-3">Implementierungs-Schritte:</p>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li>1. Recherchiere Keywords für jede Nische</li>
                  <li>2. Erstelle 5-10 Artikel pro Nische</li>
                  <li>3. Baue separate Email-Listen auf</li>
                  <li>4. Setup Affiliate-Links pro Nische</li>
                  <li>5. Bewerbe auf verschiedenen Kanälen</li>
                  <li>6. Überwache und optimiere Performance</li>
                </ol>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Hybrid-Strategie Starten
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
