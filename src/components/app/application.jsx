import React from "react";

function NewTaskForm() {
  return (
    <form>
      <div>
        <strong>Task description: </strong>
        <input type="text" />
      </div>
      <div>
        <button>Submit</button>
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
