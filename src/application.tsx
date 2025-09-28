import React, { useEffect, useState } from "react";
import type { TaskItem } from "../shared/taskItem.js";

const initialTasks: TaskItem[] = [
  { description: "Create client", complete: true },
  { description: "Create server", complete: false },
  { description: "Deploy server", complete: false },
];

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  useEffect(() => {
    setTasks(initialTasks);
  }, []);
  return (
    <>
      <h1>Task application</h1>
      {tasks.map(({ description, complete }) => (
        <li>
          <input type="checkbox" checked={complete} /> {description}
        </li>
      ))}
    </>
  );
}
