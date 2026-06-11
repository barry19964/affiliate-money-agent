import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, FileText, Link2, BarChart3 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function SEOOptimization() {
  const [selectedNiche, setSelectedNiche] = useState<string>("AI Tools & Automation");

  // Fetch SEO data
  const { data: keywords } = trpc.seoOptimization.getKeywordsByNiche.useQuery({
    niche: selectedNiche,
  });

  const { data: articleIdeas } = trpc.seoOptimization.generateArticleIdeas.useQuery({
    niche: selectedNiche,
    count: 20,
  });

  const { data: metrics } = trpc.seoOptimization.getSEOMetrics.useQuery();

  const { data: checklist } = trpc.seoOptimization.getSEOChecklist.useQuery();

  const { data: forecast } = trpc.seoOptimization.generateTrafficForecast.useQuery({
    articles: 20,
    averageKeywordDifficulty: 50,
  });

  const { data: backlinks } = trpc.seoOptimization.getBacklinkOpportunities.useQuery({
    niche: selectedNiche,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">SEO Optimization & Blog Strategy</h1>
        <p className="text-gray-400 mt-2">
          Generate SEO-optimized blog content, build backlinks, and dominate Google rankings
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Blog Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalArticles || 20}</div>
            <p className="text-xs text-gray-500">Generated & optimized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Target Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalKeywords || 50}</div>
            <p className="text-xs text-gray-500">High-value keywords</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Avg SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.averageSeoScore || 82}</div>
            <p className="text-xs text-gray-500">/100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Est. Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">€{forecast?.totalRevenue || 0}</div>
            <p className="text-xs text-gray-500">From organic traffic</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="keywords" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Target Keywords for {selectedNiche}</CardTitle>
              <CardDescription>High-value keywords ranked by difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keywords?.keywords.map((kw, idx) => (
                  <div key={idx} className="p-3 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{kw.keyword}</h3>
                      <Badge
                        variant={
                          kw.difficulty < 30
                            ? "default"
                            : kw.difficulty < 60
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {kw.difficulty < 30 ? "Easy" : kw.difficulty < 60 ? "Medium" : "Hard"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Search Volume</p>
                        <p className="font-semibold">{kw.searchVolume.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">CPC</p>
                        <p className="font-semibold text-green-500">€{kw.cpc.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Difficulty</p>
                        <p className="font-semibold">{kw.difficulty}/100</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Intent</p>
                        <p className="font-semibold capitalize">{kw.intent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Articles Tab */}
        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Content Calendar</CardTitle>
              <CardDescription>20 SEO-optimized articles ready to publish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {articleIdeas?.ideas.map((idea, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">{idea}</p>
                      <p className="text-xs text-gray-400">~2000 words, 10 min read</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>12-Month Traffic Forecast</CardTitle>
              <CardDescription>Projected organic traffic and revenue growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecast?.forecast.map((month, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">Month {month.month}</p>
                      <p className="text-sm text-gray-400">
                        {month.traffic.toLocaleString()} visitors
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-500">€{month.revenue.toFixed(2)}</p>
                      <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${Math.min((month.traffic / 5000) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Opportunities</CardTitle>
              <CardDescription>Top platforms to build backlinks for {selectedNiche}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {backlinks?.opportunities.map((opportunity, idx) => (
                  <div key={idx} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{opportunity}</p>
                        <p className="text-xs text-gray-400">High authority platform</p>
                      </div>
                      <Link2 className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Setup Checklist</CardTitle>
              <CardDescription>Complete all steps to maximize your SEO potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {checklist?.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="w-full" size="lg">
          <FileText className="w-4 h-4 mr-2" />
          Generate All Articles
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <Link2 className="w-4 h-4 mr-2" />
          Build Backlinks
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <TrendingUp className="w-4 h-4 mr-2" />
          Submit Sitemap
        </Button>
      </div>
    </div>
  );
}
