import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, TrendingUp, DollarSign, Users, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function LeadMagnetFunnel() {
  const [selectedMagnetId, setSelectedMagnetId] = useState<string>("1");

  // Fetch lead magnet data
  const { data: allMagnets } = trpc.leadMagnet.getAllLeadMagnets.useQuery();

  const { data: dashboardData } = trpc.leadMagnet.getDashboardData.useQuery();

  const { data: emailSequence } = trpc.leadMagnet.generateEmailSequence.useQuery({
    leadMagnetTitle: allMagnets?.leadMagnets[0]?.title || "AI Tools Guide",
    niche: allMagnets?.leadMagnets[0]?.niche || "AI Tools & Automation",
  });

  const { data: strategies } = trpc.leadMagnet.getMonetizationStrategies.useQuery({
    leadMagnetTitle: allMagnets?.leadMagnets[0]?.title || "AI Tools Guide",
    niche: allMagnets?.leadMagnets[0]?.niche || "AI Tools & Automation",
  });

  const { data: roiData } = trpc.leadMagnet.calculateROI.useQuery({
    leadMagnetId: selectedMagnetId,
    monthlyLeads: 100,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Lead Magnet & Email Funnel</h1>
        <p className="text-gray-400 mt-2">
          Create high-converting lead magnets and automate email sequences for maximum revenue
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Lead Magnets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.leadMagnets.length || 5}</div>
            <p className="text-xs text-gray-500">Ready to deploy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Est. Monthly Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalLeads || 750}</div>
            <p className="text-xs text-gray-500">From all magnets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((dashboardData?.averageConversionRate || 0) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500">Email to customer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Est. Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">€{dashboardData?.totalRevenue || 2100}</div>
            <p className="text-xs text-gray-500">From email funnel</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="magnets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="magnets">Lead Magnets</TabsTrigger>
          <TabsTrigger value="sequences">Email Sequences</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="roi">ROI & Analytics</TabsTrigger>
        </TabsList>

        {/* Lead Magnets Tab */}
        <TabsContent value="magnets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Lead Magnets</CardTitle>
              <CardDescription>High-converting lead magnets ready to deploy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allMagnets?.leadMagnets.map((magnet) => (
                  <div
                    key={magnet.id}
                    className="p-4 border border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer transition"
                    onClick={() => setSelectedMagnetId(magnet.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{magnet.title}</h3>
                        <p className="text-sm text-gray-400">{magnet.description}</p>
                      </div>
                      <Badge variant="outline">{magnet.type}</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Niche</p>
                        <p className="font-semibold">{magnet.niche}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Conv. Rate</p>
                        <p className="font-semibold">{(magnet.conversionRate * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Est. Leads/mo</p>
                        <p className="font-semibold">{magnet.estimatedLeads}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Revenue/mo</p>
                        <p className="font-semibold text-green-500">€{magnet.estimatedRevenue}</p>
                      </div>
                    </div>

                    <Button className="w-full mt-3" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Deploy This Magnet
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Sequences Tab */}
        <TabsContent value="sequences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Email Sequences</CardTitle>
              <CardDescription>5-email sequences that convert leads to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailSequence?.sequence.emails.map((email, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-gray-400">Email {idx + 1}</p>
                        <h3 className="font-semibold mt-1">{email.subject}</h3>
                      </div>
                      <Badge variant="secondary">Day {email.daysSinceSignup}</Badge>
                    </div>

                    <p className="text-sm text-gray-300 mb-3">{email.content}</p>

                    <Button size="sm" variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      {email.cta}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                <p className="text-sm">
                  <strong>Expected Performance:</strong> 8% conversion rate, €47 average order value
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monetization Tab */}
        <TabsContent value="monetization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monetization Strategies</CardTitle>
              <CardDescription>Multiple revenue streams from your email list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategies?.strategies.map((strategy, idx) => (
                  <div key={idx} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{strategy.strategy}</h3>
                      <Badge variant="default">€{strategy.estimatedRevenue}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{strategy.implementation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-sm font-semibold">
                  Total Estimated Monthly Revenue: €{strategies?.totalEstimatedRevenue || 1100}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI & Analytics Tab */}
        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>Performance metrics for selected lead magnet</CardDescription>
            </CardHeader>
            <CardContent>
              {roiData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Total Leads</p>
                      <p className="text-2xl font-bold mt-2">{roiData.totalLeads}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Conversions</p>
                      <p className="text-2xl font-bold mt-2 text-green-500">{roiData.conversions}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">Revenue</p>
                      <p className="text-2xl font-bold mt-2 text-blue-500">€{roiData.revenue}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-400">ROI</p>
                      <p className="text-2xl font-bold mt-2 text-yellow-500">+{roiData.roi.toFixed(0)}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-900/20 border border-purple-700 rounded-lg">
                    <p className="text-sm">
                      <strong>Payback Period:</strong> {roiData.paybackPeriod.toFixed(1)} days
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Deploy Lead Magnet
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Setup Email Sequence
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <Users className="w-4 h-4 mr-2" />
          Manage Subscribers
        </Button>
        <Button className="w-full" size="lg" variant="outline">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>
    </div>
  );
}
