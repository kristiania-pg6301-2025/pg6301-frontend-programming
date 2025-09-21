import { createRoot } from "react-dom/client";
import React, { type FormEvent, useEffect, useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  async function loadTasks() {
    const res = await fetch("/api/tasks");
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
      body: JSON.stringify({ description }),
    });
    setDescription("");
    await loadTasks();
  }

  async function handleTaskUpdated(id: number, delta: unknown) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delta),
    });
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
