import React, { useState } from "react";

function NewTaskForm() {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = { title };
    alert("Creating task: " + JSON.stringify(newTask));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Task description: </strong>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <button>Submit {title}</button>
      </div>
    </form>
  );
}

function TaskList() {
  return (
    <ul>
      <li>
        <label>
          <input type={"checkbox"} />
          Task one
        </label>
      </li>
    </ul>
  );
}

export function Application() {
  return (
    <>
      <h1>Tasks</h1>
      <h2>Create new task</h2>
      <NewTaskForm />
      <h2>Existing tasks</h2>
      <TaskList />
    </>
  );
}
