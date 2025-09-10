import React from "react";
import type { TaskItem } from "../../taskItem.js";

export function TaskList({
  tasks,
  onCompleted,
}: {
  tasks: TaskItem[];
  onCompleted: (task: TaskItem, completed: boolean) => void;
}) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <label
            style={{ textDecoration: t.completed ? "line-through" : undefined }}
          >
            <input
              type={"checkbox"}
              checked={t.completed}
              onChange={(e) => onCompleted(t, e.target.checked)}
            />{" "}
            {t.summary}
          </label>
        </li>
      ))}
    </ul>
  );
}
