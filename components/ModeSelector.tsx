"use client";

import { RefreshCw, Type, PenTool } from "lucide-react";
import { OcrMode } from "@/types";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  mode: OcrMode;
  onChange: (mode: OcrMode) => void;
}

const modes: { value: OcrMode; label: string; icon: typeof RefreshCw }[] = [
  { value: "auto", label: "Auto", icon: RefreshCw },
  { value: "printed", label: "Printed", icon: Type },
  { value: "handwritten", label: "Handwritten", icon: PenTool },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="mt-4">
      <label className="text-slate-300 text-sm block mb-2">Recognition Mode:</label>
      <div className="flex gap-2">
        {modes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1",
              mode === value 
                ? "bg-emerald-600 text-white" 
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            )}
          >
            <Icon className="w-3 h-3" /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}
