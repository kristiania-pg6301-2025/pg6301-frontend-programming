import React from "react";
import { createRoot } from "react-dom/client";

function Application() {
  return <h1>Task Application</h1>;
}

createRoot(document.getElementById("app")).render(<Application />);
