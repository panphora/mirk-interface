import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, id, className = "", rows = 4, ...props }, ref) => {
    const inputId = id || (label ? `ta-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="text-[18px] leading-tight text-foreground uppercase tracking-wide">
            &gt; {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`w-full bg-background text-foreground border-[2px] border-foreground px-4 py-3 text-[18px] leading-snug resize-y placeholder:text-muted-foreground focus:bg-accent focus:[outline:1px_solid_var(--foreground)] focus:[outline-offset:1px] disabled:opacity-50 ${error ? "border-destructive" : ""} ${className}`}
          style={{ borderRadius: 0 }}
          {...props}
        />
        {hint && !error && <span className="text-[16px] text-muted-foreground">// {hint}</span>}
        {error && <span className="text-[16px] text-destructive uppercase">! {error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
