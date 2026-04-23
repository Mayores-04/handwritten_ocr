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
        className={cn("rounded-xl p-6 text-center cursor-pointer transition-all")}
        style={{ background: "var(--surface)", boxShadow: "var(--card-shadow)", borderTop: "1px solid var(--stroke)" }}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
        ) : (
          <div className="muted">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-80" />
            <p className="text-lg">Drop an image here</p>
            <p className="text-sm muted mt-1">or click to choose a photo</p>
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
