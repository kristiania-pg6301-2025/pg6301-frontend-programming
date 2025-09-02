import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function TaskApplication() {
  const [tasks, setTasks] = useState([
    { description: "Create initial project structure", completed: true },
    { description: "Create frontend application", completed: false },
    { description: "Create backend application", completed: false },
    { description: "Deploy to Heroku", completed: false },
  ]);

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
