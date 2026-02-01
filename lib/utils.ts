import { DisplayFormat } from "@/types";

export const MODE_LABELS: Record<string, string> = {
  keras_ocr: "Keras OCR (Printed)",
  keras_ocr_handwriting: "Keras OCR (Handwritten)",
  keras_handwriting: "Keras CRNN (Handwritten)",
  keras_char_model: "Keras CNN (Character)",
  easyocr: "EasyOCR (CRAFT + CRNN)",
  easyocr_handwriting: "EasyOCR (Handwritten)",
  easyocr_handwriting_raw: "EasyOCR (Raw)",
  easyocr_handwriting_enhanced: "EasyOCR (Enhanced)",
  easyocr_handwriting_upscaled_raw: "EasyOCR (Upscaled)",
  easyocr_handwriting_upscaled_enhanced: "EasyOCR (Upscaled Enhanced)",
  easyocr_handwriting_upscaled_binary: "EasyOCR (Binary)",
  easyocr_handwriting_advanced: "EasyOCR (Advanced)",
  easyocr_handwriting_grayscale_enhanced: "EasyOCR (Grayscale)",
  trocr_handwriting: "TrOCR (Microsoft Handwriting AI)",
  tesseract: "Tesseract (Fallback)",
  tesseract_handwriting: "Tesseract (Handwritten)",
};

export function getModeLabel(mode: string): string {
  return MODE_LABELS[mode] || mode;
}

export function formatTextForCopy(
  result: string, 
  lines: string[], 
  format: DisplayFormat
): string {
  if (format === "numbered" && lines.length > 0) {
    return lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
  }
  if (format === "lines" && lines.length > 0) {
    return lines.join('\n');
  }
  return result;
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
