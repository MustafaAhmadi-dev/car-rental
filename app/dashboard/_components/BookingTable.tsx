import Menus from "@/_components/ui/Menus";
import Pagination from "@/_components/ui/Pagination";
import { getAllBookings } from "@/_lib/actions/booking.actions";
import { BookingPlus } from "@/types";
import BookingRow from "./BookingRow";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
} from "@/_components/ui/Table";

export default async function BookingTable() {
  const { data: bookings, count } = await getAllBookings({});

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

        <TableBody data={bookings as BookingPlus[]}>
          {bookings.map((booking: BookingPlus) => (
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
