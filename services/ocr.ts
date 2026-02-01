import { OcrMode, OcrResult } from "@/types";

const OCR_API_URL = process.env.NEXT_PUBLIC_OCR_API_URL || "http://localhost:5000";

export async function extractText(file: File, mode: OcrMode): Promise<OcrResult> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("mode", mode);

  const endpoint = mode === "handwritten" 
    ? `${OCR_API_URL}/api/ocr/handwritten`
    : `${OCR_API_URL}/api/ocr`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
}
