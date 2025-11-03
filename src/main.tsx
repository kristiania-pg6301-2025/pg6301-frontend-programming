import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";

function Application() {
  const [locations, setLocations] = useState([
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

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
