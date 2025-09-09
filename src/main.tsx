import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import type { TaskItem } from "./taskItem.js";
import { FrontPage } from "./components/tasks/frontPage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskDetails } from "./components/tasks/taskDetails.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, summary: "Create npm app", description: "First", complete: true },
    {
      id: 1,
      summary: "Create react app",
      description: "Scond",
      complete: true,
    },
    {
      id: 2,
      summary: "Insert new tasks",
      description: "Thired",
      complete: true,
    },
    {
      id: 3,
      summary: "Update task status",
      description: "Fourth",
      complete: false,
    },
  ]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleChange(id: number, task: Partial<TaskItem>) {
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...task } : o)));
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onItemChecked={(id, complete) => handleChange(id, { complete })}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route
        path={"/tasks/:id"}
        element={<TaskDetails tasks={tasks} onChange={handleChange} />}
      />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
