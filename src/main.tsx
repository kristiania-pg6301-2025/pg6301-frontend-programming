import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "../shared/taskItem.js";

import "./application.css";

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Something went wrong with the http request");
  }
}

function Application() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTask() {
    try {
      setTasks(await fetchTasks());
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1>My tasks</h1>
      {loading && <div className={"spinner"}></div>}
      {error && (
        <div>
          <h2>An error occurred</h2>
          <div className={"error"}>{error.toString()}</div>
        </div>
      )}
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
