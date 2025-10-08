import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "../shared/taskItem.js";

import "./application.css";

function Application() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTask() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1>My tasks</h1>
      {loading && <div className={"spinner"}></div>}
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
