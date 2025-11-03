import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJson } from "../../../shared/fetchJson.js";

export function RentalMarketsList() {
  const [markets, setMarkets] = useState<string[]>([]);

  async function loadMarkets() {
    setMarkets(await fetchJson("/api/locations/markets"));
  }

  useEffect(() => {
    loadMarkets();
  }, []);

  return (
    <>
      <h1>Markets</h1>
      {markets.toSorted().map((m) => (
        <li key={m}>
          <Link to={`/locations?market=${m}`}>{m}</Link>
        </li>
      ))}
    </>
  );
}
