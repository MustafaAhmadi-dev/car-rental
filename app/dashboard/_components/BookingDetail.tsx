"use client";

import Link from "next/link";
import { deleteBooking } from "@/_lib/actions/booking.actions";
import Row from "@/_components/ui/Row";
import Button from "@/_components/ui/Button";
import ConfirmDelete from "@/_components/ConfirmDelete";
import Modal from "@/_components/ui/Modal";
import React, { Suspense } from "react";
import Spinner from "@/_components/ui/Spinner";
// import { Modal, ModalOpen, ModalWindow } from "@/_components/ui/Modal";

function BookingDetail({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  async function handleDelete(id: number) {
    await deleteBooking(id);
  }

  return (
    <>
      <Row variant="horizontal">
        <div className="flex gap-10 items-center">
          <h1>Booking #{id}</h1>
        </div>
        <Link
          href="/dashboard"
          className="font-[500] text-sky-800 dark:text-sky-400 text-center transition-all bg-none border-none rounded-sm hover:text-sky-900 dark:hover:text-sky-500"
        >
          &larr; Back
        </Link>
      </Row>

      <Suspense fallback={<Spinner />}>{children}</Suspense>

      <div className="flex justify-end gap-5">
        <Modal>
          <Modal.Open opens="delete">
            <Button variant="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => handleDelete(Number(id))}
            />
          </Modal.Window>
        </Modal>
        <Button variant="secondary">
          <Link href="/dashboard">Back</Link>
        </Button>
      </div>
    </>
  );
}

export default BookingDetail;
