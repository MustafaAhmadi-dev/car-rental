"use client";

import Image from "next/image";
import { useState } from "react";
import { formatCurrency, handleError } from "@/_lib/utils";
import { createCar, deleteCar } from "@/_lib/actions/cars.actions";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "@/_components/ConfirmDelete";
import CreateCarForm from "./CreateCarForm";
import Menus from "@/_components/ui/Menus";
import Modal from "@/_components/ui/Modal";
import { TableRow } from "@/_components/ui/Table";
import { Car } from "@/types";

function CarRow({ car }: { car: Car }) {
  const {
    id: carId,
    name,
    image,
    num_seats: numSeats,
    regular_price: price,
    car_type: type,
  } = car;
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function handleDuplicate() {
    setIsLoading(true);
    try {
      await createCar({
        name: `Copy of ${name}`,
        image,
        num_seats: numSeats,
        regular_price: price,
        car_type: type,
      });
    } catch (error) {
      handleError(error, "Failed to Duplicate the car!!!");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleDelete(id: number) {
    setIsLoading(true);
    try {
      await deleteCar(id);
    } catch (error) {
      handleError(error, "Failed to Duplicate the car!!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <TableRow>
        <div className="relative aspect-square">
          <Image
            src={image}
            alt="car image"
            fill
            className="block w-24 object-cover"
            style={{
              transform: "scale(1.5) translateX(-7px)",
              aspectRatio: "3 / 2",
            }}
          />
        </div>
        <div className="text-2xl font-semibold font-[Sono]">{name}</div>
        <div>Fits up to {numSeats} passengers</div>
        <div> {type} </div>
        <div className="font-[Sono] font-semibold">{formatCurrency(price)}</div>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={carId.toString()} />

              <Menus.List id={carId.toString()}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isLoading}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button
                    icon={<HiPencil />}
                    onClick={() => setEditModalOpen(true)}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              {editModalOpen && (
                <Modal.Window name="edit" scroll>
                  <CreateCarForm
                    modal
                    carToEdit={car}
                    onCloseModal={() => setEditModalOpen(false)}
                  />
                </Modal.Window>
              )}

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  disabled={isLoading}
                  onConfirm={() => handleDelete(carId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default CarRow;
