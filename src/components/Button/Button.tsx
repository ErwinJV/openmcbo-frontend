"use client";

interface ButtonProps {
  size: "small" | "medium" | "large";
  variant: "filled" | "outlined" | "text" | "tonal";
  disabled?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
  removePadding?: boolean;
}

export default function Button({
  size,
  variant,
  disabled,
  leftIcon,
  onClick,
  rightIcon,
  text,
  removePadding,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn-${size} btn-${variant} flex items-center gap-2 justify-center font-semibold ${
        removePadding ? "remove-padding" : ""
      }`}
    >
      {leftIcon}
      <span>{text}</span>
      {rightIcon}
    </button>
  );
}
