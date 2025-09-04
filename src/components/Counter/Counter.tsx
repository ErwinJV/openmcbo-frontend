"use client";

import { useCallback } from "react";

interface CounterProps {
  decrement: () => void;
  value: number;
  increment: () => void;
  minValue: number;
  maxValue: number;
  title: string;
}

export default function Counter({
  decrement,
  increment,
  value,
  maxValue,
  minValue,
  title,
}: CounterProps) {
  const handleIncrement = useCallback(() => {
    if (value === maxValue) return;
    increment();
  }, [increment, maxValue, value]);

  const handleDecrement = useCallback(() => {
    if (value === minValue) return;
    decrement();
  }, [decrement, minValue, value]);

  return (
    <div className="flex w-80 justify-between">
      <span className="text-[18px] capitalize">{title}</span>
      <div className="flex space-x-3">
        <button
          className={`counter-button counter-button${
            value === minValue ? "-inactive" : "-active"
          }`}
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="text-[18px] w-6 h-6 flex items-center justify-center  text-black">
          {value === 0 ? "-" : value}
        </span>
        <button
          className={`counter-button counter-button${
            value === maxValue ? "-inactive" : "-active"
          }`}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}
