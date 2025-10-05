import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

import "./application.css";

function Application() {
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    loadTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
      throw new Error(`Request error: ${res.status}: ${await res.text()}`);
    }
    return await res.json();
  }

  async function loadTasks() {
    setLoaded(false);
    setError(undefined);
    try {
      setTasks(await fetchTasks());
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <button onClick={loadTasks}>Reload</button>
      </div>
      {error && <div className={"error"}>{error.toString()}</div>}
      {!loaded && <div className={"spinner"}></div>}
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
