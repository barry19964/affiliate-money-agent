import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Edit2, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function ContentArchive() {
  const { user } = useAuth();
  const { data: content, isLoading, refetch } = trpc.content.list.useQuery(undefined, {
    enabled: !!user,
  });
  const { mutate: deleteContent } = trpc.content.delete.useMutation({
    onSuccess: () => {
      toast.success("Content gelöscht");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredContent = content?.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesType = filterType === "all" || c.contentType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  }) || [];

  const statusColors: Record<string, string> = {
    draft: "bg-slate-100 text-slate-800",
    scheduled: "bg-blue-100 text-blue-800",
    published: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Content-Archiv</h1>
            <p className="text-slate-600">Verwalte alle deine generierten Inhalte</p>
          </div>
          <Link href="/content/create">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Neuer Content
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Suche</Label>
                <Input
                  placeholder="Nach Titel suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-slate-200"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="draft">Entwurf</SelectItem>
                    <SelectItem value="scheduled">Geplant</SelectItem>
                    <SelectItem value="published">Veröffentlicht</SelectItem>
                    <SelectItem value="failed">Fehler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Typ</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle</SelectItem>
                    <SelectItem value="blog_post">Blog-Beitrag</SelectItem>
                    <SelectItem value="social_post">Social Media</SelectItem>
                    <SelectItem value="email">E-Mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterType("all");
                  }}
                >
                  Zurücksetzen
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Inhalte ({filteredContent.length})</CardTitle>
            <CardDescription>Alle generierten und verwalteten Inhalte</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-slate-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : filteredContent.length > 0 ? (
              <div className="space-y-3">
                {filteredContent.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{c.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {c.contentType.replace("_", " ")}
                        </Badge>
                        <Badge className={`text-xs ${statusColors[c.status]}`}>
                          {c.status}
                        </Badge>
                        {c.keywords && c.keywords.length > 0 && (
                          <span className="text-xs text-slate-500">
                            {c.keywords.slice(0, 2).join(", ")}
                            {c.keywords.length > 2 && ` +${c.keywords.length - 2}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/content/${c.id}`}>
                        <Button size="sm" variant="ghost" className="gap-2">
                          <Edit2 className="w-4 h-4" />
                          Bearbeiten
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm("Diesen Content wirklich löschen?")) {
                            deleteContent({ id: c.id });
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
              <div className="text-center py-12">
                <p className="text-slate-500 mb-4">Keine Inhalte gefunden</p>
                <Link href="/content/create">
                  <Button>Jetzt Content erstellen</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
