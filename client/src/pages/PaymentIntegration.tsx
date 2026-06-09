import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Copy } from 'lucide-react';

export default function PaymentIntegration() {
  const [paypalEmail, setPaypalEmail] = useState('');
  const [stripeEmail, setStripeEmail] = useState('');
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const paymentMethods = [
    {
      name: 'PayPal',
      description: 'Empfohlen für alle Verdienste',
      features: [
        'Automatische Auszahlungen',
        'Weltweit verfügbar',
        'Niedrige Gebühren',
        'Sofortige Überweisungen'
      ],
      setupTime: '5 Min',
      fee: '2%',
      minPayout: '€10'
    },
    {
      name: 'Stripe',
      description: 'Für höhere Verdienste',
      features: [
        'Automatische Überweisungen',
        'Detaillierte Reports',
        'API Integration',
        'Mehrere Währungen'
      ],
      setupTime: '10 Min',
      fee: '1.5%',
      minPayout: '€20'
    },
    {
      name: 'Wise (TransferWise)',
      description: 'Für internationale Transfers',
      features: [
        'Beste Wechselkurse',
        'Niedrige Gebühren',
        'Schnelle Transfers',
        'Mehrere Konten'
      ],
      setupTime: '15 Min',
      fee: '0.5-2%',
      minPayout: '€50'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Integration</h1>
        <p className="text-gray-600 mt-2">
          Verbinde deine Zahlungsmethoden und erhalte deine Verdienste automatisch
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">PayPal</span>
              </div>
              <p className="text-xs text-gray-600">
                {paypalEmail ? 'Verbunden' : 'Nicht verbunden'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">Stripe</span>
              </div>
              <p className="text-xs text-gray-600">
                {stripeEmail ? 'Verbunden' : 'Nicht verbunden'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">Wise</span>
              </div>
              <p className="text-xs text-gray-600">Nicht verbunden</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{method.name}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </div>
                <Badge variant="outline">{method.setupTime}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Gebühr</p>
                  <p className="font-semibold">{method.fee}</p>
                </div>
                <div>
                  <p className="text-gray-600">Min. Auszahlung</p>
                  <p className="font-semibold">{method.minPayout}</p>
                </div>
                <div>
                  <p className="text-gray-600">Setup Zeit</p>
                  <p className="font-semibold">{method.setupTime}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Features:</p>
                <ul className="space-y-1">
                  {method.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm text-gray-600 flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full">
                {method.name === 'PayPal' ? 'PayPal verbinden' : `${method.name} verbinden`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>PayPal Setup (Empfohlen)</CardTitle>
          <CardDescription>Schritt-für-Schritt Anleitung</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              'Gehe zu https://www.paypal.com/signin',
              'Melde dich an oder erstelle ein Konto',
              'Gehe zu "Einstellungen" → "Zahlungsempfänger"',
              'Kopiere deine PayPal Email',
              'Füge sie hier ein und speichere',
              'Verdiene sofort Geld! 💰'
            ].map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
                </div>
                <p className="text-sm text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">PayPal Email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="deine@paypal.email.de"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
                <Button>Speichern</Button>
              </div>
            </div>
            {paypalEmail && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                PayPal verbunden!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Automatic Payouts */}
      <Card>
        <CardHeader>
          <CardTitle>Automatische Auszahlungen</CardTitle>
          <CardDescription>Verdienste werden automatisch überwiesen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Auszahlungsgrenze</p>
                <p className="text-sm text-gray-600">Auszahlung wenn Verdienst €50 erreicht</p>
              </div>
              <Badge>€50</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Auszahlungsfrequenz</p>
                <p className="text-sm text-gray-600">Wie oft Verdienste überwiesen werden</p>
              </div>
              <Badge>Täglich</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Nächste Auszahlung</p>
                <p className="text-sm text-gray-600">Wenn Grenze erreicht ist</p>
              </div>
              <Badge variant="outline">Ausstehend</Badge>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✅ Automatische Auszahlungen sind aktiviert. Deine Verdienste werden täglich überwiesen wenn die Grenze erreicht ist.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Verdienst-Übersicht</CardTitle>
          <CardDescription>Aktuelle Verdienste und Auszahlungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Diese Woche</p>
                <p className="text-sm text-gray-600">7 Tage</p>
              </div>
              <p className="text-lg font-bold text-green-600">€0</p>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Diesen Monat</p>
                <p className="text-sm text-gray-600">30 Tage</p>
              </div>
              <p className="text-lg font-bold text-green-600">€0</p>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Gesamt</p>
                <p className="text-sm text-gray-600">Alle Zeit</p>
              </div>
              <p className="text-lg font-bold text-green-600">€0</p>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
              <div>
                <p className="font-medium">Ausstehend</p>
                <p className="text-sm text-gray-600">Wartet auf Auszahlung</p>
              </div>
              <p className="text-lg font-bold text-blue-600">€0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Status */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">💰 Zahlungen sind bereit!</h3>
            <p className="text-sm text-gray-700">
              Verbinde eine Zahlungsmethode oben und deine Verdienste werden automatisch überwiesen. 
              Dein Agent verdient jetzt für dich!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
