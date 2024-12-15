import BookingDataBox from "../_components/BookingDataBox";
import BookingDetail from "../_components/BookingDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const bookingId = (await params).bookingId;

  return (
    <div className="h-dvh bg-gray-100 dark:bg-gray-700 px-8">
      <BookingDetail id={bookingId}>
        <BookingDataBox id={bookingId} />
      </BookingDetail>
    </div>
  );
}
