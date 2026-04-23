"use client";

import { DisplayFormat } from "@/types";

interface OutputDisplayProps {
  result: string;
  lines: string[];
  format: DisplayFormat;
  onResultChange: (value: string) => void;
  onLinesChange: (value: string[]) => void;
}

const formatText = (lines: string[], format: DisplayFormat) => {
  if (format === "numbered") {
    return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
  }

  if (format === "lines") {
    return lines.map((line) => `| ${line}`).join("\n");
  }

  return lines.join("\n");
};

export function OutputDisplay({
  result,
  lines,
  format,
  onResultChange,
  onLinesChange,
}: OutputDisplayProps) {
  const editableLines = lines.length > 0 ? lines : result.split(/\r?\n/);

  const updateLine = (index: number, value: string) => {
    const updated = [...editableLines];
    updated[index] = value;
    onLinesChange(updated);
    onResultChange(updated.join("\n"));
  };

  if (!result) {
    return (
      <div className="h-full min-h-0 flex items-start">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your picture&apos;s words will appear in this box after you click
          &quot;Extract Text&quot;!
        </p>
      </div>
    );
  }

  if (format === "numbered" && editableLines.length > 0) {
    return (
      <div
        className="h-full min-h-0 overflow-y-auto overflow-x-hidden pr-1"
        style={{ maxHeight: "480px" }}
      >
        <div className="space-y-1">
          {editableLines.map((line, index) => (
            <div key={index} className="flex gap-3 rounded px-1 py-0.5">
              <span className="text-blue-500 dark:text-blue-400 font-mono text-sm w-6 flex-shrink-0 text-right pt-2">
                {index + 1}.
              </span>
              <input
                value={line}
                onChange={(e) => updateLine(index, e.target.value)}
                className="flex-1 min-w-0 bg-transparent outline-none border-b border-transparent focus:border-border font-mono text-sm text-foreground py-1"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === "lines" && editableLines.length > 0) {
    return (
      <div
        className="h-full min-h-0 overflow-y-auto overflow-x-hidden pr-1"
        style={{ maxHeight: "480px" }}
      >
        <div className="space-y-1">
          {editableLines.map((line, index) => (
            <div
              key={index}
              className="border-l-2 border-blue-400/40 dark:border-blue-500/40 pl-3 py-0.5"
              style={{ borderRadius: 0 }}
            >
              <input
                value={line}
                onChange={(e) => updateLine(index, e.target.value)}
                className="w-full min-w-0 bg-transparent outline-none border-none font-mono text-sm text-foreground py-1"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <textarea
      value={formatText(editableLines, format)}
      onChange={(e) => onResultChange(e.target.value)}
      className="w-full h-full min-h-0 bg-transparent outline-none resize-none overflow-y-auto overflow-x-hidden font-mono text-sm text-foreground leading-relaxed"
      style={{ maxHeight: "480px" }}
    />
  );
}
