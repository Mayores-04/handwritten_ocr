export type OcrMode = "auto" | "printed" | "handwritten";
export type DisplayFormat = "numbered" | "lines" | "plain";

export interface WordBox {
  text: string;
  box: number[];
}

export interface OcrResult {
  success: boolean;
  text: string;
  confidence: number;
  mode_used: string;
  word_boxes?: WordBox[];
  lines?: string[];
  line_count?: number;
}

export interface OcrStats {
  confidence: number;
  modeUsed: string;
  lines: string[];
  result: string;
}
