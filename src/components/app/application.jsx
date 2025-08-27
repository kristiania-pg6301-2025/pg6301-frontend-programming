import React, { useState } from "react";

function NewTaskForm({ onNewTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onNewTask({ title });
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
  function handleNewTask(newTask) {
    alert("Creating task: " + JSON.stringify(newTask));
  }
  return (
    <>
      <h1>Tasks</h1>
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
      <h2>Existing tasks</h2>
      <TaskList />
    </>
  );
}
