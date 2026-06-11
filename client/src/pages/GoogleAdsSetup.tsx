import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function GoogleAdsSetup() {
  const [publisherId, setPublisherId] = useState('');
  const [copied, setCopied] = useState(false);

  const { data: setupInstructions } = trpc.googleAds.getSetupInstructions.useQuery();
  const { data: highCPCNiches } = trpc.googleAds.getHighCPCNiches.useQuery();
  const { data: timeline } = trpc.googleAds.getRevenueTimeline.useQuery();
  const { data: optimizationTips } = trpc.googleAds.getOptimizationTips.useQuery();

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Google AdSense Setup</h1>
        <p className="text-gray-600 mt-2">
          Aktiviere Google AdSense und verdiene sofort €200-2000/Monat
        </p>
      </div>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Anleitung</CardTitle>
          <CardDescription>Folge diesen Schritten um Google AdSense zu aktivieren</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupInstructions?.map((instruction, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
              </div>
              <p className="text-sm text-gray-700 pt-1">{instruction}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Publisher ID Input */}
      <Card>
        <CardHeader>
          <CardTitle>Deine Publisher ID</CardTitle>
          <CardDescription>Gib deine Google AdSense Publisher ID ein</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="ca-pub-1234567890123456"
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
            />
            <Button>Speichern</Button>
          </div>
          <p className="text-xs text-gray-500">
            Deine Publisher ID findest du in den Google AdSense Einstellungen
          </p>
        </CardContent>
      </Card>

      {/* High CPC Niches */}
      <Card>
        <CardHeader>
          <CardTitle>High-CPC Nischen</CardTitle>
          <CardDescription>Die besten Nischen für höhere Verdienste</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {highCPCNiches?.map((niche, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{niche.niche}</h3>
                  <Badge variant="outline">{niche.avgCPC}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Monatliche Suchen:</span> {niche.monthlySearches.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Schwierigkeit:</span> {niche.difficulty}
                  </div>
                </div>
                <div className="text-sm font-semibold text-green-600">
                  Potenzial: {niche.potential}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Verdienst-Prognose</CardTitle>
          <CardDescription>Erwartete Verdienste pro Monat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Monat</th>
                  <th className="text-right py-2">Traffic</th>
                  <th className="text-right py-2">Verdienst</th>
                  <th className="text-right py-2">Kumulativ</th>
                </tr>
              </thead>
              <tbody>
                {timeline?.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">Monat {row.month}</td>
                    <td className="text-right">{row.traffic.toLocaleString()} Besucher</td>
                    <td className="text-right font-semibold text-green-600">€{row.earnings}</td>
                    <td className="text-right">€{row.cumulative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Optimierungstipps</CardTitle>
          <CardDescription>So verdienst du mehr mit Google AdSense</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {optimizationTips?.map((tip, idx) => (
            <div key={idx} className="flex gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Nächste Schritte</h3>
              <p className="text-sm text-blue-800 mt-1">
                1. Gehe zu Google AdSense und registriere dich<br />
                2. Gib deine Publisher ID ein<br />
                3. Warte auf Genehmigung (24-48 Stunden)<br />
                4. Verdiene sofort Geld!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
