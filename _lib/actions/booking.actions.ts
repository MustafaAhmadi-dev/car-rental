"use server";

import { Booking } from "@/types";
import { supabase } from "../supabase";
// import { PAGE_SIZE } from "@/constants";
import { handleError } from "../utils";

export async function getAllBookings() {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*,cars(name),customers(fullName, email)", { count: "exact" });

  // if (sortBy)
  //   query = query.order(sortBy.field, {
  //     ascending: sortBy.direction === "asc",
  //   });

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }

  if (error) {
    handleError(error, "Bookings could not be fetched");
  }

  return { data, count };
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cars(*), customers(*)")
    .eq("id", id)
    .single();

  if (error) {
    handleError(error, "Booking not found");
  }

  return data;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    handleError(error, "Booking could not be deleted");
  }

  return data;
}

export async function createOrder(newBooking: Booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...newBooking }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Order could not be registered");
  }

  return data;
}
