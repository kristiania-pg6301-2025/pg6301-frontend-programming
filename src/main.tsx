import { createRoot } from "react-dom/client";
import { Application } from "./application.js";
import React from "react";

createRoot(document.getElementById("app")!).render(<Application />);
