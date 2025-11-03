import { useEffect, useState } from "react";
import type { RentalLocation } from "../../../shared/rentalLocation.js";
import { Link } from "react-router-dom";

export function RentalLocationList() {
  const [locations, setLocations] = useState<RentalLocation[]>([
    { _id: "1", name: "Beachfront apartment", summary: "Wonderful" },
  ]);

  async function loadLocations() {
    const res = await fetch("/api/locations");
    setLocations(await res.json());
  }

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <>
      <h1>Locations</h1>
      {locations.map(({ _id, name }) => (
        <li key={_id}>
          <Link to={`/locations/${_id}`}>{name}</Link>
        </li>
      ))}
    </>
  );
}
