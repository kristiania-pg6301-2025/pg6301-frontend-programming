import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [tasks, setTasks] = useState([
    { title: "Create React Application", completed: true },
    { title: "Create Hono server", completed: false },
    { title: "Create APIs", completed: false },
  ]);
  return (
    <>
      <h1>Task Application</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.title}</li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
