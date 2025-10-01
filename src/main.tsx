import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

interface TaskItem {
  description: string;
  completed: boolean;
}

const taskList: TaskItem[] = [
  { description: "Create react app", completed: true },
  { description: "Create Hono application", completed: false },
  { description: "Deploy to Heroku", completed: false },
];

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  useEffect(() => {
    setTasks(taskList);
  }, []);
  return (
    <>
      <h1>My Non-deployed Task List</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type="checkbox" checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
