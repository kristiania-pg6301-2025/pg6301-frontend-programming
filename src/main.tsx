import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import type { TaskItem } from "../shared/taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <>
      <h1>My Non-deployed Task List</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type="checkbox" checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
