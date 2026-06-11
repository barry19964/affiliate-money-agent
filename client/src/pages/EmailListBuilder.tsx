import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trpc } from '@/lib/trpc';

export default function EmailListBuilder() {
  const [subscriberCount, setSubscriberCount] = useState(1000);

  const { data: strategies } = trpc.emailMonetization.getStrategies.useQuery();
  const { data: productIdeas } = trpc.emailMonetization.getProductIdeas.useQuery();
  const { data: timeline } = trpc.emailMonetization.getTimeline.useQuery();
  const { data: listValue } = trpc.emailMonetization.calculateListValue.useQuery({
    subscriberCount,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email-Liste Monetisierung</h1>
        <p className="text-gray-600 mt-2">
          Baue eine Email-Liste auf und verdiene €500-5000/Monat
        </p>
      </div>

      {/* List Value Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Email-Listen Wert Rechner</CardTitle>
          <CardDescription>Berechne den Wert deiner Email-Liste</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Anzahl der Subscriber</label>
            <Input
              type="number"
              value={subscriberCount}
              onChange={(e) => setSubscriberCount(Number(e.target.value))}
              min="0"
              step="100"
            />
          </div>

          {listValue && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monatlich</p>
                <p className="text-2xl font-bold text-blue-600">€{listValue.monthlyRevenue.toFixed(0)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Jährlich</p>
                <p className="text-2xl font-bold text-green-600">€{listValue.yearlyRevenue.toFixed(0)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pro Subscriber</p>
                <p className="text-2xl font-bold text-purple-600">€{listValue.valuePerSubscriber.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monetization Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Monetisierungs-Strategien</CardTitle>
          <CardDescription>6 bewährte Strategien zur Email-Monetisierung</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {strategies?.map((strategy, idx) => (
            <div key={idx} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{strategy.strategy}</h3>
                <Badge>{strategy.setupTime}</Badge>
              </div>
              <p className="text-sm text-gray-600">{strategy.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Potenzial:</span>
                <span className="font-semibold text-green-600">{strategy.monthlyPotential}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Produkt-Ideen</CardTitle>
          <CardDescription>Verkaufe diese Produkte an deine Email-Liste</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {productIdeas?.map((product, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Badge variant="outline">€{product.price}</Badge>
                </div>
                <p className="text-sm text-gray-600">Zielgruppe: {product.targetAudience}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-semibold">{(product.conversionRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Wachstums-Timeline</CardTitle>
          <CardDescription>Erwartete Subscriber und Verdienste</CardDescription>
        </CardHeader>
        <CardContent>
          {timeline && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" label={{ value: 'Woche', position: 'insideBottomRight', offset: -5 }} />
                <YAxis yAxisId="left" label={{ value: 'Subscriber', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Verdienst (€)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="subscribers" stroke="#3b82f6" name="Subscriber" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" name="Verdienst (€)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Action Steps */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-green-900 mb-3">Nächste Schritte</h3>
          <ol className="space-y-2 text-sm text-green-800">
            <li>1. Erstelle einen Lead Magnet (kostenloses eBook)</li>
            <li>2. Baue ein Opt-in Formular auf deiner Website ein</li>
            <li>3. Starte eine Email-Kampagne</li>
            <li>4. Verkaufe Produkte an deine Liste</li>
            <li>5. Verdiene €500-5000/Monat!</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
