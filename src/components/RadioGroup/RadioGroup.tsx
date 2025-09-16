"use client";
import { useCallback, useEffect, useState } from "react";

interface RadioGroupProps {
  options: { id: string; label: string; value: string; disabled?: boolean }[];
  value: string;
  onChange?: (value: string) => void;
}

export default function RadioGroup({
  options,

  value,
  onChange,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div className="radio-group-container">
      <div className="radio-group-options">
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="radio-group-label"
          >
            <div className="radio-custom-container">
              <input
                type="radio"
                id={option.id}
                name="radioGroup"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleRadioChange}
                className="radio-input-hidden"
                disabled={option.disabled ? option.disabled : false}
              />
              <div
                className={`radio-custom ${
                  selectedValue === option.value
                    ? `radio-custom${
                        option.disabled ? "-disabled" : "-selected"
                      }`
                    : `radio-custom${
                        option.disabled ? "-disabled" : "-unselected"
                      }`
                }`}
              >
                {selectedValue === option.value && (
                  <div
                    className={`radio-inner${
                      option.disabled ? "-disabled" : "-dot"
                    }`}
                  ></div>
                )}
              </div>
            </div>
            <span
              className={`radio-label${
                option.disabled ? "-text" : "-disabled"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
