import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import type { TaskItem } from "./taskItem.js";
import { FrontPage } from "./components/tasks/frontPage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskDetails } from "./components/tasks/taskDetails.js";

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
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onItemChecked={handleItemChecked}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route path={"/tasks/:id"} element={<TaskDetails tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
