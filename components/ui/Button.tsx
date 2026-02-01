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
  children 
}: ButtonProps) {
  const baseStyles = "rounded-xl font-medium transition-all flex items-center justify-center gap-2";
  
  const variants = {
    primary: disabled || loading
      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
      : "bg-emerald-600 hover:bg-emerald-500 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-300",
    ghost: "bg-transparent hover:bg-slate-700 text-slate-300",
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
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
