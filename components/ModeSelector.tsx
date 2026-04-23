"use client";

import { LucideIcon, Type, PenTool } from "lucide-react";
import { OcrMode } from "@/types";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  mode: OcrMode;
  onChange: (mode: OcrMode) => void;
}

const modes: { value: OcrMode; label: string; icon: LucideIcon }[] = [
  { value: "printed", label: "Printed", icon: Type },
  { value: "handwritten", label: "Handwritten", icon: PenTool },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="mt-4">
      <label className="text-sm block mb-2" style={{ color: "var(--muted)" }}>
        Recognition Mode:
      </label>
      <div className="flex gap-2">
        {modes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1",
            )}
            style={
              mode === value
                ? { background: "var(--brand-500)", color: "#fff" }
                : {
                    background: "transparent",
                    color: "var(--foreground)",
                    border: "1px solid var(--muted)",
                  }
            }
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
