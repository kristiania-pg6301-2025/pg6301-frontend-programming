import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function TaskApplication() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    const tasks = await res.json();
    setTasks(tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    //setTasks((old) => [...old, { description }]);
    await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ description }),
    });
    await fetchTasks();
  }

  return (
    <>
      <h1>My todo list</h1>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type={"checkbox"} checked={t.completed} /> {t.description}
          </li>
        ))}
      </ul>
      <h2>New task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <strong>Task description: </strong>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Submit {description}</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")).render(<TaskApplication />);
