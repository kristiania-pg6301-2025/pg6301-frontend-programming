import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { TaskList } from "./components/tasks/taskList";
import { NewTaskForm } from "./components/tasks/newTaskForm";

function Application() {
  const [tasks, setTasks] = useState([
    { summary: "Create npm app" },
    { summary: "Create react app" },
  ]);

  function handleNewTask(task) {
    setTasks((old) => [...old, task]);
  }

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
