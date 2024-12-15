import { Suspense } from "react";
import Cars from "./_components/Cars";
import HeroPage from "@/_components/HeroPage";
import Spinner from "@/_components/ui/Spinner";
import BookBanner from "@/_components/BookBanner";
import { getAllCars } from "@/_lib/actions/cars.actions";

export default async function page() {
  const cars = await getAllCars();

  return (
    <>
      <section className="dark:bg-slate-900">
        <HeroPage sectionName="Vehicle Models" />

        {cars && (
          <Suspense fallback={<Spinner />}>
            <Cars cars={cars} />
          </Suspense>
        )}

        <BookBanner />
      </section>
    </>
  );
}
