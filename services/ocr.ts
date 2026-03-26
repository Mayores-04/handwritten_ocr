import { OcrMode, OcrResult } from "@/types";

const OCR_API_URL =
  process.env.NEXT_PUBLIC_OCR_API_URL || "http://localhost:5000";

export async function extractText(
  file: File,
  mode: OcrMode,
): Promise<OcrResult> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("mode", mode);

  const endpoint =
    mode === "handwritten"
      ? `${OCR_API_URL}/api/ocr/handwritten`
      : `${OCR_API_URL}/api/ocr`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload.error === "string"
        ? payload.error
        : `Server error: ${response.status}`;
    throw new Error(message);
  }

  if (!payload) {
    throw new Error("Invalid response from OCR server");
  }

  if (payload.success === false) {
    throw new Error(payload.error || "OCR processing failed");
  }

  return payload as OcrResult;
}
