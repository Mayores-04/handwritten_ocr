"use client";

import { FileText } from "lucide-react";
import { DisplayFormat } from "@/types";
import { cn } from "@/lib/utils";

interface OutputDisplayProps {
  result: string;
  lines: string[];
  format: DisplayFormat;
}

export function OutputDisplay({ result, lines, format }: OutputDisplayProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <FileText className="w-12 h-12 mb-3 opacity-50" />
        <p>Extracted text will appear here...</p>
      </div>
    );
  }

  if (format === "numbered" && lines.length > 0) {
    return (
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-3 hover:bg-slate-800/50 rounded px-2 py-1 transition-colors">
            <span className="text-emerald-500 font-medium w-8 flex-shrink-0 select-none text-right">
              {index + 1}.
            </span>
            <span className="flex-1 text-slate-100">{line}</span>
          </div>
        ))}
      </div>
    );
  }

  if (format === "lines" && lines.length > 0) {
    return (
      <div className="space-y-2">
        {lines.map((line, index) => (
          <div key={index} className="border-l-2 border-slate-600 pl-3 py-1 hover:border-emerald-500 transition-colors">
            <span className="text-slate-100">{line}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="whitespace-pre-wrap text-slate-100 leading-relaxed">
      {result}
    </div>
  );
}

export function OutputContainer({ result, children }: { result: string; children: React.ReactNode }) {
  return (
    <div className={cn(
      "flex-1 min-h-[400px] rounded-xl p-4 font-mono text-sm overflow-auto",
      result 
        ? "bg-slate-900 border border-slate-700" 
        : "bg-slate-900/50 border border-slate-700/50"
    )}>
      {children}
    </div>
  );
}
