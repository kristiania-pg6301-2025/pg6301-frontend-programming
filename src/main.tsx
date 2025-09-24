import React, { type FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "../shared/taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    const tasks = await res.json();
    setTasks(tasks);
  }

  useEffect(() => {
    loadTasks();
  }, []);
  const [title, setTitle] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, completed: true }),
    });
    setTitle("");
    await loadTasks();
  }

  return (
    <>
      <h1>Task Application</h1>
      <ul>
        {tasks.map((t) => (
          <li>
            {t.title} {t.completed.toString()}
          </li>
        ))}
      </ul>
      <h2>New task</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>
          <button>Add task</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
