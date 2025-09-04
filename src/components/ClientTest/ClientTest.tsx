"use client";

import { useCallback, useState } from "react";
import Counter from "../Counter";

export default function ClientTest() {
  const [counter, setCounter] = useState<number>(0);

  const increment = useCallback(() => {
    setCounter((current) => current + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((current) => current - 1);
  }, []);

  return (
    <>
      <Counter
        increment={increment}
        decrement={decrement}
        value={counter}
        maxValue={5}
        minValue={0}
        title="Habitaciones"
      />
    </>
  );
}
