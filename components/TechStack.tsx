import {
  Brain,
  ScanText,
  SlidersHorizontal,
  Sparkles,
  Server,
} from "lucide-react";

export const techs = [
  {
    icon: Brain,
    name: "Keras/TensorFlow",
    desc: "Deep Learning Models",
    color: "text-red-400",
  },
  {
    icon: ScanText,
    name: "EasyOCR",
    desc: "Text Recognition",
    color: "text-blue-400",
  },

  {
    icon: Sparkles,
    name: "Text Correction",
    desc: "Error Fixes & Validation",
    color: "text-emerald-400",
  },
  {
    icon: Server,
    name: "Flask API",
    desc: "Backend Service",
    color: "text-orange-400",
  },
];

export function TechStack() {
  return (
    <div
      className="mt-6 rounded-2xl p-5 bg-[var(--surface)]"
      style={{ boxShadow: "var(--card-shadow)", color: "var(--foreground)" }}
    >
      {/* Heading removed — Powered by moved to footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {techs.map(({ icon: Icon, name, desc, color }) => (
          <div key={name} className="rounded-lg p-3 bg-[rgba(0,0,0,0.02)]">
            <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
            <div className="text-sm text-[var(--muted)]">{name}</div>
            <div className="text-xs text-[var(--muted)]">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
