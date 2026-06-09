import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, BarChart3, DollarSign } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function NicheOptimization() {
  const [selectedNiche, setSelectedNiche] = useState<string>("AI Tools & Automation");
  const [budget, setBudget] = useState<number>(500);

  // Fetch niche data
  const { data: topNiches } = trpc.nicheOptimization.getTopNiches.useQuery({
    count: 5,
  });

  const { data: allNiches } = trpc.nicheOptimization.getAllNichesWithScores.useQuery();

  const { data: recommendations } = trpc.nicheOptimization.getRecommendations.useQuery();

  const { data: strategy } = trpc.nicheOptimization.createPaidAdsStrategy.useQuery({
    niche: selectedNiche,
    budget,
  });

  const { data: projection } = trpc.nicheOptimization.projectRevenue.useQuery({
    niche: selectedNiche,
    budget,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Niche Optimization & Paid Ads</h1>
        <p className="text-gray-400 mt-2">
          Focus on high-CPC, high-conversion niches and maximize your ROI with smart paid ads strategies
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Top Niche CPC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12.30</div>
            <p className="text-xs text-gray-500">Crypto & Web3</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8%</div>
            <p className="text-xs text-gray-500">Across top niches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180K+</div>
            <p className="text-xs text-gray-500">Combined volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Projected ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+245%</div>
            <p className="text-xs text-gray-500">€500 monthly budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="niches" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="niches">Top Niches</TabsTrigger>
          <TabsTrigger value="strategy">Ads Strategy</TabsTrigger>
          <TabsTrigger value="projection">Revenue</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Top Niches Tab */}
        <TabsContent value="niches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Profitable Niches</CardTitle>
              <CardDescription>Ranked by profit potential score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topNiches?.niches.map((niche, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer transition"
                    onClick={() => setSelectedNiche(niche.name)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{niche.name}</h3>
                        <p className="text-sm text-gray-400">
                          {niche.monthlySearches.toLocaleString()} monthly searches
                        </p>
                      </div>
                      <Badge
                        variant={
                          niche.trend === "rising"
                            ? "default"
                            : niche.trend === "stable"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {niche.trend === "rising" && <TrendingUp className="w-3 h-3 mr-1" />}
                        {niche.trend}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">CPC</p>
                        <p className="font-semibold text-green-500">€{niche.cpc.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Competition</p>
                        <p className="font-semibold capitalize">{niche.competition}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Conversion</p>
                        <p className="font-semibold">{(niche.conversionRate * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Margin</p>
                        <p className="font-semibold text-blue-500">
                          {(niche.profitMargin * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ads Strategy Tab */}
        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Ads Strategy: {selectedNiche}</CardTitle>
              <CardDescription>Optimized Google Ads campaign setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {strategy && (
                <>
                  {/* Budget & Bid Strategy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Monthly Budget (EUR)</label>
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Bid Strategy</label>
                      <div className="mt-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                        {strategy.bidStrategy.replace(/_/g, " ")}
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="text-sm font-medium">Target Keywords</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {strategy.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Ad Copy */}
                  <div>
                    <label className="text-sm font-medium">Ad Copy Variations</label>
                    <div className="mt-2 space-y-2">
                      {strategy.adCopy.map((copy, idx) => (
                        <div key={idx} className="p-3 bg-gray-800 rounded-lg text-sm">
                          {copy}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Landing Page */}
                  <div>
                    <label className="text-sm font-medium">Landing Page URL</label>
                    <div className="mt-2 p-3 bg-gray-800 rounded-lg text-sm text-blue-400">
                      {strategy.landingPageUrl}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Launch Google Ads Campaign
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Projection Tab */}
        <TabsContent value="projection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projection</CardTitle>
              <CardDescription>{selectedNiche} with €{budget}/month budget</CardDescription>
            </CardHeader>
            <CardContent>
              {projection && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Projected Clicks</p>
                      <p className="text-3xl font-bold">{projection.projectedClicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Projected Conversions</p>
                      <p className="text-3xl font-bold text-green-500">
                        {projection.projectedConversions}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Projected Revenue</p>
                      <p className="text-3xl font-bold text-blue-500">
                        €{projection.projectedRevenue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">ROI</p>
                      <p className="text-3xl font-bold text-green-500">
                        +{projection.roi.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Top 3 niches to focus on right now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations?.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{rec.niche}</h3>
                      <Badge variant="default">#{idx + 1}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{rec.reason}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Budget</p>
                        <p className="font-semibold">€{rec.recommendedBudget}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Revenue</p>
                        <p className="font-semibold text-green-500">€{rec.projectedMonthlyRevenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">ROI</p>
                        <p className="font-semibold text-blue-500">+{rec.roi}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="w-full" size="lg">
          <Target className="w-4 h-4 mr-2" />
          Focus on Top Niche
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <DollarSign className="w-4 h-4 mr-2" />
          Allocate Budget
        </Button>
      </div>
    </div>
  );
}
