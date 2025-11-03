import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { Application } from "./components/app/application.js";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
