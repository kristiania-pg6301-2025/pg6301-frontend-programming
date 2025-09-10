import { createRoot } from "react-dom/client";
import React, { useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([
    { summary: "Create package.json file", completed: true },
    { summary: "List existing tasks", completed: false },
  ]);
  return (
    <>
      <h1>Task manager</h1>
      <h2>My tasks</h2>
      {tasks.map((t) => (
        <li>
          <label>
            <input type={"checkbox"} checked={t.completed} /> {t.summary}
          </label>
        </li>
      ))}
      <h2>New task</h2>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
