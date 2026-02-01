"use client";

import { useRef } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  preview: string;
  onFileSelect: (file: File) => void;
}

export function ImageUploader({ preview, onFileSelect }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all",
          preview 
            ? "border-emerald-500/50 bg-emerald-500/5" 
            : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
        )}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
        ) : (
          <div className="text-slate-400">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Drag & drop an image here</p>
            <p className="text-xs text-slate-500 mt-1">or click to browse</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
