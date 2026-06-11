import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, CreditCard, Download, LogOut, Settings } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function SubscriptionManagement() {
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Mock subscription data
  const subscriptions = [
    {
      id: 'sub_1',
      name: 'Premium Membership',
      status: 'active',
      price: 29.99,
      billingCycle: 'Monatlich',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Visa ending in 4242'
    },
    {
      id: 'sub_2',
      name: 'Professional Plan',
      status: 'active',
      price: 79.99,
      billingCycle: 'Monatlich',
      nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      paymentMethod: 'SEPA Lastschrift'
    }
  ];

  // Mock payment history
  const paymentHistory = [
    {
      id: 'inv_1',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      description: 'Premium Membership - Monthly',
      amount: 29.99,
      status: 'Paid',
      invoiceUrl: '#'
    },
    {
      id: 'inv_2',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      description: 'Premium Membership - Monthly',
      amount: 29.99,
      status: 'Paid',
      invoiceUrl: '#'
    },
    {
      id: 'inv_3',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      description: 'Professional Plan - Monthly',
      amount: 79.99,
      status: 'Paid',
      invoiceUrl: '#'
    }
  ];

  const handleCancelSubscription = (subscriptionId: string) => {
    console.log('Canceling subscription:', subscriptionId);
    setShowCancelDialog(false);
  };

  const handleUpdatePaymentMethod = () => {
    console.log('Updating payment method');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Abonnementverwaltung
          </h1>
          <p className="text-slate-300">
            Verwalte deine Abos, Zahlungsmethoden und Rechnungen
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="subscriptions" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="subscriptions">Abos</TabsTrigger>
            <TabsTrigger value="payments">Zahlungen</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>

          {/* Abos Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            {subscriptions.map((sub) => (
              <Card key={sub.id} className="border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{sub.name}</CardTitle>
                      <CardDescription>
                        Seit {sub.startDate.toLocaleDateString('de-DE')}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-600">
                      {sub.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Abonnement Details */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-400">Preis</p>
                        <p className="text-2xl font-bold text-white">
                          €{sub.price.toFixed(2)}/{sub.billingCycle.toLowerCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Abrechnungszyklus</p>
                        <p className="text-white">{sub.billingCycle}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Zahlungsmethode</p>
                        <p className="text-white">{sub.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Nächste Abrechnung */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                        <h3 className="font-semibold text-white">Nächste Abrechnung</h3>
                      </div>
                      <p className="text-2xl font-bold text-white mb-4">
                        {sub.nextBillingDate.toLocaleDateString('de-DE')}
                      </p>
                      <p className="text-sm text-slate-300 mb-4">
                        Betrag: €{sub.price.toFixed(2)}
                      </p>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleUpdatePaymentMethod}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Zahlungsmethode ändern
                        </Button>
                        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              className="w-full"
                              onClick={() => setSelectedSubscription(sub.id)}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Kündigen
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Abonnement kündigen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Sie werden am Ende des aktuellen Abrechnungszeitraums ({sub.nextBillingDate.toLocaleDateString('de-DE')}) keinen Zugriff mehr haben.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex gap-4">
                              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleCancelSubscription(sub.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Kündigen
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Zahlungen Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Zahlungsverlauf</CardTitle>
                <CardDescription>
                  Alle deine Rechnungen und Zahlungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div 
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-white">{payment.description}</p>
                        <p className="text-sm text-slate-400">
                          {payment.date.toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-white">€{payment.amount.toFixed(2)}</p>
                          <Badge variant="outline" className="text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(payment.invoiceUrl)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Einstellungen Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Zahlungseinstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Zahlungsmethoden
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-700 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Visa</p>
                        <p className="text-sm text-slate-400">Endet auf 4242</p>
                      </div>
                      <Badge className="bg-green-600">Standard</Badge>
                    </div>
                  </div>
                  <Button className="mt-4 w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Neue Zahlungsmethode hinzufügen
                  </Button>
                </div>

                <div className="border-t border-slate-600 pt-6">
                  <h3 className="font-semibold text-white mb-4">Benachrichtigungen</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="ml-3 text-slate-300">
                        Email vor jeder Abrechnung
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="ml-3 text-slate-300">
                        Benachrichtigungen bei Zahlungsfehlern
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-3 text-slate-300">
                        Newsletter und Angebote
                      </span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-6">
                  <h3 className="font-semibold text-white mb-4">Rechnungsadresse</h3>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Adresse bearbeiten
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
