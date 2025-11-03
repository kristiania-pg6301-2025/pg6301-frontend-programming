import { useEffect, useState } from "react";
import type { RentalLocation } from "../../../shared/rentalLocation.js";
import { Link, useSearchParams } from "react-router-dom";
import { fetchJson } from "../../../shared/fetchJson.js";

export function RentalLocationList() {
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState<RentalLocation[]>([]);

  async function loadLocations() {
    setLocations(await fetchJson(`/api/locations?${searchParams}`));
  }

  useEffect(() => {
    loadLocations();
  }, [searchParams]);

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
