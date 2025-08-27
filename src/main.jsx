import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <>
      <h1>My tasks</h1>
      <form>
        <div>
          Title:{" "}
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <button>Save task: {newTaskTitle}</button>
        </div>
      </form>
      <h2>Existing tasks</h2>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
