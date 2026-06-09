import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  const { data: config, refetch: refetchConfig } = trpc.config.get.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: affiliates, refetch: refetchAffiliates } = trpc.affiliate.list.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: keywords, refetch: refetchKeywords } = trpc.keywords.list.useQuery(undefined, {
    enabled: !!user,
  });

  const { mutate: updateConfig } = trpc.config.update.useMutation({
    onSuccess: () => {
      toast.success("Einstellungen gespeichert");
      refetchConfig();
    },
  });

  const { mutate: createAffiliate } = trpc.affiliate.create.useMutation({
    onSuccess: () => {
      toast.success("Affiliate-Programm hinzugefügt");
      refetchAffiliates();
    },
  });

  const { mutate: deleteAffiliate } = trpc.affiliate.delete.useMutation({
    onSuccess: () => {
      toast.success("Affiliate-Programm gelöscht");
      refetchAffiliates();
    },
  });

  const { mutate: createKeyword } = trpc.keywords.create.useMutation({
    onSuccess: () => {
      toast.success("Keyword hinzugefügt");
      refetchKeywords();
    },
  });

  const { mutate: deleteKeyword } = trpc.keywords.delete.useMutation({
    onSuccess: () => {
      toast.success("Keyword gelöscht");
      refetchKeywords();
    },
  });

  const [newAffiliate, setNewAffiliate] = useState({ name: "", affiliateId: "", baseUrl: "" });
  const [newKeyword, setNewKeyword] = useState({ keyword: "", category: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Einstellungen</h1>
          <p className="text-slate-600">Konfiguriere deine Affiliate-Plattform</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200">
            <TabsTrigger value="general">Allgemein</TabsTrigger>
            <TabsTrigger value="affiliate">Affiliate-Programme</TabsTrigger>
            <TabsTrigger value="keywords">Keywords & Nische</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Allgemeine Einstellungen</CardTitle>
                <CardDescription>Konfiguriere deine Plattform-Einstellungen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">PayPal E-Mail</Label>
                  <Input
                    type="email"
                    placeholder="deine@paypal.email"
                    defaultValue={(config && 'paypalEmail' in config && config.paypalEmail) || ""}
                    onChange={(e) => {
                      updateConfig({ paypalEmail: e.target.value });
                    }}
                    className="border-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-1">Für Auszahlungen deiner Affiliate-Einnahmen</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Content-Generierungs-Frequenz</Label>
                  <Select
                    defaultValue={(config && 'contentGenerationFrequency' in config && config.contentGenerationFrequency) || "daily"}
                    onValueChange={(value) => {
                      updateConfig({ contentGenerationFrequency: value as any });
                    }}
                  >
                    <SelectTrigger className="border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Täglich</SelectItem>
                      <SelectItem value="weekly">Wöchentlich</SelectItem>
                      <SelectItem value="custom">Benutzerdefiniert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Automatische Veröffentlichung</Label>
                      <p className="text-xs text-slate-500 mt-1">Content automatisch veröffentlichen</p>
                    </div>
                    <Switch
                      checked={(config && 'autoPublish' in config && config.autoPublish) || false}
                      onCheckedChange={(checked) => {
                        updateConfig({ autoPublish: checked });
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Benachrichtigungen bei neuem Content</Label>
                      <p className="text-xs text-slate-500 mt-1">Erhalte Benachrichtigungen</p>
                    </div>
                    <Switch
                      checked={(config && 'notifyOnNewContent' in config && config.notifyOnNewContent) || false}
                      onCheckedChange={(checked) => {
                        updateConfig({ notifyOnNewContent: checked });
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Benachrichtigungen bei Veröffentlichung</Label>
                      <p className="text-xs text-slate-500 mt-1">Bei erfolgreichem Posting benachrichtigen</p>
                    </div>
                    <Switch
                      checked={(config && 'notifyOnPublish' in config && config.notifyOnPublish) || false}
                      onCheckedChange={(checked) => {
                        updateConfig({ notifyOnPublish: checked });
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affiliate Programs */}
          <TabsContent value="affiliate">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Affiliate-Programme</CardTitle>
                  <CardDescription>Verwalte deine Affiliate-Programme</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                      <Plus className="w-4 h-4" />
                      Neues Programm
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Neues Affiliate-Programm</DialogTitle>
                      <DialogDescription>Füge ein neues Affiliate-Programm hinzu</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          placeholder="z.B. GPT Prompt Maker"
                          value={newAffiliate.name}
                          onChange={(e) => setNewAffiliate({ ...newAffiliate, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Affiliate-ID</Label>
                        <Input
                          placeholder="Deine Affiliate-ID"
                          value={newAffiliate.affiliateId}
                          onChange={(e) => setNewAffiliate({ ...newAffiliate, affiliateId: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Base URL</Label>
                        <Input
                          placeholder="https://example.com/ref/"
                          value={newAffiliate.baseUrl}
                          onChange={(e) => setNewAffiliate({ ...newAffiliate, baseUrl: e.target.value })}
                        />
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          if (newAffiliate.name && newAffiliate.affiliateId && newAffiliate.baseUrl) {
                            createAffiliate(newAffiliate);
                            setNewAffiliate({ name: "", affiliateId: "", baseUrl: "" });
                          } else {
                            toast.error("Bitte alle Felder ausfüllen");
                          }
                        }}
                      >
                        Hinzufügen
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {affiliates && affiliates.length > 0 ? (
                  <div className="space-y-3">
                    {affiliates.map((affiliate) => (
                      <div
                        key={affiliate.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-900">{affiliate.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">ID: {affiliate.affiliateId}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={affiliate.isActive ? "default" : "secondary"}>
                            {affiliate.isActive ? "Aktiv" : "Inaktiv"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              if (confirm("Dieses Programm wirklich löschen?")) {
                                deleteAffiliate({ id: affiliate.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-4">Noch keine Affiliate-Programme hinzugefügt</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords */}
          <TabsContent value="keywords">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Keywords & Nische</CardTitle>
                  <CardDescription>Definiere deine Ziel-Keywords für die KI- und Produktivitäts-Nische</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                      <Plus className="w-4 h-4" />
                      Neues Keyword
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Neues Keyword</DialogTitle>
                      <DialogDescription>Füge ein neues Keyword für die Trend-Erkennung hinzu</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Keyword</Label>
                        <Input
                          placeholder="z.B. ChatGPT Plugins"
                          value={newKeyword.keyword}
                          onChange={(e) => setNewKeyword({ ...newKeyword, keyword: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Kategorie</Label>
                        <Select
                          value={newKeyword.category}
                          onValueChange={(value) => setNewKeyword({ ...newKeyword, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wähle eine Kategorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AI Tools">AI Tools</SelectItem>
                            <SelectItem value="Produktivität">Produktivität</SelectItem>
                            <SelectItem value="Automatisierung">Automatisierung</SelectItem>
                            <SelectItem value="AI Marketing">AI Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          if (newKeyword.keyword && newKeyword.category) {
                            createKeyword(newKeyword);
                            setNewKeyword({ keyword: "", category: "" });
                          } else {
                            toast.error("Bitte alle Felder ausfüllen");
                          }
                        }}
                      >
                        Hinzufügen
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {keywords && keywords.length > 0 ? (
                  <div className="space-y-3">
                    {keywords.map((kw) => (
                      <div
                        key={kw.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-900">{kw.keyword}</h3>
                          <p className="text-sm text-slate-500 mt-1">{kw.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={kw.isActive ? "default" : "secondary"}>
                            {kw.isActive ? "Aktiv" : "Inaktiv"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              if (confirm("Dieses Keyword wirklich löschen?")) {
                                deleteKeyword({ id: kw.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-4">Noch keine Keywords hinzugefügt</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
