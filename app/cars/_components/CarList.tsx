"use client";
import { Car } from "@/types";
import CarItem from "./CarItem";
import { useSearchParams } from "next/navigation";
import { useVoyager } from "@/app/voyagerContext";

export default function CarList({ cars }: { cars: Car[] | null | undefined }) {
  const searchParams = useSearchParams();
  const { pickUp } = useVoyager();
  let fliteredCarsByLocation = cars;
  if (pickUp)
    fliteredCarsByLocation = cars?.filter((car) => car.location === pickUp);

  // 1) FILTER
  const filterValue = searchParams.get("type") || "all";
  let filteredCars: Car[] | null | undefined;

  if (filterValue === "all") filteredCars = fliteredCarsByLocation;
  if (filterValue === "luxury")
    filteredCars = cars?.filter((car) => car.car_type === "Luxury");
  if (filterValue === "medium-cars")
    filteredCars = cars?.filter((car) => car.car_type === "Medium Cars");
  if (filterValue === "people-carrier")
    filteredCars = cars?.filter((car) => car.car_type === "People Carrier");

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCars =
    filteredCars?.sort((a, b) => (a[field] - b[field]) * modifier) || [];

  return (
    <>
      {sortedCars?.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </>
  );
}
