import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [tasks, setTasks] = useState([
    { title: "Create React Application", completed: true },
    { title: "Create Hono server", completed: false },
    { title: "Create APIs", completed: false },
  ]);
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setTasks((old) => [{ title, completed: false }, ...old]);
    setTitle("");
  }

  return (
    <>
      <h1>Task Application</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.title}</li>
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

createRoot(document.getElementById("app")).render(<Application />);
