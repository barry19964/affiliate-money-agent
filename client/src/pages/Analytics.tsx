import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { trpc } from "@/lib/trpc";

export default function Analytics() {
  // Fetch GSC data
  const gscVerification = trpc.gscVerification.getVerificationSteps.useQuery();
  const trafficTimeline = trpc.gscVerification.getTrafficTimeline.useQuery();
  const revenueProjection = trpc.gscVerification.getRevenueProjection.useQuery();
  const trafficChannels = trpc.traffic.getChannels.useQuery();
  const totalTraffic = trpc.traffic.getTotalTraffic.useQuery();
  const seoOptimizations = trpc.traffic.getSEOOptimizations.useQuery();

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Analytics & Prognosen</h1>
          <p className="text-muted-foreground mt-2">
            Überwache deine Affiliate-Verdienste, Traffic und Rankings
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monatliche Verdienste
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalTraffic.data?.totalRevenue?.toFixed(0) || 0}</div>
              <p className="text-xs text-green-600 mt-1">+12% diese Woche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monatliche Besucher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTraffic.data?.totalTraffic?.toLocaleString() || 0}</div>
              <p className="text-xs text-green-600 mt-1">+8% diese Woche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTraffic.data?.totalConversions?.toLocaleString() || 0}</div>
              <p className="text-xs text-blue-600 mt-1">Rate: {(totalTraffic.data?.avgConversionRate || 0) * 100}%</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTraffic.data?.topChannel?.name || "N/A"}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalTraffic.data?.topChannel?.monthlyTraffic?.toLocaleString() || 0} Besucher
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <Tabs defaultValue="traffic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="revenue">Verdienste</TabsTrigger>
            <TabsTrigger value="channels">Kanäle</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Traffic Chart */}
          <TabsContent value="traffic">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Traffic-Prognose (12 Monate)</CardTitle>
                <CardDescription>
                  Erwarteter Traffic basierend auf SEO-Optimierung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueProjection.data || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="traffic"
                      stroke="#3b82f6"
                      name="Besucher"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Chart */}
          <TabsContent value="revenue">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Revenue-Prognose (12 Monate)</CardTitle>
                <CardDescription>
                  Erwartete Verdienste basierend auf Traffic und Conversion Rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueProjection.data || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Verdienste (€)" />
                    <Bar dataKey="cumulative" fill="#3b82f6" name="Kumulativ (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Traffic Channels */}
          <TabsContent value="channels">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Traffic nach Kanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficChannels.data || []}
                        dataKey="monthlyTraffic"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {trafficChannels.data?.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Kanal-Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trafficChannels.data?.map((channel) => (
                    <div key={channel.name} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">{channel.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {channel.conversionRate * 100}% Conversion Rate
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{channel.monthlyTraffic.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Besucher</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO Optimizations */}
          <TabsContent value="seo">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>SEO-Optimierungsprioritäten</CardTitle>
                <CardDescription>
                  Keywords mit dem höchsten Potenzial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoOptimizations.data?.map((optimization) => (
                    <div
                      key={optimization.keyword}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{optimization.keyword}</p>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Rank: {optimization.currentRank}</span>
                          <span>→ Ziel: {optimization.targetRank}</span>
                          <span>Vol: {optimization.searchVolume.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          +{optimization.estimatedTraffic} Besucher
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {optimization.priority === "high" && "🔴 Hoch"}
                          {optimization.priority === "medium" && "🟡 Mittel"}
                          {optimization.priority === "low" && "🟢 Niedrig"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* GSC Setup Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Google Search Console Setup</CardTitle>
            <CardDescription>
              Folge diesen Schritten, um deine Website bei Google zu registrieren
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gscVerification.data?.map((step) => (
                <div key={step.step} className="flex gap-4 pb-4 border-b last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    <p className="text-sm text-blue-600 mt-2">{step.action}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {step.estimatedTime} Min
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Erwartete Traffic-Entwicklung</CardTitle>
            <CardDescription>
              Realistische Prognose basierend auf SEO-Best-Practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trafficTimeline.data?.map((item) => (
                <div key={item.week} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium">Woche {item.week}</p>
                    <p className="text-sm text-muted-foreground">{item.milestone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.expectedTraffic.toLocaleString()} Besucher</p>
                    <p className="text-sm text-green-600">€{item.expectedRevenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
