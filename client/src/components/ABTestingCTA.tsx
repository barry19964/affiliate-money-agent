import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

interface CTAVariant {
  id: string;
  text: string;
  style: "aggressive" | "soft" | "urgent" | "benefit";
  conversionRate?: number;
  clicks?: number;
}

const CTA_VARIANTS: CTAVariant[] = [
  {
    id: "aggressive",
    text: "Get Instant Access Now",
    style: "aggressive",
    conversionRate: 8.5,
    clicks: 127,
  },
  {
    id: "soft",
    text: "Learn More",
    style: "soft",
    conversionRate: 5.2,
    clicks: 78,
  },
  {
    id: "urgent",
    text: "Claim Your Spot (Limited Time)",
    style: "urgent",
    conversionRate: 12.3,
    clicks: 184,
  },
  {
    id: "benefit",
    text: "Start Earning Today",
    style: "benefit",
    conversionRate: 9.7,
    clicks: 145,
  },
];

interface ABTestingCTAProps {
  onSelect?: (variant: CTAVariant) => void;
  showStats?: boolean;
}

export function ABTestingCTA({ onSelect, showStats = true }: ABTestingCTAProps) {
  const bestPerformer = CTA_VARIANTS.reduce((prev, current) =>
    (current.conversionRate || 0) > (prev.conversionRate || 0) ? current : prev
  );

  return (
    <div className="space-y-4">
      {showStats && (
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">A/B Test Results</h3>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Best performing CTA: <strong>{bestPerformer.text}</strong> ({bestPerformer.conversionRate}% conversion)
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {CTA_VARIANTS.map((variant) => (
          <div key={variant.id} className="relative">
            {variant.id === bestPerformer.id && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                Best Performer
              </Badge>
            )}
            <button
              onClick={() => onSelect?.(variant)}
              className="w-full p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors text-left"
            >
              <p className="font-medium text-slate-900 dark:text-white mb-1">
                {variant.text}
              </p>
              {showStats && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {variant.clicks} clicks • {variant.conversionRate}% conversion
                </p>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/30 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          💡 <strong>Tip:</strong> The urgent CTA variant performs 2.4x better than the soft variant. Use it for maximum conversions.
        </p>
      </div>
    </div>
  );
}
