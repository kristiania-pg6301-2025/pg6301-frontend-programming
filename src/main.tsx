import { createRoot } from "react-dom/client";

function Application() {
  return (
    <>
      <h1>My Non-deployed Task List</h1>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
