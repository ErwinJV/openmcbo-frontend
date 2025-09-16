import { useCallback, useEffect, useState } from "react";

interface ChechboxProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({
  checked,
  disabled,
  label,
  onChange,
}: ChechboxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  const handleOnChange = useCallback(() => {
    onChange(!isChecked);
  }, [onChange, isChecked]);
  return (
    <label
      className="inline-flex items-center space-x-3 cursor-pointer"
      htmlFor={label.toLowerCase().replaceAll(" ", "-")}
    >
      <input
        checked={checked}
        className="form-checkbox h-6 w-6 text-blue-600"
        disabled={disabled ? disabled : false}
        id={label.toLowerCase().replaceAll(" ", "-")}
        onChange={handleOnChange}
        type="checkbox"
      />
      <span
        className={`checkbox-label ${
          disabled ? "disabled-checkbox-label" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
}
