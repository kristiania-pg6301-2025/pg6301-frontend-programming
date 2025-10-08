import React, { type FormEvent, useEffect, useState } from "react";
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

  const [posting, setPosting] = useState(false);
  const [description, setDescription] = useState("");

  async function loadTask() {
    setTasks([]);
    setLoading(true);
    setError(undefined);
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setPosting(true);
    setTasks([]);
    setError(undefined);
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        completed: false,
      }),
    });
    setPosting(false);
    setDescription("");
    loadTask();
  }

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
      <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            disabled={posting}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {posting && (
            <div
              style={{ display: "inline-block", width: "0.5em" }}
              className={"spinner"}
            ></div>
          )}
        </div>
        <div>
          <button disabled={posting}>Submit</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
