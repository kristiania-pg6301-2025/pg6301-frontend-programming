import { RentalLocationList } from "../locations/rentalLocationList.js";
import { Route, Routes } from "react-router-dom";
import { RentalMarketsList } from "../locations/rentalMarketsList.js";

export function ApplicationMain() {
  return (
    <main>
      <Routes>
        <Route path={"/"} element={<RentalMarketsList />} />
        <Route path={"/locations"} element={<RentalLocationList />} />
        <Route path={"*"} element={<h1>Not found</h1>} />
      </Routes>
    </main>
  );
}
