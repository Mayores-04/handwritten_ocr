"use client";

import { getModeLabel, cn } from "@/lib/utils";

interface StatsPanelProps {
  confidence: number;
  modeUsed: string;
  lines: string[];
  result: string;
}

export function StatsPanel({ confidence, modeUsed, lines, result }: StatsPanelProps) {
  if (!result) return null;

  const stats = [
    { 
      label: "Confidence", 
      value: `${(confidence * 100).toFixed(1)}%`,
      className: cn(
        "font-medium",
        confidence > 0.7 ? 'text-emerald-400' : confidence > 0.4 ? 'text-yellow-400' : 'text-red-400'
      )
    },
    { label: "Model", value: getModeLabel(modeUsed), className: "text-blue-400 text-xs" },
    { label: "Lines", value: lines.length || 1, className: "text-slate-300" },
    { label: "Characters", value: result.length, className: "text-slate-300" },
    { label: "Words", value: result.split(/\s+/).filter(Boolean).length, className: "text-slate-300" },
  ];

  return (
    <div className="mt-4 p-3 bg-slate-900/50 rounded-xl space-y-2 text-sm">
      {stats.map(({ label, value, className }) => (
        <div key={label} className="flex justify-between">
          <span className="text-slate-500">{label}:</span>
          <span className={className}>{value}</span>
        </div>
      ))}
    </div>
  );
}
