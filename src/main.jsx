import { createRoot } from "react-dom/client";
import React, { useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "Create project", completed: true },
    { description: "Create React webapp", completed: false },
    { description: "Create Hono backend", completed: false },
  ]);
  return (
    <>
      <h1>My Task Manager</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.description}</li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
