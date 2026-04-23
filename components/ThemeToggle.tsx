"use client";

import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext) as any;

  // Checkbox will be checked when theme is 'dark'
  const checked = theme === "dark";

  return (
    <label className="theme-switch" aria-label="Toggle theme">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle && toggle()}
      />
      <span className="slider">
        <div className="star star_1" />
        <div className="star star_2" />
        <div className="star star_3" />
        <svg
          viewBox="0 0 16 16"
          className="cloud"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#fff"
            d="M4.2 9.6c-.3-.2-.6-.3-1-.3-1.2 0-2.1 1-2.2 2.1-1 .4-1.7 1.4-1.7 2.6 0 1.4 1 2.6 2.3 2.8h12.7c1.8-.1 3.1-1.6 3.1-3.4 0-1.7-1.3-3.2-3-3.4 0-.1 0-.2 0-.3 0-2.7-2.2-4.9-5.1-4.9-2.1 0-3.8 1.2-4.6 2.9"
          />
        </svg>
      </span>
    </label>
  );
}
