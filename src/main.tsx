import { createRoot } from "react-dom/client";
import React from "react";
import { Application } from "./components/tasks/application.js";
import { BrowserRouter, HashRouter } from "react-router-dom";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
