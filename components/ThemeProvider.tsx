"use client";

import React, { useEffect, useState } from "react";

export const ThemeContext = React.createContext<{
  theme?: string | null;
  setTheme?: (t: string) => void;
  toggle?: () => void;
}>({});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.setAttribute("data-theme", "dark");
        setTheme("dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        setTheme("light");
      }
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (err) {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
