import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { Zap, BarChart3, Cog, FileText, TrendingUp } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Affiliate Money Agent</span>
          </div>
          <a href={getLoginUrl()}>
            <Button className="bg-blue-600 hover:bg-blue-700">Anmelden</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Automatisiertes Geldverdienen mit <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">KI-Content</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Generiere automatisch hochwertige Inhalte, erkenne Trends in Echtzeit und verdiene passives Einkommen durch Affiliate-Marketing – ohne manuelle Arbeit.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Kostenlos starten
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8">
              Mehr erfahren
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">KI-Content-Generierung</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Generiere automatisch hochwertige Blogbeiträge, Social-Media-Posts und E-Mails basierend auf Trends in der KI- und Produktivitäts-Nische.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Echtzeit-Trend-Erkennung</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Erkenne Trends in Echtzeit mit Google Trends API und erstelle sofort relevante Inhalte, die viral gehen können.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Affiliate-Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Verwalte mehrere Affiliate-Programme (GPT Prompt Maker, Copy.ai, Writesonic) und verfolge Klicks sowie Einnahmen in Echtzeit.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <CardTitle className="text-white">Content-Archiv</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Alle generierten Inhalte sind zentral verwaltbar mit Status-Verfolgung (Entwurf, Geplant, Veröffentlicht).
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <Cog className="w-6 h-6 text-indigo-400" />
              </div>
              <CardTitle className="text-white">Automatischer Scheduler</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Zeitgesteuerte Veröffentlichung auf konfigurierten Plattformen – völlig automatisch und ohne Eingriffe.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
              <CardTitle className="text-white">Echtzeit-Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-400">
                Übersichtliches Dashboard mit Live-Metriken: generierte Inhalte, Klicks, Impressionen und geschätzte Einnahmen.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-slate-700 rounded-lg p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-slate-300">Automatisiert</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <p className="text-slate-300">Läuft im Hintergrund</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
              <p className="text-slate-300">Passive Einnahmen</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Bereit zu starten?</h2>
          <p className="text-xl text-slate-300 mb-8">Melde dich an und beginne sofort mit der Generierung von Affiliate-Einnahmen.</p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              Jetzt kostenlos anmelden
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center text-slate-400">
          <p>© 2026 Affiliate Money Agent. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
