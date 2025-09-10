import React, { useState } from "react";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import type { TaskItem } from "../../taskItem.js";

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, summary: "Create package.json file", completed: true },
    { id: 1, summary: "List existing tasks", completed: true },
    { id: 2, summary: "Introduce typescript", completed: true },
    { id: 3, summary: "Update state for checkboxes", completed: false },
  ]);
  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleTaskCompleted(task: TaskItem, completed: boolean) {
    setTasks((old) =>
      old.map((o) => (task.id === o.id ? { ...o, completed } : o)),
    );
  }

  return (
    <>
      <h1>Task manager</h1>
      <h2>My tasks</h2>
      <TaskList tasks={tasks} onCompleted={handleTaskCompleted} />
      <h2>New task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}
