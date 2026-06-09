import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Video, Play, TrendingUp, Zap, Calendar } from "lucide-react";

export default function VideoGeneration() {
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");

  const platformData = {
    youtube: {
      name: "YouTube",
      icon: "▶️",
      cpm: 5,
      avgViews: 10000,
      monthlyRevenue: 5000,
      requirements: "1000 subscribers, 4000 watch hours",
      timeline: "3-6 months",
    },
    tiktok: {
      name: "TikTok",
      icon: "🎵",
      cpm: 2,
      avgViews: 50000,
      monthlyRevenue: 5000,
      requirements: "10000 followers",
      timeline: "1-2 months",
    },
    instagram: {
      name: "Instagram Reels",
      icon: "📸",
      cpm: 3,
      avgViews: 5000,
      monthlyRevenue: 3000,
      requirements: "10000 followers",
      timeline: "2-3 months",
    },
    twitter: {
      name: "Twitter/X",
      icon: "𝕏",
      cpm: 1.5,
      avgViews: 3000,
      monthlyRevenue: 1500,
      requirements: "5000 followers",
      timeline: "1-2 months",
    },
  };

  const videoCalendar = [
    { week: 1, videos: 2, views: 5000, revenue: 25 },
    { week: 2, videos: 3, views: 12000, revenue: 60 },
    { week: 3, videos: 3, views: 25000, revenue: 125 },
    { week: 4, videos: 4, views: 45000, revenue: 225 },
    { week: 5, videos: 4, views: 75000, revenue: 375 },
    { week: 6, videos: 5, views: 120000, revenue: 600 },
  ];

  const revenueTimeline = [
    { month: 1, revenue: 500, videos: 10 },
    { month: 2, revenue: 1500, videos: 20 },
    { month: 3, revenue: 3500, videos: 30 },
    { month: 4, revenue: 6000, videos: 40 },
    { month: 5, revenue: 9500, videos: 50 },
    { month: 6, revenue: 14000, videos: 60 },
  ];

  const platformStats = [
    { platform: "YouTube", revenue: 5000, videos: 15 },
    { platform: "TikTok", revenue: 5000, videos: 30 },
    { platform: "Instagram", revenue: 3000, videos: 20 },
    { platform: "Twitter", revenue: 1500, videos: 25 },
  ];

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  const currentPlatform = platformData[selectedPlatform as keyof typeof platformData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Video className="w-8 h-8 text-blue-600" />
            AI Video Generation
          </h1>
          <p className="text-gray-400 mt-1">Automatische Video-Erstellung für YouTube, TikTok, Instagram & mehr</p>
        </div>
        <Badge className="bg-green-600 text-white px-3 py-1">Aktiv</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Videos pro Woche</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">10-15</p>
            <p className="text-xs text-gray-400 mt-1">Automatisch generiert</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Durchschn. Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">50K+</p>
            <p className="text-xs text-gray-400 mt-1">Pro Video</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monatliche Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">€15K+</p>
            <p className="text-xs text-gray-400 mt-1">Potenzial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Zeitaufwand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">0 Min</p>
            <p className="text-xs text-gray-400 mt-1">Vollautomatisch</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platforms">Plattformen</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="optimization">Optimierung</TabsTrigger>
        </TabsList>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Video Plattformen</CardTitle>
                <CardDescription>Wähle eine Plattform zum Starten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(platformData).map(([key, platform]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      selectedPlatform === key
                        ? "border-blue-600 bg-blue-900 bg-opacity-20"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedPlatform(key)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{platform.name}</p>
                        <p className="text-xs text-gray-400">€{platform.cpm} CPM</p>
                      </div>
                      <span className="text-2xl">{platform.icon}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Platform Details */}
            <Card>
              <CardHeader>
                <CardTitle>{currentPlatform.name}</CardTitle>
                <CardDescription>Verdienst-Potenzial & Anforderungen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">CPM:</span>
                    <span className="font-semibold text-white">€{currentPlatform.cpm}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Durchschn. Views/Video:</span>
                    <span className="font-semibold text-blue-400">{currentPlatform.avgViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Monatl. Verdienst:</span>
                    <span className="font-semibold text-green-400">€{currentPlatform.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                    <span className="text-gray-400">Anforderungen:</span>
                    <span className="font-semibold text-purple-400 text-sm">{currentPlatform.requirements}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-900 bg-opacity-30 rounded border border-blue-700">
                    <span className="text-gray-400">Zeitrahmen:</span>
                    <span className="font-semibold text-blue-400">{currentPlatform.timeline}</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Videos Generieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video-Produktions-Kalender</CardTitle>
              <CardDescription>Geplante Videos für nächste 6 Wochen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={videoCalendar}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" label={{ value: "Woche", position: "insideBottomRight", offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: "Videos", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: "Views", angle: 90, position: "insideRight" }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="videos" fill="#3b82f6" name="Videos" />
                  <Bar yAxisId="right" dataKey="views" fill="#10b981" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geplante Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { title: "Top 10 AI Tools 2024", platform: "YouTube", status: "Generating", date: "Today" },
                  { title: "Passive Income Hacks", platform: "TikTok", status: "Uploading", date: "Tomorrow" },
                  { title: "Digital Marketing Tips", platform: "Instagram", status: "Scheduled", date: "In 2 days" },
                  { title: "Crypto Explained", platform: "YouTube", status: "Scheduled", date: "In 3 days" },
                  { title: "Remote Work Setup", platform: "TikTok", status: "Scheduled", date: "In 4 days" },
                ].map((video, idx) => (
                  <div key={idx} className="p-3 border border-gray-700 rounded-lg hover:border-gray-600 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{video.title}</p>
                        <p className="text-xs text-gray-400">{video.platform}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={video.status === "Generating" ? "text-blue-400" : video.status === "Uploading" ? "text-green-400" : "text-gray-400"}>
                          {video.status}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">{video.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Monats Revenue Prognose</CardTitle>
              <CardDescription>Erwartete Verdienste mit Video-Automation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: "Monat", position: "insideBottomRight", offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: "€ Revenue", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: "Videos", angle: 90, position: "insideRight" }} />
                  <Tooltip formatter={(value) => typeof value === "number" && value > 100 ? `€${value}` : value} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="Revenue (€)" />
                  <Line yAxisId="right" type="monotone" dataKey="videos" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} name="Videos" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform-Vergleich</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={platformStats} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: €${value}`} outerRadius={100} fill="#8884d8" dataKey="revenue">
                    {platformStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video-Optimierungs-Tipps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-700">
                  <p className="font-semibold text-blue-400 mb-2">Thumbnail Tipps</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Helle, kontrastierende Farben</li>
                    <li>✓ Text-Overlay (max 3 Wörter)</li>
                    <li>✓ Emotionale Gesichtsausdrücke</li>
                    <li>✓ Konsistentes Branding</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-900 bg-opacity-20 rounded-lg border border-purple-700">
                  <p className="font-semibold text-purple-400 mb-2">Titel Tipps</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Keywords in den ersten 3 Wörtern</li>
                    <li>✓ Unter 60 Zeichen</li>
                    <li>✓ Power-Wörter verwenden</li>
                    <li>✓ Zahlen einbinden wenn möglich</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-900 bg-opacity-20 rounded-lg border border-green-700">
                  <p className="font-semibold text-green-400 mb-2">Beschreibungs-Tipps</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Erste 2-3 Zeilen sind entscheidend</li>
                    <li>✓ Keywords natürlich einbauen</li>
                    <li>✓ Timestamps für lange Videos</li>
                    <li>✓ Call-to-Action einbinden</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-900 bg-opacity-20 rounded-lg border border-orange-700">
                  <p className="font-semibold text-orange-400 mb-2">Upload Tipps</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Zu Spitzenzeiten hochladen</li>
                    <li>✓ Playlists erstellen</li>
                    <li>✓ Monetisierung früh aktivieren</li>
                    <li>✓ Mobile-Optimierung</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Zap className="w-4 h-4 mr-2" />
                Video-Generierung Starten
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
