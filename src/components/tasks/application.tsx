import React, { useEffect, useState } from "react";
import type { TaskItem } from "../../taskItem.js";
import { FrontPage } from "./frontPage.js";
import { Route, Routes } from "react-router-dom";
import { TaskRoute } from "./taskRoute.js";

const initialTasks = [
  { id: 0, summary: "Create package.json file", completed: true },
  { id: 1, summary: "List existing tasks", completed: true },
  { id: 2, summary: "Introduce typescript", completed: true },
  { id: 3, summary: "Update state for checkboxes", completed: false },
];

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const existingTasks = localStorage.getItem("tasks");
    return existingTasks ? JSON.parse(existingTasks) : initialTasks;
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleTaskCompleted(task: TaskItem, completed: boolean) {
    setTasks((old) =>
      old.map((o) => (task.id === o.id ? { ...o, completed } : o)),
    );
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onCompleted={handleTaskCompleted}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route path={"/tasks/:id"} element={<TaskRoute tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
