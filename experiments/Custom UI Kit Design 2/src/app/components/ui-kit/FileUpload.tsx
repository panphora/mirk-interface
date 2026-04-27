import { InputHTMLAttributes, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  buttonText?: string;
  hint?: string;
}

export function FileUpload({
  label,
  buttonText = "Choose file",
  hint,
  onChange,
  multiple,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
    onChange?.(e);
  };

  const clear = () => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className="text-[18px] leading-tight text-foreground" style={{ fontWeight: 600 }}>
          {label}
        </span>
      )}
      <div className="flex items-stretch border-[2px] border-foreground bg-background">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[18px] border-r-[2px] border-foreground hover:bg-accent hover:text-foreground"
          style={{ fontWeight: 700 }}
        >
          <Upload size={20} strokeWidth={2.5} aria-hidden />
          {buttonText}
        </button>
        <div className="flex-1 flex items-center justify-between px-4 text-[18px] text-foreground min-w-0">
          <span className="truncate">
            {files.length === 0
              ? "No file selected"
              : files.length === 1
              ? files[0].name
              : `${files.length} files selected`}
          </span>
          {files.length > 0 && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear file"
              className="ml-2 p-1 hover:bg-accent shrink-0"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          className="sr-only"
          onChange={handleChange}
          {...props}
        />
      </div>
      {hint && <span className="text-[16px] text-muted-foreground">{hint}</span>}
    </div>
  );
}
