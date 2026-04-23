"use client";

import { Brain, File, Globe, Monitor } from "lucide-react";
import { techs } from "./TechStack";

export function Footer() {
  return (
    <footer className="site-footer mt-8">
      <div className="container-footer">
        <div className="footer-left">
          © 2024 SnapText. Made simple for everyone.
        </div>
        <div className="footer-right">
          <div className="powered-label">Powered by :</div>
          <div className="powered-items">
            {techs.map(({ icon: Icon, name, color }) => (
              <div key={name} className="flex items-center gap-2 mr-3">
                <Icon className={`w-5 h-5 ${color}`} aria-hidden />
                <span className="hidden md:inline text-xs text-[var(--muted)]">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <div className="powered-texts">
            <div>Smart OCR Technology</div>
            <div>AI & Image Processing</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
