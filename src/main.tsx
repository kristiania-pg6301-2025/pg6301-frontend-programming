import { createRoot } from "react-dom/client";
import { MoviesApplication } from "./movies/moviesApplication.js";

createRoot(document.getElementById("app")!).render(<MoviesApplication />);
