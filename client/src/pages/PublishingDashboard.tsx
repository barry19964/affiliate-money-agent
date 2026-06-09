import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Spinner } from "@/components/ui/spinner";

export default function PublishingDashboard() {
  const [publishing, setPublishing] = useState(false);

  const metricsQuery = trpc.publishing.getMetrics.useQuery();
  const reportQuery = trpc.publishing.getReport.useQuery();
  const startPublishingMutation = trpc.publishing.startPublishing.useMutation();

  const handleStartPublishing = async () => {
    setPublishing(true);
    try {
      await startPublishingMutation.mutateAsync();
      // Refresh metrics after publishing starts
      setTimeout(() => {
        metricsQuery.refetch();
        reportQuery.refetch();
      }, 2000);
    } finally {
      setPublishing(false);
    }
  };

  const metrics = metricsQuery.data?.metrics;
  const report = reportQuery.data?.report;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Publishing Automation</h1>
        <p className="text-muted-foreground">
          Automatically publish articles, submit to Google, and build backlinks
        </p>
      </div>

      {/* Start Publishing Button */}
      <Card className="border-green-500/50 bg-green-500/5">
        <CardHeader>
          <CardTitle>🚀 Start Publishing Automation</CardTitle>
          <CardDescription>
            Publish all 12 generated articles and trigger Google indexing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            size="lg"
            onClick={handleStartPublishing}
            disabled={publishing}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {publishing ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Publishing...
              </>
            ) : (
              "Start Publishing All Articles"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Articles Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.articlesPublished}</div>
              <p className="text-xs text-muted-foreground">Ready for indexing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Indexed by Google</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.articlesIndexed}</div>
              <p className="text-xs text-muted-foreground">1-7 days after publishing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.articlesRanking}</div>
              <p className="text-xs text-muted-foreground">2-4 weeks after indexing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalTraffic}</div>
              <p className="text-xs text-muted-foreground">4-8 weeks after publishing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalLeads}</div>
              <p className="text-xs text-muted-foreground">From landing pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From affiliate links</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Timeline */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle>📅 Expected Timeline</CardTitle>
            <CardDescription>What to expect after publishing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(report.expectedOutcomes).map(([period, outcome]) => (
                <div key={period} className="flex items-start gap-4">
                  <Badge variant="outline" className="mt-1">
                    {period}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle>✨ Publishing Features</CardTitle>
            <CardDescription>Automated systems working for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(report.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center gap-2">
                  {enabled ? (
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                  )}
                  <span className="text-sm capitalize">
                    {feature.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle>📋 Next Steps</CardTitle>
            <CardDescription>What happens after you click "Start Publishing"</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {report.nextSteps.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Revenue Projection */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <CardTitle>💰 Revenue Projection</CardTitle>
          <CardDescription>Expected earnings after publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Month 1:</span>
              <span className="font-semibold">€0-50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Month 2:</span>
              <span className="font-semibold">€50-300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Month 3:</span>
              <span className="font-semibold">€300-1000</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-sm font-semibold">Month 6+:</span>
              <span className="font-bold text-green-600">€500-2000/month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
