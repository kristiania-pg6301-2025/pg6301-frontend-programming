import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import type { RentalLocation } from "../shared/rentalLocation.js";

import "./application.css";

function ApplicationHeader() {
  const [userinfo, setUserinfo] = useState<{ name: string }>();

  async function loadUserinfo() {
    const res = await fetch("/api/userinfo");
    if (res.ok) setUserinfo(await res.json());
  }

  useEffect(() => {
    loadUserinfo();
  }, []);

  return (
    <header>
      <div>Logo</div>
      <div style={{ flex: 1 }} />
      <div>
        {userinfo ? (
          <>
            {userinfo.name}{" "}
            <button>
              <a href={"/api/login/linkedin/endsession"}>➜]</a>
            </button>
          </>
        ) : (
          <a href={"/api/login/linkedin"}>Log in</a>
        )}
      </div>
    </header>
  );
}

function Application() {
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
      <ApplicationHeader />
      <main>
        <h1>Locations</h1>
        {locations.map(({ _id, name }) => (
          <li key={_id}>
            <Link to={`/locations/${_id}`}>{name}</Link>
          </li>
        ))}
      </main>
    </>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
