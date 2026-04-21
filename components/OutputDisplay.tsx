"use client";

import { useEffect, useRef } from "react";
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
  const editableLines = lines.length > 0 ? lines : result.split(/\r?\n/);

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onDocCopy = (ev: ClipboardEvent) => {
      if (!containerRef.current) return;
      const target = ev.target as Node | null;
      if (!target || !containerRef.current.contains(target)) return;

      let text = "";
      if (format === "numbered") {
        text = editableLines.map((l, i) => `${i + 1}. ${l}`).join("\n");
      } else if (format === "lines") {
        text = editableLines.map((l) => `| ${l}`).join("\n");
      } else {
        text = editableLines.join("\n");
      }

      if (ev.clipboardData) {
        ev.clipboardData.setData("text/plain", text);
        ev.preventDefault();
      } else {
        void navigator.clipboard.writeText(text);
      }
    };

    document.addEventListener("copy", onDocCopy);
    return () => document.removeEventListener("copy", onDocCopy);
  }, [editableLines, format]);

  const handleCopy = async (e: any) => {
    e?.preventDefault?.();
    let text = "";
    if (format === "numbered") {
      text = editableLines.map((l, i) => `${i + 1}. ${l}`).join("\n");
    } else if (format === "lines") {
      text = editableLines.map((l, i) => `| ${l}`).join("\n");
    } else {
      text = editableLines.join("\n");
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // fallback: put into the clipboard via execCommand if available
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  if (!result) {
    return (
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        className="flex flex-col items-center justify-center h-full text-slate-500"
      >
        <FileText className="w-12 h-12 mb-3 opacity-50" />
        <p>Extracted text will appear here...</p>
      </div>
    );
  }

  const updateLine = (index: number, value: string) => {
    const updated = [...editableLines];
    updated[index] = value;
    onLinesChange(updated);
    onResultChange(updated.join("\n"));
  };

  if (format === "numbered" && editableLines.length > 0) {
    return (
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        className="space-y-1"
        onCopy={handleCopy}
      >
        {editableLines.map((line, index) => (
          <div
            key={index}
            className="flex gap-3 hover:bg-slate-800/50 rounded px-2 py-1 transition-colors"
          >
            <span className="text-emerald-500 font-medium w-8 flex-shrink-0 text-right">
              {index + 1}.
            </span>
            <input
              value={line}
              onChange={(e) => updateLine(index, e.target.value)}
              onCopy={handleCopy}
              className="flex-1 bg-transparent text-slate-100 outline-none border-b border-transparent focus:border-emerald-500/50"
            />
          </div>
        ))}
      </div>
    );
  }

  if (format === "lines" && editableLines.length > 0) {
    return (
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        className="space-y-2"
        onCopy={handleCopy}
      >
        {editableLines.map((line, index) => (
          <div
            key={index}
            className="border-l-2 border-slate-600 pl-3 py-1 hover:border-emerald-500 transition-colors"
          >
            <input
              value={line}
              onChange={(e) => updateLine(index, e.target.value)}
              onCopy={handleCopy}
              className="w-full bg-transparent text-slate-100 outline-none"
            />
          </div>
        ))}
      </div>
    );
  }

  if (format === "plain") {
    const plainText = editableLines.join("\n");
    return (
      <textarea
        ref={(el) => {
          containerRef.current = el;
        }}
        value={plainText}
        onChange={(e) => onResultChange(e.target.value)}
        onCopy={handleCopy}
        className="w-full min-h-[340px] bg-transparent text-slate-100 leading-relaxed outline-none resize-y"
      />
    );
  }

  return (
    <textarea
      ref={(el) => {
        containerRef.current = el;
      }}
      value={result}
      onChange={(e) => onResultChange(e.target.value)}
      onCopy={handleCopy}
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
