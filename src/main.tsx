import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ListLocations } from "./components/locations/listLocations.js";

import "./application.css";
import { ApplicationHeader } from "./components/app/applicationHeader.js";

function Application() {
  return (
    <>
      <ApplicationHeader />
      <main>
        <ListLocations />
      </main>
    </>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
