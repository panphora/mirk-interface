import { InputHTMLAttributes, forwardRef } from "react";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, id, className = "", ...props }, ref) => {
    const inputId = id || `radio-${label.toLowerCase().replace(/\s+/g, "-")}-${props.value}`;
    return (
      <label
        htmlFor={inputId}
        className="flex items-center gap-3 cursor-pointer text-[18px] text-foreground select-none group"
        style={{ fontWeight: 500 }}
      >
        <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full border-[2px] border-foreground bg-background shrink-0 group-hover:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-foreground has-[:focus-visible]:outline-offset-[1px]">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className={`peer sr-only ${className}`}
            {...props}
          />
          <span className="hidden peer-checked:block w-3.5 h-3.5 rounded-full bg-foreground" />
        </span>
        <span>{label}</span>
      </label>
    );
  }
);
Radio.displayName = "Radio";

interface RadioGroupProps {
  label?: string;
  name: string;
  value?: string;
  onChange?: (val: string) => void;
  options: { value: string; label: string }[];
}

export function RadioGroup({ label, name, value, onChange, options }: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3 w-full border-0 p-0 m-0">
      {label && (
        <legend className="text-[18px] leading-tight text-foreground mb-1" style={{ fontWeight: 600 }}>
          {label}
        </legend>
      )}
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          checked={value === o.value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ))}
    </fieldset>
  );
}
