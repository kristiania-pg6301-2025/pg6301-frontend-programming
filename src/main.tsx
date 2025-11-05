import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ListLocations } from "./components/locations/listLocations.js";

import "./application.css";

function Application() {
  return (
    <>
      <header>
        <div>
          <Link to={"/"}>Logo</Link>
        </div>
        <div>Main page</div>
        <div className={"spacer"} />
        <a href={"/api/login/linkedin"}>Log on</a>
        <div>Help</div>
      </header>
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
