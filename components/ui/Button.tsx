import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

export function Button({
  onClick,
  disabled,
  loading,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps) {
  const baseStyles =
    "rounded-xl font-medium transition-all flex items-center justify-center gap-2";

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: disabled || loading
      ? { background: "var(--muted)", color: "var(--foreground)", opacity: 0.8 }
      : { background: "var(--brand-500)", color: "#ffffff" },
    secondary: { background: "transparent", color: "var(--foreground)", border: "1px solid var(--muted)" },
    ghost: { background: "transparent", color: "var(--foreground)" },
  };

  const sizes = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-4",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, sizes[size], className)}
      style={variantStyles[variant]}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
