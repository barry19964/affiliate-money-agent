import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, TrendingUp } from "lucide-react";

interface OptimizedAffiliateLinkProps {
  url: string;
  text: string;
  programName: string;
  trustSignal?: string;
  urgency?: string;
  variant?: "default" | "secondary" | "outline" | "link" | "destructive" | "ghost";
  showTrustBadge?: boolean;
}

export function OptimizedAffiliateLink({
  url,
  text,
  programName,
  trustSignal = "Trusted by 10,000+ users",
  urgency = "Limited time offer",
  variant = "default",
  showTrustBadge = true,
}: OptimizedAffiliateLinkProps) {
  return (
    <div className="my-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {showTrustBadge && (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                  <Zap className="w-3 h-3 mr-1" />
                  {urgency}
                </Badge>
              </>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            {trustSignal}
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button
              variant={variant === "default" ? "default" : variant}
              className={`w-full sm:w-auto ${
                variant === "default"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : ""
              }`}
            >
              {text}
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
        {programName} • Affiliate Link
      </p>
    </div>
  );
}
