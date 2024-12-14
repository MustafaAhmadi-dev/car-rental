import BookingDataBox from "../_components/BookingDataBox";
import BookingDetail from "../_components/BookingDetail";

async function page({ params }: { params: Promise<{ bookingId: string }> }) {
  const id = (await params).bookingId;

  return (
    <div className="h-dvh bg-gray-100 dark:bg-gray-700 px-8">
      <BookingDetail id={id}>
        <BookingDataBox id={id} />
      </BookingDetail>
    </div>
  );
}

export default page;
