"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Search, Trash2, AlertCircle } from "lucide-react";
import { OcrMode, DisplayFormat } from "@/types";
import { extractText } from "@/services/ocr";
import { formatTextForCopy } from "@/lib/utils";
import {
  Button,
  Card,
  CardTitle,
  ImageUploader,
  ModeSelector,
  OutputDisplay,
  OutputContainer,
  StatsPanel,
  TipsSection,
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
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [ocrMode, setOcrMode] = useState<OcrMode>("printed");
  const [displayFormat, setDisplayFormat] = useState<DisplayFormat>("plain");
  const [confidence, setConfidence] = useState(0);
  const [modeUsed, setModeUsed] = useState("");
  const [leftCardHeight, setLeftCardHeight] = useState<number | undefined>(
    undefined,
  );
  const leftCardRef = useRef<HTMLDivElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
    setLines([]);
    setError("");
    setConfidence(0);
    setModeUsed("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image file.");
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
        setError("OCR processing failed.");
      }
    } catch (err) {
      setError(
        `Error: ${
          err instanceof Error
            ? err.message
            : "Failed to connect to OCR server."
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const text = formatTextForCopy(result, lines, displayFormat);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy text.");
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const text = formatTextForCopy(result, lines, displayFormat);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "snaptext-output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
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

  useEffect(() => {
    function updateHeight() {
      const h = leftCardRef.current?.getBoundingClientRect().height;
      setLeftCardHeight(h ? Math.floor(h) : undefined);
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [preview, file, result, lines, confidence, modeUsed]);

  const handleResultChange = (value: string) => {
    setResult(value);
    setLines(value ? value.split(/\r?\n/) : []);
  };

  const handleLinesChange = (value: string[]) => {
    setLines(value);
    setResult(value.join("\n"));
  };

  return (
    <div className="min-h-screen flex max-w-7xl flex-col w-full">
      <Header />

      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        {copied && (
          <div
            className="px-3 py-2 rounded-md text-sm"
            style={{ background: "var(--brand-500)", color: "#fff" }}
          >
            Copied to clipboard
          </div>
        )}
        {downloaded && (
          <div
            className="px-3 py-2 rounded-md text-sm"
            style={{ background: "var(--brand-500)", color: "#fff" }}
          >
            Download started
          </div>
        )}
      </div>

      <div>
        <div className="grid gap-6 lg:grid-cols-5 items-stretch">
          <div ref={leftCardRef} className="lg:col-span-2 h-full">
            <Card className="h-full">
              <CardTitle>
                <Upload className="w-5 h-5 text-emerald-500" />
                Upload Your Picture
              </CardTitle>

              <ImageUploader
                preview={preview}
                onFileSelect={handleFileSelect}
              />
              <ModeSelector mode={ocrMode} onChange={setOcrMode} />

              <div className="mt-4 flex flex-col gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={!file}
                  loading={loading}
                  className="w-full"
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Extract Text
                    </>
                  )}
                </Button>

                {file && (
                  <Button
                    variant="secondary"
                    onClick={handleClear}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <StatsPanel
                confidence={confidence}
                modeUsed={modeUsed}
                lines={lines}
                result={result}
              />
            </Card>
          </div>

          <Card className="lg:col-span-3 h-full flex flex-col">
            <OutputContainer
              result={result}
              format={displayFormat}
              onFormatChange={setDisplayFormat}
              onCopy={handleCopy}
              onDownload={handleDownload}
              maxContentHeight={leftCardHeight}
            >
              <OutputDisplay
                result={result}
                lines={lines}
                format={displayFormat}
                onResultChange={handleResultChange}
                onLinesChange={handleLinesChange}
              />
            </OutputContainer>
          </Card>
        </div>

        <TipsSection />
        <Footer />
      </div>
    </div>
  );
}
