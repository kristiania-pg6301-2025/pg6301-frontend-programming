import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([]);
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <h1>My Task Manager</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.description}</li>
        ))}
      </ul>
      <h2>New task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
