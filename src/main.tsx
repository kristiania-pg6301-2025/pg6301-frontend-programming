import { createRoot } from "react-dom/client";
import { type FormEvent, useEffect, useState } from "react";
import type { TaskItem } from "../shared/taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState("");
  async function loadTasks() {
    const res = await fetch("/api/tasks", {
      method: "GET",
    });
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        completed: false,
      }),
    });
    setDescription("");
    loadTasks();
  }

  return (
    <>
      <h1>My Non-deployed Task List</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type="checkbox" checked={completed} /> {description}
        </li>
      ))}
      <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
