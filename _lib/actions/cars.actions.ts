"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase";
import { handleError } from "../utils";

export async function getAllCars() {
  const { data: cars, error } = await supabase.from("cars").select("*");

  if (error) {
    handleError(error, "cars could not be loaded");
  }

  return cars;
}

export async function createCar(newCar: {
  image: File | string;
  [key: string]: unknown;
}) {
  const hasImagePath =
    typeof newCar.image === "string" &&
    newCar.image?.startsWith?.(process.env.SUPABASE_URL!);

  const imageName = `${Math.random()}-${
    (newCar.image as File).name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCar.image
    : `${process.env.SUPABASE_URL!}/storage/v1/object/public/cars/${imageName}`;

  // 1. Create Car
  const { data, error } = await supabase
    .from("cars")
    .insert([{ ...newCar, image: imagePath }])
    .select()
    .single();

  revalidatePath("/cars");

  if (error) {
    handleError(error, "Car could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cars")
    .upload(imageName, newCar.image);

  // 3. Delete the car IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Car image could not be uploaded and the car was not created"
    );
  }

  return data;
}

export async function updateCar(
  newCar: { image: File | string; [key: string]: unknown },
  id: number
) {
  const hasImagePath =
    typeof newCar.image === "string" &&
    newCar.image?.startsWith?.(process.env.SUPABASE_URL!);

  const imageName = `${Math.random()}-${
    (newCar.image as File).name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCar.image
    : `${process.env.SUPABASE_URL!}/storage/v1/object/public/cars/${imageName}`;

  // 1. Update Car
  const { data, error } = await supabase
    .from("cars")
    .update({ ...newCar, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  revalidatePath("/cars");

  if (error) {
    handleError(error, "Car could not be updated");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cars")
    .upload(imageName, newCar.image);

  // 3. Delete the car IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cars").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Car image could not be uploaded and the car was not updated"
    );
  }
}

// export async function createEditCar(
//   newCar: { image: File | string; [key: string]: unknown },
//   id?: number
// ) {
//   const hasImagePath =
//     typeof newCar.image === "string" &&
//     newCar.image?.startsWith?.(process.env.SUPABASE_URL!);

//   const imageName = `${Math.random()}-${
//     (newCar.image as File).name
//   }`.replaceAll("/", "");

//   const imagePath = hasImagePath
//     ? newCar.image
//     : `${process.env.SUPABASE_URL!}/storage/v1/object/public/cars/${imageName}`;

//   // 1. Create/edit Car
//   let query = supabase.from("cars");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCar, image: imagePath }]);

//   // B) EDIT
//   if (id) query = query.update({ ...newCar, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Car could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("cars")
//     .upload(imageName, newCar.image);

//   // 3. Delete the car IF there was an error uplaoding image
//   if (storageError) {
//     await supabase.from("cars").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Car image could not be uploaded and the car was not created"
//     );
//   }

//   return data;
// }

export async function deleteCar(id: number) {
  const { error } = await supabase.from("cars").delete().eq("id", id);

  revalidatePath("/cars");

  if (error) {
    console.error(error);
    throw new Error("Car could not be deleted");
  }
}
