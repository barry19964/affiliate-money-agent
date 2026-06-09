import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'wouter';
import { ArrowRight, TrendingUp, Mail, Share2, DollarSign } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function RevenueHub() {
  const [selectedChannel, setSelectedChannel] = useState('all');

  // Mock data for combined revenue
  const combinedTimeline = [
    { month: 'Monat 1', googleAds: 200, email: 100, social: 50, affiliate: 50, total: 400 },
    { month: 'Monat 2', googleAds: 400, email: 300, social: 200, affiliate: 100, total: 1000 },
    { month: 'Monat 3', googleAds: 600, email: 800, social: 500, affiliate: 200, total: 2100 },
    { month: 'Monat 6', googleAds: 1000, email: 2000, social: 2000, affiliate: 500, total: 5500 },
    { month: 'Monat 12', googleAds: 1500, email: 5000, social: 5000, affiliate: 1000, total: 12500 },
  ];

  const channelData = [
    { name: 'Google Ads', value: 20, color: '#3b82f6', potential: '€200-2000/Monat', icon: DollarSign },
    { name: 'Email Marketing', value: 30, color: '#10b981', potential: '€500-5000/Monat', icon: Mail },
    { name: 'Social Media', value: 35, color: '#f59e0b', potential: '€1000-10000/Monat', icon: Share2 },
    { name: 'Affiliate Links', value: 15, color: '#ef4444', potential: '€100-500/Monat', icon: TrendingUp },
  ];

  const totalMonthly = 1800;
  const totalAnnual = 21600;

  // New 8-channel data
  const eightChannels = [
    { name: 'AdSense', daily: 50, monthly: 1500, yearly: 18000, icon: '📊' },
    { name: 'Affiliate', daily: 100, monthly: 3000, yearly: 36000, icon: '🔗' },
    { name: 'Google Ads', daily: 200, monthly: 6000, yearly: 72000, icon: '📢' },
    { name: 'YouTube', daily: 150, monthly: 4500, yearly: 54000, icon: '📹' },
    { name: 'TikTok', daily: 300, monthly: 9000, yearly: 108000, icon: '🎵' },
    { name: 'Email', daily: 100, monthly: 3000, yearly: 36000, icon: '📧' },
    { name: 'Products', daily: 200, monthly: 6000, yearly: 72000, icon: '🛍️' },
    { name: 'Sponsorships', daily: 250, monthly: 7500, yearly: 90000, icon: '🤝' },
  ];

  const totalDailyNew = eightChannels.reduce((sum, c) => sum + c.daily, 0);
  const totalMonthlyNew = eightChannels.reduce((sum, c) => sum + c.monthly, 0);
  const totalYearlyNew = eightChannels.reduce((sum, c) => sum + c.yearly, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue Hub</h1>
        <p className="text-gray-600 mt-2">
          Verwalte alle Verdienst-Kanäle an einem Ort
        </p>
      </div>

      {/* Total Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Monatliche Verdienste</p>
              <p className="text-3xl font-bold text-green-600">€{totalMonthly.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Alle Kanäle kombiniert</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Jährliche Verdienste</p>
              <p className="text-3xl font-bold text-blue-600">€{totalAnnual.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Hochgerechnet</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Aktive Kanäle</p>
              <p className="text-3xl font-bold text-purple-600">4</p>
              <p className="text-xs text-gray-500">Google Ads, Email, Social, Affiliate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Channels Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Verdienst-Kanäle</CardTitle>
          <CardDescription>Übersicht aller Verdienst-Quellen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {channelData.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" style={{ color: channel.color }} />
                        <h3 className="font-semibold">{channel.name}</h3>
                      </div>
                      <Badge style={{ backgroundColor: channel.color, color: 'white' }}>
                        {channel.value}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{channel.potential}</p>
                    <Link href={
                      channel.name === 'Google Ads' ? '/google-ads' :
                      channel.name === 'Email Marketing' ? '/email-list' :
                      channel.name === 'Social Media' ? '/social-media' :
                      '/affiliate'
                    }>
                      <Button variant="outline" size="sm" className="w-full">
                        Setup <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Pie Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Revenue Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Verdienst-Prognose (Alle Kanäle)</CardTitle>
          <CardDescription>Kombinierte Verdienste über 12 Monate</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `€${value}`} />
              <Legend />
              <Line type="monotone" dataKey="googleAds" stroke="#3b82f6" name="Google Ads" />
              <Line type="monotone" dataKey="email" stroke="#10b981" name="Email" />
              <Line type="monotone" dataKey="social" stroke="#f59e0b" name="Social Media" />
              <Line type="monotone" dataKey="affiliate" stroke="#ef4444" name="Affiliate" />
              <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="TOTAL" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>Starte mit den 3 einfachsten Schritten</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold">Google AdSense (5 Min)</h3>
              <p className="text-sm text-gray-600">
                Schnellste Methode um sofort Geld zu verdienen
              </p>
              <Link href="/google-ads">
                <Button variant="outline" size="sm" className="w-full">
                  Setup
                </Button>
              </Link>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <span className="text-sm font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold">Email Liste (1-2 Wochen)</h3>
              <p className="text-sm text-gray-600">
                Baue eine Liste auf und verdiene €500-5000/Monat
              </p>
              <Link href="/email-list">
                <Button variant="outline" size="sm" className="w-full">
                  Setup
                </Button>
              </Link>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                <span className="text-sm font-bold text-amber-600">3</span>
              </div>
              <h3 className="font-semibold">Social Media (1-3 Monate)</h3>
              <p className="text-sm text-gray-600">
                Wachse auf Social Media und verdiene €1000-10000/Monat
              </p>
              <Link href="/social-media">
                <Button variant="outline" size="sm" className="w-full">
                  Setup
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8-Channel Revenue Overview */}
      <Card>
        <CardHeader>
          <CardTitle>8-Channel Revenue System</CardTitle>
          <CardDescription>All monetization channels combined</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-gray-600">Daily Revenue</p>
              <p className="text-3xl font-bold text-blue-600">€{totalDailyNew}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-green-600">€{totalMonthlyNew.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm text-gray-600">Yearly Projection</p>
              <p className="text-3xl font-bold text-purple-600">€{totalYearlyNew.toLocaleString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eightChannels.map((channel) => (
              <div key={channel.name} className="p-3 rounded-lg border text-center">
                <div className="text-3xl mb-2">{channel.icon}</div>
                <h3 className="font-semibold text-sm">{channel.name}</h3>
                <p className="text-xs text-gray-600 mt-1">€{channel.monthly.toLocaleString()}/mo</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">🚀 Dein Agent ist bereit!</h3>
            <p className="text-sm text-gray-700">
              Alle Verdienst-Kanäle sind konfiguriert und bereit. Wähle einen Kanal oben und starte mit dem Setup. 
              Dein Agent wird dann automatisch Geld verdienen!
            </p>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Jetzt starten
              </Button>
              <Button variant="outline">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
