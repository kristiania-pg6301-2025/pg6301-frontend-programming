import { createRoot } from "react-dom/client";
import { type FormEvent, useEffect, useState } from "react";

import "./application.css";
import type { TaskItem } from "../shared/taskItem.js";

function NewTaskForm({ onReload }: { onReload: () => Promise<void> }) {
  const [description, setDescription] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newTask: TaskItem = { description, completed: false };
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    setDescription("");
    onReload();
  }

  return (
    <>
      <h2>New task</h2>
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

function Application() {
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    loadTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
      throw new Error(`Request error: ${res.status}: ${await res.text()}`);
    }
    return await res.json();
  }

  async function loadTasks() {
    setLoaded(false);
    setError(undefined);
    try {
      setTasks(await fetchTasks());
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <button onClick={loadTasks}>Reload</button>
      </div>
      {error && <div className={"error"}>{error.toString()}</div>}
      {!loaded && <div className={"spinner"}></div>}
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
      <NewTaskForm onReload={loadTasks} />
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
