import React, { useEffect, useState } from "react";
import type { TaskDelta, TaskItem } from "../../taskItem.js";
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

  function handleUpdateTask(id: number, delta: TaskDelta) {
    setTasks((old) => old.map((o) => (id === o.id ? { ...o, ...delta } : o)));
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onCompleted={({ id }, completed) =>
              handleUpdateTask(id, { completed })
            }
            onNewTask={handleNewTask}
          />
        }
      />
      <Route
        path={"/tasks/:id"}
        element={<TaskRoute tasks={tasks} onUpdateTask={handleUpdateTask} />}
      />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
