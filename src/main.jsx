import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function TaskApplication() {
  const [tasks, setTasks] = useState([]);

  async function fetchTask() {
    const res = await fetch("/api/tasks");
    const tasks = await res.json();
    setTasks(tasks);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setTasks((old) => [...old, { description }]);
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
