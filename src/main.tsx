import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "Fetch data from server", completed: false },
  ]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
