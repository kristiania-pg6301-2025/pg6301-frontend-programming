import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

import "./application.css";

function Application() {
  async function loadTasks() {
    setLoaded(false);
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
    setLoaded(true);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <h1>Tasks</h1>
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
