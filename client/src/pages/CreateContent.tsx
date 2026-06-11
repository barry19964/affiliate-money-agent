import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function CreateContent() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [contentType, setContentType] = useState<"blog_post" | "social_post" | "email">("blog_post");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutate: generateContent } = trpc.ai.generateContent.useMutation({
    onSuccess: (data) => {
      setTitle(data.title);
      setBody(data.body);
      setExcerpt(data.excerpt || "");
      setKeywords(data.keywords);
      setIsGenerating(false);
      toast.success("Content generiert!");
    },
    onError: (error) => {
      setIsGenerating(false);
      toast.error(error.message);
    },
  });

  const { mutate: createContent, isPending: isCreating } = trpc.content.create.useMutation({
    onSuccess: () => {
      toast.success("Content erstellt!");
      navigate("/content");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleGenerateContent = () => {
    if (!title || keywords.length === 0) {
      toast.error("Bitte Titel und mindestens ein Keyword eingeben");
      return;
    }

    setIsGenerating(true);
    generateContent({
      topic: title,
      contentType,
      keywords,
    });
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleCreateContent = () => {
    if (!title || !body) {
      toast.error("Bitte Titel und Content eingeben");
      return;
    }

    createContent({
      title,
      body,
      excerpt,
      contentType,
      keywords,
      affiliateLinks: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Neuer Content</h1>
          <p className="text-slate-600">Erstelle oder generiere neuen Affiliate-Content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content-Typ</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={contentType} onValueChange={(value) => setContentType(value as any)}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog_post">Blog-Beitrag</SelectItem>
                    <SelectItem value="social_post">Social Media Post</SelectItem>
                    <SelectItem value="email">E-Mail</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Title & Keywords */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Titel & Keywords</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Titel</Label>
                  <Input
                    placeholder="z.B. Die besten KI-Tools für 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-slate-200"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Keywords</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Keyword eingeben"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddKeyword();
                        }
                      }}
                      className="border-slate-200"
                    />
                    <Button onClick={handleAddKeyword} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="gap-1">
                        {kw}
                        <button onClick={() => handleRemoveKeyword(kw)}>
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Body</Label>
                  <Textarea
                    placeholder="Dein Content hier..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="border-slate-200 font-mono text-sm"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Excerpt (optional)</Label>
                  <Textarea
                    placeholder="Kurze Zusammenfassung für Social Media"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="border-slate-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleCreateContent}
                disabled={isCreating || !title || !body}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Speichern...
                  </>
                ) : (
                  "Content speichern"
                )}
              </Button>
              <Button variant="outline" onClick={() => navigate("/content")}>
                Abbrechen
              </Button>
            </div>
          </div>

          {/* AI Generator Sidebar */}
          <div>
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  KI-Generator
                </CardTitle>
                <CardDescription>Lasse die KI Content generieren</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    Gib einen Titel und Keywords ein, und die KI generiert automatisch hochwertige Content für dich.
                  </p>
                </div>

                <Button
                  onClick={handleGenerateContent}
                  disabled={isGenerating || !title || keywords.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Generiere...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Content generieren
                    </>
                  )}
                </Button>

                <div className="text-xs text-slate-500 space-y-2">
                  <p>✓ Blog-Beiträge (500-800 Wörter)</p>
                  <p>✓ Social Media Posts</p>
                  <p>✓ E-Mail-Kampagnen</p>
                  <p>✓ SEO-optimiert</p>
                  <p>✓ Affiliate-ready</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
