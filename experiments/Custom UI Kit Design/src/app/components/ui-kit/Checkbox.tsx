import { InputHTMLAttributes, forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = "", ...props }, ref) => {
    const inputId = id || `cb-${label.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <label
        htmlFor={inputId}
        className="flex items-center gap-3 cursor-pointer text-[18px] text-foreground select-none group"
        style={{ fontWeight: 500 }}
      >
        <span className="relative inline-flex items-center justify-center w-7 h-7 border-[2px] border-foreground bg-background shrink-0 group-hover:bg-accent">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={`peer sr-only ${className}`}
            {...props}
          />
          <Check
            aria-hidden
            size={22}
            strokeWidth={4}
            className="hidden peer-checked:block text-foreground"
          />
        </span>
        <span>{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
