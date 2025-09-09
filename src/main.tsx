import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { TaskList } from "./components/tasks/taskList.js";
import { NewTaskForm } from "./components/tasks/newTaskForm.js";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, summary: "Create npm app", complete: true },
    { id: 1, summary: "Create react app", complete: true },
    { id: 2, summary: "Insert new tasks", complete: true },
    { id: 3, summary: "Update task status", complete: false },
  ]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleItemChecked(id: number, complete: boolean) {
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, complete } : o)));
  }

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} onItemChecked={handleItemChecked} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
