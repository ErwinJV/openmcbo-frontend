"use client";

import { useCallback, useMemo, useState } from "react";
import Counter from "../Counter";
import Checkbox from "../Checkbox";

import RadioGroup from "../RadioGroup";
import GalleryButton from "../GalleryButton";
import { IoCamera } from "react-icons/io5";
import SearchBar from "../SearchBar";
import Accordion from "../Accordion";
import SearchFilter from "../SearchFilter";

export default function ClientTest() {
  const [counter, setCounter] = useState<number>(0);

  const [checked, setChecked] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>("1");

  const increment = useCallback(() => {
    setCounter((current) => current + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((current) => current - 1);
  }, []);

  const handleCheckboxChange = useCallback((newChecked: boolean) => {
    setChecked(newChecked);
  }, []);

  const handleRadioChange = useCallback((newValue: string) => {
    setRadioValue(newValue);
  }, []);

  const filterContent: { key: string; element: React.ReactNode }[] = useMemo(
    () => [
      {
        key: "counter",
        element: (
          <Accordion title="Habitaciones">
            <Counter
              increment={increment}
              decrement={decrement}
              value={counter}
              maxValue={5}
              minValue={0}
              title="Habitaciones"
            />
          </Accordion>
        ),
      },
      {
        key: "checkbox",
        element: (
          <Accordion title="Operacion">
            <Checkbox
              checked={checked}
              label="Alquiler"
              onChange={handleCheckboxChange}
            />
          </Accordion>
        ),
      },
      {
        key: "radio",
        element: (
          <Accordion title="Tipo de Propiedad">
            <RadioGroup
              options={[
                { id: "example1", label: "Example 1", value: "1" },
                { id: "example2", label: "Example 2", value: "2" },
                {
                  id: "example3",
                  label: "Example 3",
                  value: "3",
                  disabled: true,
                },
              ]}
              value={radioValue}
              onChange={handleRadioChange}
            />
          </Accordion>
        ),
      },
    ],
    [
      counter,
      decrement,
      increment,
      checked,
      handleCheckboxChange,
      radioValue,
      handleRadioChange,
    ]
  );

  return (
    <>
      {/* <Counter
        increment={increment}
        decrement={decrement}
        value={counter}
        maxValue={5}
        minValue={0}
        title="Habitaciones"
      />
      <div className="h-4" />
      <Checkbox
        checked={checked}
        label="Example Checkbox"
        onChange={handleCheckboxChange}
      />

      <Accordion title="Este es un Accordion">
        <RadioGroup
          options={[
            { id: "example1", label: "Example 1", value: "1" },
            { id: "example2", label: "Example 2", value: "2" },
            { id: "example3", label: "Example 3", value: "3", disabled: true },
          ]}
          value={radioValue}
          onChange={handleRadioChange}
        />
      </Accordion> */}

      <SearchFilter inputs={filterContent} />

      <div className="flex w-99 md:w-170 lg:w-106">
        <GalleryButton
          icon={
            <IoCamera
              className={`gallery-button-icon gallery-button-icon-unselected`}
            />
          }
          text="Fotos 360 "
          selected={false}
          onClick={() => {}}
        />
        <GalleryButton
          icon={
            <IoCamera
              className={`gallery-button-icon gallery-button-icon-selected`}
            />
          }
          text="Fotos 360 "
          selected={true}
          onClick={() => {}}
        />
        <GalleryButton
          icon={
            <IoCamera
              className={`gallery-button-icon gallery-button-icon-unselected`}
            />
          }
          text="Fotos 360 "
          selected={false}
          onClick={() => {}}
        />
      </div>
      <SearchBar />
    </>
  );
}
