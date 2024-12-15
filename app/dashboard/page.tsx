import Row from "@/_components/ui/Row";
import BookingTableOperations from "./_components/BookingTableOperations";
import BookingTable from "./_components/BookingTable";
import { Suspense } from "react";
import Spinner from "@/_components/ui/Spinner";
import { getAllBookings } from "@/_lib/actions/booking.actions";

async function Dashboard() {
  const { data: bookings, count } = await getAllBookings();

  return (
    <div className=" h-dvh pt-12 -mt-4 bg-gray-200 dark:bg-gray-800 dark:text-slate-200">
      <Row variant="horizontal">
        <h1>All Bookings</h1>
        <BookingTableOperations />
      </Row>
      
      {bookings && (
        <Suspense fallback={<Spinner />}>
          <BookingTable bookings={bookings} count={count as number} />
        </Suspense>
      )}
    </div>
  );
}

export default Dashboard;
