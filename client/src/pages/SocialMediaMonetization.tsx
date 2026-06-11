import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trpc } from '@/lib/trpc';

export default function SocialMediaMonetization() {
  const [followers, setFollowers] = useState(10000);

  const { data: strategies } = trpc.socialMonetization.getStrategies.useQuery();
  const { data: potential } = trpc.socialMonetization.calculatePotential.useQuery({ followers });
  const { data: growthTimeline } = trpc.socialMonetization.getGrowthTimeline.useQuery();
  const { data: platformTips } = trpc.socialMonetization.getPlatformTips.useQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Monetisierung</h1>
        <p className="text-gray-600 mt-2">
          Monetisiere deine Social Media und verdiene €1000-10000/Monat
        </p>
      </div>

      {/* Followers Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Verdienst-Rechner</CardTitle>
          <CardDescription>Berechne dein Verdienst-Potenzial basierend auf Followern</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Anzahl der Follower</label>
            <Input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value))}
              min="0"
              step="1000"
            />
          </div>

          {potential && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monatlich</p>
                <p className="text-2xl font-bold text-blue-600">€{potential.monthlyRevenue.toFixed(0)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Jährlich</p>
                <p className="text-2xl font-bold text-green-600">€{potential.yearlyRevenue.toFixed(0)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pro Follower</p>
                <p className="text-2xl font-bold text-purple-600">€{potential.revenuePerFollower.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Plattform-Strategien</CardTitle>
          <CardDescription>Verdiene auf jeder Plattform anders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {strategies?.map((strategy, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{strategy.platform}</h3>
                <Badge>{strategy.setupTime}</Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                {strategy.requirements.map((req, ridx) => (
                  <p key={ridx}>• {req}</p>
                ))}
              </div>
              <div className="text-sm font-semibold text-green-600 mt-2">
                Potenzial: {strategy.monthlyPotential}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Growth Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Wachstums-Timeline</CardTitle>
          <CardDescription>Follower und Verdienste pro Monat</CardDescription>
        </CardHeader>
        <CardContent>
          {growthTimeline && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Monat', position: 'insideBottomRight', offset: -5 }} />
                <YAxis yAxisId="left" label={{ value: 'Follower', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Verdienst (€)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="followers" fill="#3b82f6" name="Follower" />
                <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Verdienst (€)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Platform-Specific Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Plattform-Tipps</CardTitle>
          <CardDescription>Spezifische Tipps für jede Plattform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {platformTips && Object.entries(platformTips).map(([platform, tips]) => (
            <div key={platform} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold capitalize">{platform}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Steps */}
      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-purple-900 mb-3">Nächste Schritte</h3>
          <ol className="space-y-2 text-sm text-purple-800">
            <li>1. Wähle eine Plattform (TikTok, YouTube, Instagram)</li>
            <li>2. Baue Follower auf (1-3 Monate)</li>
            <li>3. Aktiviere Monetisierung</li>
            <li>4. Poste konsistent</li>
            <li>5. Verdiene €1000-10000/Monat!</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
