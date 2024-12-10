import Filter from "@/_components/ui/Filter";
import SortBy from "@/_components/ui/SortBy";

function CarTableOperations() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:justify-end">
      <Filter
        field="type"
        options={[
          { value: "all", label: "All" },
          { value: "luxury", label: "Luxury" },
          { value: "medium-cars", label: "Medium" },
          { value: "people-carrier", label: "People Carrier" },
        ]}
      />

      <SortBy
        options={[
          { value: "regular_price-asc", label: "Sort by price (low first)" },
          { value: "regular_price-desc", label: "Sort by price (high first)" },
          {
            value: "num_seats-asc",
            label: "Sort by number of seats (low first)",
          },
          {
            value: "num_seats-desc",
            label: "Sort by number of seats (high first)",
          },
        ]}
      />
    </div>
  );
}

export default CarTableOperations;
