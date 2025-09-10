import { createRoot } from "react-dom/client";
import React from "react";
import { Application } from "./components/tasks/application";

createRoot(document.getElementById("app")).render(<Application />);
