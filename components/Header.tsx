import { Brain, Sparkles } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Brain className="w-10 h-10 text-emerald-500" />
        <h1 className="text-4xl font-bold text-white">Keras OCR</h1>
      </div>
      <p className="text-slate-400 text-lg flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5" />
        Image to Text using Deep Learning - Supports Printed & Handwritten Text
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <div className="mt-8 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
      <Brain className="w-4 h-4" />
      Powered by Keras OCR & TensorFlow
    </div>
  );
}
