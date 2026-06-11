import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Share2, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ContentCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Fetch content and scheduling data
  const contentList = trpc.content.list.useQuery();

  // Mock calendar data
  const calendarEvents = [
    {
      date: "2026-06-02",
      title: "AI Content Generation",
      type: "content",
      status: "published",
      platforms: ["Blog", "LinkedIn"],
    },
    {
      date: "2026-06-03",
      title: "Affiliate Marketing Tips",
      type: "content",
      status: "scheduled",
      platforms: ["Blog", "Twitter"],
    },
    {
      date: "2026-06-04",
      title: "Email Campaign: Passive Income",
      type: "email",
      status: "scheduled",
      platforms: ["Email"],
    },
    {
      date: "2026-06-05",
      title: "TikTok Video: SEO Hacks",
      type: "social",
      status: "draft",
      platforms: ["TikTok"],
    },
    {
      date: "2026-06-06",
      title: "Instagram Carousel: Affiliate Programs",
      type: "social",
      status: "scheduled",
      platforms: ["Instagram"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "content":
        return <FileText className="w-4 h-4" />;
      case "social":
        return <Share2 className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Content Kalender</h1>
          <p className="text-muted-foreground mt-2">
            Überwache deine geplanten Inhalte, Social-Media-Posts und Email-Kampagnen
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Geplante Inhalte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-blue-600 mt-1">Diese Woche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Veröffentlicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-green-600 mt-1">+3 diese Woche</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Email-Kampagnen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-purple-600 mt-1">Geplant</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Social Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-orange-600 mt-1">Alle Plattformen</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Kalender</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Inhaltskalender</CardTitle>
                <CardDescription>
                  Alle geplanten Inhalte und Kampagnen auf einen Blick
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendarEvents.map((event) => (
                    <div
                      key={event.date}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                            {getTypeIcon(event.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <div className="flex gap-2 mt-1">
                            {event.platforms.map((platform) => (
                              <Badge key={platform} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <Badge className={getStatusColor(event.status)} variant="outline">
                            {event.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost">
                          Bearbeiten
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content View */}
          <TabsContent value="content">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Blog-Inhalte</CardTitle>
                <CardDescription>
                  Geplante und veröffentlichte Blog-Artikel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendarEvents
                    .filter((e) => e.type === "content")
                    .map((event) => (
                      <div
                        key={event.date}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {event.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media View */}
          <TabsContent value="social">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["TikTok", "Instagram", "LinkedIn", "Twitter"].map((platform) => (
                <Card key={platform} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{platform}</CardTitle>
                    <CardDescription>
                      Geplante Posts für diese Woche
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {calendarEvents
                        .filter((e) => e.platforms.includes(platform))
                        .map((event) => (
                          <div
                            key={event.date}
                            className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {event.date}
                            </p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Email View */}
          <TabsContent value="email">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Email-Kampagnen</CardTitle>
                <CardDescription>
                  Geplante und gesendete Email-Kampagnen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendarEvents
                    .filter((e) => e.type === "email")
                    .map((event) => (
                      <div
                        key={event.date}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Mail className="w-4 h-4 inline mr-1" />
                            {event.date}
                          </p>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Automation Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Automatisierungseinstellungen</CardTitle>
            <CardDescription>
              Konfiguriere automatische Posting-Zeiten und Kampagnen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Blog-Posting</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Häufigkeit:</span>
                    <span className="ml-2 font-medium">Täglich um 09:00</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Nächster Post:</span>
                    <span className="ml-2 font-medium">2026-06-03 09:00</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2 bg-green-100 text-green-800">Aktiv</Badge>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Social Media Posting</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Häufigkeit:</span>
                    <span className="ml-2 font-medium">3x täglich</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Beste Zeiten:</span>
                    <span className="ml-2 font-medium">09:00, 14:00, 20:00</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2 bg-green-100 text-green-800">Aktiv</Badge>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Email-Kampagnen</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Häufigkeit:</span>
                    <span className="ml-2 font-medium">2x pro Woche</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Versendzeit:</span>
                    <span className="ml-2 font-medium">Dienstag & Freitag 10:00</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2 bg-green-100 text-green-800">Aktiv</Badge>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Backlink-Outreach</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Häufigkeit:</span>
                    <span className="ml-2 font-medium">5 pro Woche</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Nächste Outreach:</span>
                    <span className="ml-2 font-medium">2026-06-04 08:00</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="ml-2 bg-blue-100 text-blue-800">Geplant</Badge>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
