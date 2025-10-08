import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "../shared/taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "Deploy to Heroku", completed: true },
    { description: "Fetch tasks from server", completed: false },
  ]);

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
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
