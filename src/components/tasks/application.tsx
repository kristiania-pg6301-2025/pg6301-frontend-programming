import React, { useState } from "react";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import type { TaskItem } from "../../taskItem.js";

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { summary: "Create package.json file", completed: true },
    { summary: "List existing tasks", completed: false },
  ]);
  function handleNewTask(task: TaskItem) {
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
