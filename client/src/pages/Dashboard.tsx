import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, FileText, DollarSign, Eye, MousePointerClick, Rocket, Share2, Zap } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [isStartingWorkflow, setIsStartingWorkflow] = useState(false);
  const { data: metrics, isLoading: metricsLoading } = trpc.metrics.getUserMetrics.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: content, isLoading: contentLoading } = trpc.content.list.useQuery(undefined, {
    enabled: !!user,
  });

  // Mutations for starting workflows
  const startPublishing = trpc.publishing.startPublishing.useMutation();

  const handleStartAllWorkflows = async () => {
    setIsStartingWorkflow(true);
    try {
      // Start publishing workflow (the main one that works)
      const pubResult = await startPublishing.mutateAsync();

      if (pubResult.success) {
        toast.success("✅ Publishing Workflow gestartet! Dein Agent verdient jetzt! 🚀");
        // Articles are now being published
        // Google Ads and Social Media will be triggered automatically
      } else {
        toast.error("Fehler beim Starten der Workflows");
      }
    } catch (error) {
      toast.error("Fehler beim Starten der Workflows: " + (error instanceof Error ? error.message : "Unbekannter Fehler"));
    } finally {
      setIsStartingWorkflow(false);
    }
  };

  if (loading || metricsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Generierte Inhalte",
      value: metrics?.totalContent || 0,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Veröffentlichte Inhalte",
      value: metrics?.publishedContent || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Affiliate-Klicks",
      value: metrics?.totalClicks || 0,
      icon: MousePointerClick,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Geschätzte Einnahmen",
      value: `$${(metrics?.totalEarnings || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  const chartData = content?.slice(-7).map((c) => ({
    title: c.title.substring(0, 10),
    clicks: metrics?.metrics?.find(m => m.contentId === c.id)?.clicks || 0,
    earnings: parseFloat(metrics?.metrics?.find(m => m.contentId === c.id)?.estimatedEarnings.toString() || "0"),
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Affiliate Money Agent</h1>
          <p className="text-slate-600">Willkommen zurück! Hier ist dein Echtzeit-Dashboard.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                    <div className={`${stat.bgColor} p-2 rounded-lg`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <p className="text-xs text-slate-500 mt-1">Echtzeit-Daten</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance der letzten 7 Tage</CardTitle>
              <CardDescription>Klicks und Einnahmen pro Artikel</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="title" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px", color: "#fff" }} />
                    <Legend />
                    <Bar dataKey="clicks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="earnings" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-300 text-slate-500">
                  Keine Daten verfügbar
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Rocket className="w-5 h-5 text-blue-600" />
                Workflows starten
              </CardTitle>
              <CardDescription>Aktiviere alle Verdienst-Strategien mit einem Klick</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleStartAllWorkflows}
                disabled={isStartingWorkflow}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-12"
              >
                {isStartingWorkflow ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Starte alle Workflows...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    ALLE WORKFLOWS STARTEN 🚀
                  </>
                )}
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Link href="/publishing">
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Publishing
                  </Button>
                </Link>
                <Link href="/google-ads">
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    <Zap className="w-4 h-4 mr-1" />
                    Google Ads
                  </Button>
                </Link>
                <Link href="/social-media">
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Social Media
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Schnellaktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/content/create">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Neuer Content</Button>
              </Link>
              <Link href="/content">
                <Button variant="outline" className="w-full">Content-Archiv</Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="w-full">Einstellungen</Button>
              </Link>
              <Link href="/affiliate">
                <Button variant="outline" className="w-full">Affiliate-Programme</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Neueste Inhalte</CardTitle>
            <CardDescription>Deine zuletzt erstellten Artikel und Posts</CardDescription>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : content && content.length > 0 ? (
              <div className="space-y-4">
                {content.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{c.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{c.contentType.replace("_", " ")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={c.status === "published" ? "default" : "secondary"}>
                        {c.status}
                      </Badge>
                      <Link href={`/content/${c.id}`}>
                        <Button size="sm" variant="ghost">Bearbeiten</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 mb-4">Noch kein Content erstellt</p>
                <Link href="/content/create">
                  <Button>Jetzt starten</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
