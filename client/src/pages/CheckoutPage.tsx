import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ShoppingCart, Zap, Lock } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: products } = trpc.payments.getProducts.useQuery();
  const { data: pricingPlans } = trpc.payments.getPricingPlans.useQuery();
  const { data: paymentMethods } = trpc.payments.getPaymentMethods.useQuery();
  const { data: security } = trpc.payments.getPaymentSecurity.useQuery();

  const handleCheckout = async (productId: string) => {
    setIsProcessing(true);
    try {
      // In real implementation, this would create a Stripe checkout session
      const session = await trpc.payments.createCheckoutSession.useQuery({
        productId,
        userId: 1 // Would be current user ID
      }).data;
      
      // Redirect to Stripe checkout
      if (session?.sessionId) {
        window.location.href = session?.successUrl || '';
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Wähle dein Paket
          </h1>
          <p className="text-xl text-slate-300">
            Starten Sie mit unserem automatisierten Affiliate-Agent
          </p>
        </div>

        {/* Tabs für Produkte und Pläne */}
        <Tabs defaultValue="products" className="w-full mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="products">Einzelprodukte</TabsTrigger>
            <TabsTrigger value="plans">Abos</TabsTrigger>
          </TabsList>

          {/* Produkte Tab */}
          <TabsContent value="products" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <Card 
                  key={product.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedProduct === product.id 
                      ? 'ring-2 ring-blue-500 border-blue-500' 
                      : 'border-slate-700'
                  }`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </div>
                      {product.type === 'subscription' && (
                        <Badge variant="secondary" className="ml-2">
                          Abo
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-white">
                      €{product.price.toFixed(2)}
                      {product.type === 'subscription' && (
                        <span className="text-sm font-normal text-slate-400">/Monat</span>
                      )}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleCheckout(product.id)}
                      disabled={isProcessing}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {isProcessing ? 'Wird verarbeitet...' : 'Jetzt kaufen'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Abos Tab */}
          <TabsContent value="plans" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans?.map((plan, index) => (
                <Card 
                  key={index}
                  className={`relative border-slate-700 transition-all hover:shadow-lg ${
                    plan.popular ? 'ring-2 ring-blue-500 md:scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500">Beliebt</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">
                        €{plan.price.toFixed(2)}
                      </span>
                      <span className="text-slate-400">/Monat</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-300">
                          <Check className="h-5 w-5 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleCheckout(`plan_${plan.name.toLowerCase()}`)}
                      disabled={isProcessing}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      {isProcessing ? 'Wird verarbeitet...' : 'Abonnieren'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Zahlungsmethoden */}
        <div className="bg-slate-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Akzeptierte Zahlungsmethoden</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {paymentMethods?.map((method) => (
              <div key={method.id} className="text-center">
                <div className="text-3xl mb-2">{method.icon}</div>
                <p className="text-sm text-slate-300">{method.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sicherheitsfeatures */}
        <div className="bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Lock className="mr-3 h-6 w-6 text-green-500" />
            Sicherheit & Datenschutz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {security?.map((feature, index) => (
              <div key={index} className="flex items-start">
                <span className="text-2xl mr-3">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-white">{feature.feature}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Häufig gestellte Fragen</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Kann ich mein Abonnement kündigen?</h3>
              <p className="text-slate-300">Ja, Sie können Ihr Abonnement jederzeit kündigen. Es wird bis zum Ende des aktuellen Abrechnungszeitraums aktiv bleiben.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Gibt es eine Geld-zurück-Garantie?</h3>
              <p className="text-slate-300">Ja, wir bieten eine 30-Tage-Geld-zurück-Garantie, wenn Sie nicht zufrieden sind.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Wie sicher sind meine Zahlungsdaten?</h3>
              <p className="text-slate-300">Alle Zahlungen werden über Stripe verarbeitet, das PCI DSS Level 1 zertifiziert ist - die höchste Sicherheitsstufe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
