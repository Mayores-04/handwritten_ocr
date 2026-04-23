"use client";

import { useContext } from "react";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeContext } from "./ThemeProvider";

export function Header() {
  const { theme } = useContext(ThemeContext) as any;

  const lightSrc = "/lightmodelogowithtext.jpg";
  const darkSrc = "/darkmodelogowithtext.jpg";

  return (
    <header className="relative text-center mb-6">
      <div className="absolute right-0 top-0 mt-1 mr-1">
        <ThemeToggle />
      </div>
      <div className="flex items-center w-full justify-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          {theme === "dark" ? (
            <img src={darkSrc} alt="SnapText" className="app-logo" />
          ) : (
            <img src={lightSrc} alt="SnapText" className="app-logo" />
          )}
        </div>

        <h1
          className="text-4xl font-bold text-center mb-2"
          style={{ color: "var(--brand-500)" }}
        >
          SnapText
        </h1>
      </div>
      <p
        className="text-lg mt-2 flex items-center justify-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <Sparkles className="w-5 h-5" />
        Snap a photo. Get editable text. Copy & go!
      </p>
    </header>
  );
}
