import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertCircle, TrendingUp, CheckCircle, Zap, Clock, Target } from "lucide-react";

export default function SmartNotifications() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "opportunity",
      priority: "critical",
      title: "🔥 AI Tools Trend Exploding",
      message: "AI tools searches up 300% in last 24 hours. Estimated value: €5,000",
      actionUrl: "/niche-pivoting",
      actionText: "Explore Trend",
      timestamp: "2 minutes ago",
      channel: "email, push, in_app",
    },
    {
      id: 2,
      type: "alert",
      priority: "critical",
      title: "🚨 Low ROAS Alert",
      message: "Your ROAS is 1.2, minimum viable is 2.0. Pause underperforming campaigns",
      actionUrl: "/ad-optimization",
      actionText: "Optimize Ads",
      timestamp: "15 minutes ago",
      channel: "email, push",
    },
    {
      id: 3,
      type: "milestone",
      priority: "high",
      title: "💰 €1000 Revenue Milestone",
      message: "You're 95% of the way there! 1 day to reach your goal.",
      actionUrl: "/dashboard",
      actionText: "View Progress",
      timestamp: "1 hour ago",
      channel: "email, in_app",
    },
    {
      id: 4,
      type: "action_required",
      priority: "high",
      title: "⚡ Claim Your Google Ads Credits",
      message: "You have €100 in unclaimed Google Ads credits. Claim them before they expire!",
      actionUrl: "/google-ads",
      actionText: "Claim Credits",
      timestamp: "3 hours ago",
      channel: "email, push, in_app",
    },
    {
      id: 5,
      type: "opportunity",
      priority: "high",
      title: "💎 High-Value Keywords Found",
      message: "Found 5 keywords with €8+ CPC in your niche. Estimated value: €2,000",
      actionUrl: "/keywords",
      actionText: "View Keywords",
      timestamp: "5 hours ago",
      channel: "email, in_app",
    },
    {
      id: 6,
      type: "performance",
      priority: "medium",
      title: "📉 Traffic Declining",
      message: "Your website traffic decreased 25% compared to last week",
      actionUrl: "/traffic",
      actionText: "Investigate",
      timestamp: "1 day ago",
      channel: "in_app",
    },
  ];

  const opportunities = [
    { title: "Viral Trend: Passive Income", value: "€3,000", urgency: "immediate", actions: ["Create content", "Email list", "Social posts"] },
    { title: "Influencer Match Found", value: "€1,500", urgency: "soon", actions: ["Send pitch", "Negotiate", "Create content"] },
    { title: "High CPC Keywords", value: "€2,000", urgency: "immediate", actions: ["Target keywords", "Create landing page", "Setup ads"] },
  ];

  const milestones = [
    { title: "€1000 Revenue", current: 950, target: 1000, percentage: 95, daysLeft: 1 },
    { title: "10,000 Email Subscribers", current: 8500, target: 10000, percentage: 85, daysLeft: 3 },
    { title: "50,000 Monthly Visitors", current: 42000, target: 50000, percentage: 84, daysLeft: 5 },
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (selectedFilter === "all") return true;
    return n.type === selectedFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-900 bg-opacity-20 border-red-700";
      case "high":
        return "bg-orange-900 bg-opacity-20 border-orange-700";
      case "medium":
        return "bg-yellow-900 bg-opacity-20 border-yellow-700";
      default:
        return "bg-blue-900 bg-opacity-20 border-blue-700";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-600 text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-600 text-white">Medium</Badge>;
      default:
        return <Badge className="bg-blue-600 text-white">Low</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return "🚀";
      case "alert":
        return "⚠️";
      case "milestone":
        return "🎯";
      case "action_required":
        return "⚡";
      case "performance":
        return "📊";
      default:
        return "📢";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="w-8 h-8 text-blue-600" />
            Smart Notifications
          </h1>
          <p className="text-gray-400 mt-1">Echtzeit-Benachrichtigungen für Chancen & Probleme</p>
        </div>
        <Badge className="bg-green-600 text-white px-3 py-1">Aktiv</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Neue Benachrichtigungen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{notifications.filter((n) => n.priority === "critical").length}</p>
            <p className="text-xs text-gray-400 mt-1">Kritisch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Chancen Erkannt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{opportunities.length}</p>
            <p className="text-xs text-gray-400 mt-1">Diese Woche</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Meilensteine</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{milestones.length}</p>
            <p className="text-xs text-gray-400 mt-1">In Verfolgung</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Geschätzter Wert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">€6,500</p>
            <p className="text-xs text-gray-400 mt-1">Aktuelle Chancen</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
          <TabsTrigger value="opportunities">Chancen</TabsTrigger>
          <TabsTrigger value="milestones">Meilensteine</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {["all", "opportunity", "alert", "milestone", "action_required"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? "bg-blue-600" : ""}
                  >
                    {filter === "all" ? "Alle" : filter === "opportunity" ? "Chancen" : filter === "alert" ? "Warnungen" : filter === "milestone" ? "Meilensteine" : "Aktionen"}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${getPriorityColor(notification.priority)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{notification.title}</p>
                      {getPriorityBadge(notification.priority)}
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-400">{notification.timestamp}</p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {notification.actionText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Erkannte Chancen</CardTitle>
              <CardDescription>Automatisch erkannte Verdienst-Chancen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {opportunities.map((opp, idx) => (
                <div key={idx} className="p-4 border border-green-700 bg-green-900 bg-opacity-20 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-white">{opp.title}</p>
                      <p className="text-sm text-gray-300 mt-1">Geschätzter Wert: {opp.value}</p>
                      <Badge className={`mt-2 ${opp.urgency === "immediate" ? "bg-red-600" : "bg-yellow-600"}`}>
                        {opp.urgency === "immediate" ? "Sofort" : "Bald"}
                      </Badge>
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-400">Empfohlene Aktionen:</p>
                    <div className="flex gap-2 flex-wrap">
                      {opp.actions.map((action, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fortschritt Meilensteine</CardTitle>
              <CardDescription>Verfolge deine Ziele</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{milestone.title}</p>
                    <p className="text-sm text-gray-400">{milestone.percentage}%</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${milestone.percentage}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {milestone.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benachrichtigungs-Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Email Benachrichtigungen</p>
                    <p className="text-sm text-gray-400">Tägliche Zusammenfassung</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Push Benachrichtigungen</p>
                    <p className="text-sm text-gray-400">Sofortige Warnungen</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">SMS Alerts</p>
                    <p className="text-sm text-gray-400">Kritische Probleme</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Opportunity Alerts</p>
                    <p className="text-sm text-gray-400">Neue Chancen erkannt</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-700">
                <p className="font-semibold text-blue-400 mb-2">Quiet Hours</p>
                <div className="flex gap-2">
                  <input type="time" defaultValue="22:00" className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" />
                  <span className="text-gray-400 py-2">to</span>
                  <input type="time" defaultValue="08:00" className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white" />
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Einstellungen Speichern</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
