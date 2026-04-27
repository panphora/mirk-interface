import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-[18px] leading-tight border-[2px] transition-[background-color] duration-100 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:[outline:1px_solid_var(--foreground)] focus-visible:[outline-offset:1px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground",
  secondary:
    "bg-background text-foreground border-foreground hover:bg-accent",
  tertiary:
    "bg-transparent text-foreground border-transparent underline underline-offset-4 decoration-[2px] hover:bg-accent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        style={{ borderRadius: 0, fontWeight: 700, ...style }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
