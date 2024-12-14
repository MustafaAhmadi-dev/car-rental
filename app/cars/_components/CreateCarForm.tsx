"use client";

import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { createCar, updateCar } from "@/_lib/actions/cars.actions";
import { handleError } from "@/_lib/utils";
import { CreateCarFormProps } from "@/types";
import LOCATION_DATA from "@/data/locationData";
import FileInput from "@/_components/ui/FileInput";
import FormRow from "@/_components/ui/FormRow";
import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import Form from "@/_components/ui/Form";

function CreateCarForm({
  modal,
  carToEdit = {},
  onCloseModal,
}: CreateCarFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { id: editId, ...editValues } = carToEdit;
  const isEditSession = Boolean(editId);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: isEditSession ? editValues : {} });

  useEffect(() => {
    // Disable Scroll when this component is shown
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function onSubmit(data: FieldValues) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    setIsLoading(true);

    try {
      if (isEditSession) {
        if (editId !== undefined) {
          // await updateCar({ newCar: { ...data, image }, id: editId });
          await updateCar({ ...data, image }, editId);
        }
      } else await createCar({ ...data, image: image });
    } catch (error) {
      handleError(error, "Failed to Edit/Create car!!!");
    }
    setIsLoading(false);
    onCloseModal?.();
  }

  return (
    <Form
      variant={modal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Car name" error={errors?.name?.message?.toString()}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Number of Seats"
        error={errors?.num_seats?.message?.toString()}
      >
        <Input
          type="number"
          id="num_seats"
          disabled={isLoading}
          {...register("num_seats", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Number of Seats should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regular_price?.message?.toString()}
      >
        <Input
          type="number"
          id="regular_price"
          disabled={isLoading}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 10,
              message: "The price should be at least 10",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Location of Car"
        error={errors?.location?.message?.toString()}
      >
        <select
          className="py-3 px-5 shadow-sm rounded-md border-2 border-solid border-gray-500 dark:bg-gray-600 dark:text-slate-200"
          {...register("location", { required: "This field is required!" })}
        >
          {LOCATION_DATA.map((location) => (
            <option key={location.id}>{location.name}</option>
          ))}
        </select>
      </FormRow>

      <FormRow
        label="Type of Car"
        error={errors?.car_type?.message?.toString()}
      >
        <Input
          type="text"
          id="car_type"
          placeholder="Medium Cars"
          disabled={isLoading}
          {...register("car_type", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Mark of Car" error={errors?.mark?.message?.toString()}>
        <Input
          type="text"
          id="mark"
          disabled={isLoading}
          {...register("mark", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label="Fuel of Car" error={errors?.fuel?.message?.toString()}>
        <Input
          type="text"
          id="fuel"
          placeholder="Diesel"
          disabled={isLoading}
          {...register("fuel", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow
        label="Transmission of Car"
        error={errors?.transmission?.message?.toString()}
      >
        <Input
          type="text"
          id="transmission"
          placeholder="Automatic"
          disabled={isLoading}
          {...register("transmission", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow
        label="the Production Year"
        error={errors?.year?.message?.toString()}
      >
        <Input
          type="text"
          id="year"
          disabled={isLoading}
          {...register("year", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Car photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            variant="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>
            {isEditSession ? "Edit car" : "Create new car"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCarForm;
