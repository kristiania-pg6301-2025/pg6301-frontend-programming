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
    const newTask: Omit<TaskItem, "id"> = { title, completed: false };
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });
    setTitle("");
    await loadTasks();
  }

  async function handleCheckedUpdated(id: number, completed: boolean) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
    });
    await loadTasks();
  }

  return (
    <>
      <h1>Task Application</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type={"checkbox"}
              checked={t.completed}
              onChange={(e) => handleCheckedUpdated(t.id, e.target.checked)}
            />
            {t.title}
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
