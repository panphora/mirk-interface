import { InputHTMLAttributes, forwardRef } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, hint, error, id, className = "", ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="text-[18px] leading-tight text-foreground uppercase tracking-wide">
            &gt; {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-background text-foreground border-[2px] border-foreground px-4 py-3 text-[18px] leading-tight placeholder:text-muted-foreground focus:bg-accent focus:[outline:1px_solid_var(--foreground)] focus:[outline-offset:1px] disabled:opacity-50 disabled:cursor-not-allowed ${error ? "border-destructive" : ""} ${className}`}
          style={{ borderRadius: 0 }}
          {...props}
        />
        {hint && !error && <span className="text-[16px] text-muted-foreground">// {hint}</span>}
        {error && <span className="text-[16px] text-destructive uppercase">! {error}</span>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
