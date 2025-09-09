import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { TaskList } from "./components/tasks/taskList.js";
import { NewTaskForm } from "./components/tasks/newTaskForm.js";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { summary: "Create npm app" },
    { summary: "Create react app" },
  ]);

  function handleNewTask(task: TaskItem) {
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

createRoot(document.getElementById("app")!).render(<Application />);
