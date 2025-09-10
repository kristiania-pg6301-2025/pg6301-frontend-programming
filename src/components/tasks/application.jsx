import React, { useState } from "react";
import { TaskList } from "./taskList";
import { NewTaskForm } from "./newTaskForm";

export function Application() {
  const [tasks, setTasks] = useState([
    { summary: "Create package.json file", completed: true },
    { summary: "List existing tasks", completed: false },
  ]);
  function handleNewTask(task) {
    setTasks((old) => [...old, task]);
  }
  return (
    <>
      <h1>Task manager</h1>
      <h2>My tasks</h2>
      <TaskList tasks={tasks} />
      <h2>New task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}
