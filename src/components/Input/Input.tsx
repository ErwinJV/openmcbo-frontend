import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputProps {
  bg: "transparent" | "filled";
  endAdornment?: React.ReactNode;
  error?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  size: "small" | "medium" | "large";
  type: HTMLInputTypeAttribute;
  variant: "normal" | "outlined" | "text";
  supportText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  type,
  variant,
  endAdornment,
  label,
  size,
  placeholder,
  bg,
  error,
  supportText,
  onChange,
}: InputProps) {
  const errorSuffix = error ? "-error" : "";
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-[16px] capitalize" htmlFor={name}>
          {label}:
        </label>
      )}
      <div
        className={`input-${variant}${errorSuffix} input-${size} input-bg-${bg}${errorSuffix}`}
      >
        <input
          className="outline-0! h-full w-full text-[16px] "
          name={name}
          placeholder={placeholder}
          type={type}
          id={name}
          onChange={onChange}
        />
        {endAdornment ?? <button>{endAdornment}</button>}
      </div>
      {supportText && (
        <span className={`input-support-text${error ? "-error" : "-normal"}`}>
          {supportText}
        </span>
      )}
    </div>
  );
}
