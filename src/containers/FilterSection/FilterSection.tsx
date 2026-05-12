"use client";

import Accordion from "@/components/Accordion";
import Button from "@/components/Button";

import Counter from "@/components/Counter";
import Input from "@/components/Input";

import RadioGroup from "@/components/RadioGroup";
import SearchFilter from "@/components/SearchFilter";
import { PropertyStatus, PropertyType } from "@/graphql/generated-types";
import { PropertiesContext } from "@/providers/PropertiesProvider/properties-filter-context";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useContext, useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";

export default function FilterSection() {
  const router = useRouter();
  const { filterNavigate, handleSearchParams, searchParams } =
    useContext(PropertiesContext);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleFilter = useCallback(() => {
    setShowFilter((current) => !current);
  }, []);

  const incrementRooms = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      num_bedrooms: Number(searchParams.num_bedrooms || "0") + 1,
    });
  }, [handleSearchParams, searchParams]);

  const decrementRooms = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      num_bedrooms: Number(searchParams.num_bedrooms || "0") - 1,
    });
  }, [handleSearchParams, searchParams]);

  const incrementBaths = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      num_bathrooms: Number(searchParams.num_bathrooms || "0") + 1,
    });
  }, [handleSearchParams, searchParams]);

  const decrementBaths = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      offset: 0,
      num_bathrooms: Number(searchParams.num_bathrooms || "0") - 1,
    });
  }, [handleSearchParams, searchParams]);

  const handlePropertyType = useCallback(
    (value: unknown) => {
      handleSearchParams({
        ...searchParams,
        offset: 0,
        type: value as PropertyType,
      });
    },
    [handleSearchParams, searchParams],
  );

  const incrementParking = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      offset: 0,
      num_parking_lot: Number(searchParams.num_parking_lot || "0") + 1,
    });
  }, [handleSearchParams, searchParams]);

  const decrementParking = useCallback(() => {
    handleSearchParams({
      ...searchParams,
      offset: 0,
      num_parking_lot: Number(searchParams.num_parking_lot || "0") - 1,
    });
  }, [handleSearchParams, searchParams]);

  const handlePropertyStatus = useCallback(
    (value: unknown) => {
      handleSearchParams({
        ...searchParams,
        offset: 0,
        status: value as PropertyStatus,
      });
    },
    [handleSearchParams, searchParams],
  );

  const handleMinArea = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleSearchParams({
        ...searchParams,
        offset: 0,
        min_area: parseInt(e.target.value),
      });
    },
    [handleSearchParams, searchParams],
  );

  const handleMaxArea = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleSearchParams({
        ...searchParams,
        max_area: parseInt(e.target.value),
      });
    },
    [handleSearchParams, searchParams],
  );

  const cleanParams = useCallback(() => {
    handleSearchParams({});

    const url = `/inmuebles`;
    router.push(url, { scroll: false });
  }, [handleSearchParams, router]);

  const submit = useCallback(() => {
    filterNavigate();
    toggleFilter();
  }, [filterNavigate, toggleFilter]);

  const filterContent: { key: string; element: React.ReactNode }[] = useMemo(
    () => [
      {
        key: "radioStatus",
        element: (
          <Accordion title="Operacion">
            <RadioGroup
              options={[
                {
                  id: "venta",
                  label: "Venta",
                  value: PropertyStatus.Sale,
                },
                {
                  id: "alquiler",
                  label: "Alquiler",
                  value: PropertyStatus.Rent,
                },
              ]}
              value={searchParams.status}
              onChange={handlePropertyStatus}
            />
          </Accordion>
        ),
      },

      {
        key: "maxPropertyArea",
        element: (
          <Accordion title="Area">
            <div className="flex flex-col space-y-3">
              <Input
                bg="transparent"
                label="Desde"
                name="area"
                onChange={handleMinArea}
                size="medium"
                type="number"
                variant="normal"
                value={searchParams.min_area ?? ""}
              />
              <Input
                bg="transparent"
                label="Hasta"
                name="area"
                onChange={handleMaxArea}
                size="medium"
                type="number"
                variant="normal"
                value={searchParams.max_area ?? ""}
              />
            </div>
          </Accordion>
        ),
      },

      {
        key: "radioPropertyType",
        element: (
          <Accordion title="Tipo de Propiedad">
            <RadioGroup
              options={[
                {
                  id: "apartamento",
                  label: "Apartamento",
                  value: PropertyType.Apartment,
                },
                { id: "casa", label: "Casa", value: PropertyType.House },
              ]}
              value={searchParams.type}
              onChange={handlePropertyType}
            />
          </Accordion>
        ),
      },

      {
        key: "caracteristicas",
        element: (
          <Accordion title="Caracteristicas">
            <div className="flex flex-col space-y-3">
              <Counter
                increment={incrementRooms}
                decrement={decrementRooms}
                value={searchParams.num_bedrooms || 0}
                maxValue={5}
                minValue={0}
                title="Habitaciones"
              />
              <Counter
                increment={incrementBaths}
                decrement={decrementBaths}
                value={searchParams.num_bathrooms || 0}
                maxValue={5}
                minValue={0}
                title="Bano"
              />
              <Counter
                increment={incrementParking}
                decrement={decrementParking}
                value={searchParams.num_parking_lot || 0}
                maxValue={5}
                minValue={0}
                title="Estacionamientos"
              />
            </div>
          </Accordion>
        ),
      },
    ],
    [
      searchParams.status,
      searchParams.min_area,
      searchParams.max_area,
      searchParams.type,
      searchParams.num_bedrooms,
      searchParams.num_bathrooms,
      searchParams.num_parking_lot,
      handlePropertyStatus,
      handleMinArea,
      handleMaxArea,
      handlePropertyType,
      incrementRooms,
      decrementRooms,
      incrementBaths,
      decrementBaths,
      incrementParking,
      decrementParking,
    ],
  );

  return (
    <>
      <div className="relative">
        <div className="w-40 ">
          <Button
            leftIcon={<IoFilter />}
            onClick={toggleFilter}
            size="small"
            text="Mas filtros"
            variant="tonal"
          />
        </div>
        <div className={`${showFilter ? "filter-container" : "filter-hidden"}`}>
          <SearchFilter
            inputs={filterContent}
            submit={submit}
            clear={cleanParams}
          />
        </div>
      </div>
    </>
  );
}
