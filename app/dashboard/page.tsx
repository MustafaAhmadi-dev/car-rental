import Row from "@/_components/ui/Row";
import BookingTableOperations from "./_components/BookingTableOperations";
import BookingTable from "./_components/BookingTable";
import { getCurrentUser } from "@/_lib/actions/user.actions";

async function Dashboard() {
  const user = await getCurrentUser();
  const isAuthenticated = user?.role === "authenticated";

  if (!isAuthenticated) return;

  return (
    <div className=" h-dvh pt-12 -mt-4 bg-gray-200 dark:bg-gray-800 dark:text-slate-200">
      <Row variant="horizontal">
        <h1>All Bookings</h1>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </div>
  );
}

export default Dashboard;
