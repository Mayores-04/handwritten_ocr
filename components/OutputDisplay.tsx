"use client";

import { FileText } from "lucide-react";
import { DisplayFormat } from "@/types";
import { cn } from "@/lib/utils";

interface OutputDisplayProps {
  result: string;
  lines: string[];
  format: DisplayFormat;
  onResultChange: (value: string) => void;
  onLinesChange: (value: string[]) => void;
}

export function OutputDisplay({
  result,
  lines,
  format,
  onResultChange,
  onLinesChange,
}: OutputDisplayProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <FileText className="w-12 h-12 mb-3 opacity-50" />
        <p>Extracted text will appear here...</p>
      </div>
    );
  }

  const editableLines = lines.length > 0 ? lines : result.split(/\r?\n/);

  const updateLine = (index: number, value: string) => {
    const updated = [...editableLines];
    updated[index] = value;
    onLinesChange(updated);
    onResultChange(updated.join("\n"));
  };

  if (format === "numbered" && editableLines.length > 0) {
    return (
      <div className="space-y-1">
        {editableLines.map((line, index) => (
          <div
            key={index}
            className="flex gap-3 hover:bg-slate-800/50 rounded px-2 py-1 transition-colors"
          >
            <span className="text-emerald-500 font-medium w-8 flex-shrink-0 select-none text-right">
              {index + 1}.
            </span>
            <input
              value={line}
              onChange={(e) => updateLine(index, e.target.value)}
              className="flex-1 bg-transparent text-slate-100 outline-none border-b border-transparent focus:border-emerald-500/50"
            />
          </div>
        ))}
      </div>
    );
  }

  if (format === "lines" && editableLines.length > 0) {
    return (
      <div className="space-y-2">
        {editableLines.map((line, index) => (
          <div
            key={index}
            className="border-l-2 border-slate-600 pl-3 py-1 hover:border-emerald-500 transition-colors"
          >
            <input
              value={line}
              onChange={(e) => updateLine(index, e.target.value)}
              className="w-full bg-transparent text-slate-100 outline-none"
            />
          </div>
        ))}
      </div>
    );
  }

  if (format === "plain") {
    const plainText = editableLines.join(" ");
    return (
      <textarea
        value={plainText}
        onChange={(e) => onResultChange(e.target.value)}
        className="w-full min-h-[340px] bg-transparent text-slate-100 leading-relaxed outline-none resize-y"
      />
    );
  }

  return (
    <textarea
      value={result}
      onChange={(e) => onResultChange(e.target.value)}
      className="w-full min-h-[340px] bg-transparent text-slate-100 leading-relaxed outline-none resize-y"
    />
  );
}

export function OutputContainer({
  result,
  children,
}: {
  result: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex-1 min-h-[400px] rounded-xl p-4 font-mono text-sm overflow-auto",
        result
          ? "bg-slate-900 border border-slate-700"
          : "bg-slate-900/50 border border-slate-700/50",
      )}
    >
      {children}
    </div>
  );
}
