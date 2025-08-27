import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  async function onLoad() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    onLoad();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setTasks((old) => [...old, { title: newTaskTitle }]);
  }

  return (
    <>
      <h1>My task application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title:{" "}
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <button>Save task: {newTaskTitle}</button>
        </div>
      </form>
      <h2>Existing tasks</h2>

      <ul>
        {tasks.map((t) => (
          <li>
            <input type={"checkbox"} checked={t.completed} />
            {t.title}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
