"use client";

import { useSearchParams } from "next/navigation";
import Pagination from "@/_components/ui/Pagination";
import Menus from "@/_components/ui/Menus";
import { BookingPlus } from "@/types";
import BookingRow from "./BookingRow";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
} from "@/_components/ui/Table";

export default function BookingTable({
  bookings,
  count,
}: {
  bookings: BookingPlus[];
  count: number;
}) {
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "pickUpDate-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedBookings =
    bookings?.sort((a, b) => (a[field] - b[field]) * modifier) || [];

  if (!bookings?.length) return <p>No bookings could be found.</p>;

  return (
    <Menus>
      <Table
        columns="0.5fr 1fr 2fr 1fr 0.6fr 0.6fr"
        className="overflow-x-scroll sm:overflow-hidden"
      >
        <TableHeader>
          <div>Car</div>
          <div>Customer</div>
          <div>Dates</div>
          <div>Departure & Return Location</div>
          <div>Amount</div>
          <div></div>
        </TableHeader>

        <TableBody data={sortedBookings as BookingPlus[]}>
          {sortedBookings.map((booking: BookingPlus) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TableBody>

        <TableFooter>
          <Pagination count={count as number} />
        </TableFooter>
      </Table>
    </Menus>
  );
}
