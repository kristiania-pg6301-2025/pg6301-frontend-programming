import React from "react";
import type { TaskItem } from "../../taskItem.js";

export function TaskList({ tasks }: { tasks: TaskItem[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <label>
            <input type={"checkbox"} checked={t.completed} /> {t.summary}
          </label>
        </li>
      ))}
    </ul>
  );
}
