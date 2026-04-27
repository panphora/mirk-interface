import { InputHTMLAttributes, forwardRef } from "react";

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
      >
        <span className="relative inline-flex items-center justify-center w-7 h-7 border-[2px] border-foreground bg-background shrink-0 group-hover:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-foreground has-[:focus-visible]:outline-offset-[1px]">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={`peer sr-only ${className}`}
            {...props}
          />
          <span
            aria-hidden
            className="hidden peer-checked:block text-foreground text-[22px] leading-none"
          >
            █
          </span>
        </span>
        <span>{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
