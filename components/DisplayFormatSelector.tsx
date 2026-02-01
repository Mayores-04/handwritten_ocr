"use client";

import { Hash, List, AlignLeft } from "lucide-react";
import { DisplayFormat } from "@/types";
import { cn } from "@/lib/utils";

interface DisplayFormatSelectorProps {
  format: DisplayFormat;
  onChange: (format: DisplayFormat) => void;
}

const formats: { value: DisplayFormat; label: string; icon: typeof Hash }[] = [
  { value: "numbered", label: "Numbered Lines", icon: Hash },
  { value: "lines", label: "Lines Only", icon: List },
  { value: "plain", label: "Plain Text", icon: AlignLeft },
];

export function DisplayFormatSelector({ format, onChange }: DisplayFormatSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {formats.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
            format === value 
              ? "bg-blue-600 text-white" 
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          )}
        >
          <Icon className="w-4 h-4" /> {label}
        </button>
      ))}
    </div>
  );
}
