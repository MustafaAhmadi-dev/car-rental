import { getAllCars } from "@/_lib/actions/cars.actions";
import { getCurrentUser } from "@/_lib/actions/user.actions";
import CarTableOperations from "./CarTableOperations";
import CarTable from "./CarTable";
import AddCar from "./AddCar";
import GridBox from "@/_components/ui/GridBox";
import Row from "@/_components/ui/Row";
import CarList from "./CarList";
import Container from "@/_components/ui/Container";

export default async function Cars() {
  const cars = await getAllCars();
  const user = await getCurrentUser();
  const isAuthenticated = user?.role === "authenticated";

  return (
    <>
      {isAuthenticated ? (
        <div className="pt-12">
          <Row variant="horizontal">
            <CarTableOperations />
          </Row>

          <Row>
            <CarTable cars={cars} />
            <AddCar />
          </Row>
        </div>
      ) : (
        <>
          <div className="pt-16">
            <CarTableOperations />
          </div>
          <Container>
            <GridBox>
              <CarList cars={cars} />
            </GridBox>
          </Container>
        </>
      )}
    </>
  );
}
