import { useEffect, useState } from "react";
import type { RentalLocation } from "../../../shared/rentalLocation.js";
import { Link } from "react-router-dom";

export function ListLocations() {
  const [locations, setLocations] = useState<RentalLocation[]>([]);

  async function loadLocations() {
    const res = await fetch("/api/locations");
    setLocations(await res.json());
  }

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <article>
      <h1>Locations</h1>
      {locations.map(({ _id, name }) => (
        <li key={_id}>
          <Link to={`/locations/${_id}`}>{name}</Link>
        </li>
      ))}
    </article>
  );
}
