import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, hint, error, options, placeholder, id, className = "", ...props }, ref) => {
    const inputId = id || (label ? `sel-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="text-[18px] leading-tight text-foreground" style={{ fontWeight: 600 }}>
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={inputId}
            className={`w-full appearance-none bg-background text-foreground border-[2px] border-foreground px-4 py-3 pr-12 text-[18px] leading-tight focus:bg-accent focus:[outline:1px_solid_var(--foreground)] focus:[outline-offset:1px] disabled:opacity-50 ${error ? "border-destructive" : ""} ${className}`}
            style={{ borderRadius: 0 }}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            size={24}
            strokeWidth={2.5}
          />
        </div>
        {hint && !error && <span className="text-[16px] text-muted-foreground">{hint}</span>}
        {error && <span className="text-[16px] text-destructive" style={{ fontWeight: 600 }}>{error}</span>}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";
