import { Brain, Type, PenTool, Layers, Cpu } from "lucide-react";

const techs = [
  { icon: Type, name: "keras-ocr", desc: "CRAFT + CRNN", color: "text-blue-400" },
  { icon: PenTool, name: "Custom CRNN", desc: "CNN + BiLSTM", color: "text-purple-400" },
  { icon: Layers, name: "CTC Decoder", desc: "Sequence to Text", color: "text-emerald-400" },
  { icon: Cpu, name: "TensorFlow", desc: "Keras Backend", color: "text-orange-400" },
];

export function TechStack() {
  return (
    <div className="mt-6 bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <Brain className="w-5 h-5 text-emerald-500" />
        Powered by Keras Deep Learning
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {techs.map(({ icon: Icon, name, desc, color }) => (
          <div key={name} className="bg-slate-800/50 rounded-lg p-3">
            <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
            <div className="text-sm text-slate-400">{name}</div>
            <div className="text-xs text-slate-500">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
