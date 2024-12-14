"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBooking } from "@/_lib/actions/booking.actions";
import { HiEye, HiTrash } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { BookingPlus } from "@/types";
import {
  formatCurrency,
  formatDistanceFromNow,
  handleError,
  subtractDates,
} from "@/_lib/utils";
import Modal from "@/_components/ui/Modal";
import Menus from "@/_components/ui/Menus";
import { TableRow } from "@/_components/ui/Table";
import ConfirmDelete from "@/_components/ConfirmDelete";

function BookingRow({ booking }: { booking: BookingPlus }) {
  const {
    cars: { name: car },
    customers: { fullName: customerName, email: email },
    id: bookingId,
    pickUpDate,
    dropOffDate,
    pickUpLocation,
    dropOffLocation,
    totalPrice,
  } = booking;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const daysRide = subtractDates(dropOffDate, pickUpDate);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteBooking(bookingId);
    } catch (error) {
      handleError(error, "Failed to delete booking!!!");
    }
    setIsLoading(false);
  }
  return (
    <TableRow>
      <div className="text-gray-600 font-semibold text-3xl">{car}</div>

      <div className="flex flex-col gap-1">
        <span className="font-[500]">{customerName || "Unknown"}</span>
        <span className="text-gray-500 text-xl">
          {email || "Not Registered"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {isToday(new Date(pickUpDate))
          ? "Today"
          : formatDistanceFromNow(pickUpDate)}{" "}
        &rarr; {daysRide === 0 ? 1 : daysRide} day ride
        <span>
          {format(new Date(pickUpDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(dropOffDate), "MMM dd yyyy")}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {pickUpLocation} &rarr; {dropOffLocation}
      </div>
      {/* 
          
     */}

      <div className="font-[500]">{formatCurrency(totalPrice)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId.toString()} />
          <Menus.List id={bookingId.toString()}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => router.push(`/dashboard/${bookingId}`)}
            >
              See details
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={isLoading}>
                delete Booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={handleDelete}
            disabled={isLoading}
          />
        </Modal.Window>
      </Modal>
    </TableRow>
  );
}

export default BookingRow;
