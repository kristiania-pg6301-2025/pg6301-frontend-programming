import { RentalLocationList } from "../locations/rentalLocationList.js";
import { Route, Routes, useParams } from "react-router-dom";
import { RentalMarketsList } from "../locations/rentalMarketsList.js";
import { SingleRentalLocation } from "../locations/singleRentalLocation.js";

function SingleRentalLocationStub() {
  const { id } = useParams();
  if (!id) return <h1>Not found</h1>;
  return <SingleRentalLocation id={id} />;
}

export function ApplicationMain() {
  return (
    <main>
      <Routes>
        <Route path={"/"} element={<RentalMarketsList />} />
        <Route path={"/locations"} element={<RentalLocationList />} />
        <Route path={"/locations/:id"} element={<SingleRentalLocationStub />} />
        <Route path={"*"} element={<h1>Not found</h1>} />
      </Routes>
    </main>
  );
}
