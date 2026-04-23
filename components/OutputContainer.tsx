"use client";

import React from "react";
import {
  FileText,
  Copy,
  Download,
  AlignLeft,
  List,
  AlignJustify,
} from "lucide-react";
import { DisplayFormat } from "@/types";
import { cn } from "@/lib/utils";

interface OutputContainerProps {
  result: string;
  format: DisplayFormat;
  onFormatChange: (format: DisplayFormat) => void;
  onCopy: () => void;
  onDownload: () => void;
  children: React.ReactNode;
}

export function OutputContainer({
  result,
  format,
  onFormatChange,
  onCopy,
  onDownload,
  children,
}: OutputContainerProps) {
  const tabs: { label: string; value: DisplayFormat; icon: React.ReactNode }[] =
    [
      { label: "Plain Text", value: "plain", icon: <AlignLeft size={14} /> },
      { label: "Numbered Lines", value: "numbered", icon: <List size={14} /> },
      { label: "Lines Only", value: "lines", icon: <AlignJustify size={14} /> },
    ];

  return (
    <div className="h-full rounded-2xl bg-[var(--surface)] p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2.5 text-base font-medium text-card-foreground shrink-0">
        <FileText size={18} className="opacity-70" />
        Your Text Appears Here
      </div>

      <div className="flex gap-2 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onFormatChange(tab.value)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm transition-colors",
              tab.value === format
                ? "border-border"
                : "border-border/60 text-muted-foreground hover:bg-muted/50",
            )}
            style={
              tab.value === format
                ? { background: "var(--brand-500)", color: "#fff" }
                : {
                    background: "transparent",
                    color: "var(--foreground)",
                    border: "1px solid var(--muted)",
                  }
            }
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl bg-[var(--background)] p-4 flex-1 min-h-0 overflow-hidden"
        style={{ boxShadow: "var(--card-shadow)" }}
      >
        {children}
      </div>

      <div className="flex gap-3 shrink-0">
        <button
          type="button"
          onClick={onCopy}
          disabled={!result}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-muted hover:bg-muted/70 text-sm text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy size={15} />
          Copy to Clipboard
        </button>

        <button
          type="button"
          onClick={onDownload}
          disabled={!result}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-muted hover:bg-muted/70 text-sm text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={15} />
          Download as File
        </button>
      </div>
    </div>
  );
}
