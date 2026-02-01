"use client";

import { useState } from "react";
import { Upload, FileText, Search, Trash2, AlertCircle, Copy, Check } from "lucide-react";
import { OcrMode, DisplayFormat } from "@/types";
import { extractText } from "@/services/ocr";
import { formatTextForCopy } from "@/lib/utils";
import {
  Button,
  Card,
  CardTitle,
  ImageUploader,
  ModeSelector,
  DisplayFormatSelector,
  OutputDisplay,
  OutputContainer,
  StatsPanel,
  TipsSection,
  TechStack,
  Header,
  Footer,
} from "@/components";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ocrMode, setOcrMode] = useState<OcrMode>("auto");
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>("numbered");
  const [confidence, setConfidence] = useState(0);
  const [modeUsed, setModeUsed] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image file");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setLines([]);

    try {
      const data = await extractText(file, ocrMode);
      if (data.success) {
        setResult(data.text);
        setLines(data.lines || []);
        setConfidence(data.confidence);
        setModeUsed(data.mode_used);
      } else {
        setError("OCR processing failed");
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "Failed to connect to OCR server."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatTextForCopy(result, lines, displayFormat));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFile(null);
    setPreview("");
    setResult("");
    setLines([]);
    setError("");
    setConfidence(0);
    setModeUsed("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Upload Section */}
          <Card className="lg:col-span-2">
            <CardTitle>
              <Upload className="w-5 h-5 text-emerald-500" />
              Upload Image
            </CardTitle>

            <ImageUploader preview={preview} onFileSelect={handleFileSelect} />
            {/* <ModeSelector mode={ocrMode} onChange={setOcrMode} /> */}

            <div className="mt-4 flex gap-2">
              <Button 
                onClick={handleSubmit} 
                disabled={!file} 
                loading={loading}
                className="flex-1"
              >
                {loading ? "Processing..." : <><Search className="w-4 h-4" /> Extract Text</>}
              </Button>
              {file && (
                <Button variant="secondary" onClick={handleClear}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <StatsPanel confidence={confidence} modeUsed={modeUsed} lines={lines} result={result} />
          </Card>

          {/* Result Section */}
          <Card className="lg:col-span-3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>
                <FileText className="w-5 h-5 text-emerald-500" />
                Extracted Text
              </CardTitle>
              {result && (
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>

            <DisplayFormatSelector format={displayFormat} onChange={setDisplayFormat} />

            <OutputContainer result={result}>
              <OutputDisplay result={result} lines={lines} format={displayFormat} />
            </OutputContainer>
          </Card>
        </div>

        <TipsSection />
        <TechStack />
        <Footer />
      </div>
    </div>
  );
}
