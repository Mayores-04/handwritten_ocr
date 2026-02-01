import { Lightbulb, RefreshCw, Type, PenTool, Image as ImageIcon } from "lucide-react";

const tips = [
  { icon: RefreshCw, text: <><strong>Auto mode:</strong> Let the AI detect the best recognition method</> },
  { icon: Type, text: <><strong>Printed mode:</strong> Best for typed documents, books, and signage</> },
  { icon: PenTool, text: <><strong>Handwritten mode:</strong> Optimized for handwritten notes and letters</> },
  { icon: ImageIcon, text: "Use clear, well-lit photos with minimal blur" },
];

export function TipsSection() {
  return (
    <div className="mt-8 bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        Tips for best results
      </h3>
      <ul className="text-slate-400 space-y-2 text-sm grid md:grid-cols-2 gap-x-8">
        {tips.map(({ icon: Icon, text }, i) => (
          <li key={i} className="flex items-start gap-2">
            <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
