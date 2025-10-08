import React from "react";
import { createRoot } from "react-dom/client";

function Application() {
  return <h1>Hello World</h1>;
}

createRoot(document.getElementById("app")!).render(<Application />);
