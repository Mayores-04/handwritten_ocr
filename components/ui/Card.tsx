import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn("backdrop-blur rounded-2xl p-5", className)}
      style={{
        background: "var(--surface)",
        boxShadow: "var(--card-shadow)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h2
      className={cn("text-lg font-semibold flex items-center gap-2", className)}
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </h2>
  );
}
