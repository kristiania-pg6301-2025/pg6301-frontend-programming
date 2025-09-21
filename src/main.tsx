import { createRoot } from "react-dom/client";
import React, { type FormEvent, useEffect, useState } from "react";
import type { TaskItem } from "../shared/taskItem.js";

async function fetchJson<T>(path: string) {
  const res = await fetch(path);
  return (await res.json()) as T;
}

async function postJson<T>(path: string, body: T, method: string = "POST") {
  await fetch(path, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState("");
  async function loadTasks() {
    setTasks(await fetchJson("/api/tasks"));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await postJson<Partial<TaskItem>>("/api/tasks", { description });
    setDescription("");
    await loadTasks();
  }

  async function handleTaskUpdated(id: number, delta: Partial<TaskItem>) {
    await postJson<Partial<TaskItem>>(`/api/tasks/${id}`, delta, "PUT");
    await loadTasks();
  }

  return (
    <>
      <h1>My Task Manager</h1>
      <ul>
        {tasks.map(({ description, id, completed }) => (
          <li key={id}>
            <input
              type={"checkbox"}
              checked={completed}
              onChange={(e) =>
                handleTaskUpdated(id, { completed: e.target.checked })
              }
            />
            {description}
          </li>
        ))}
      </ul>
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

createRoot(document.getElementById("app")!).render(<Application />);
