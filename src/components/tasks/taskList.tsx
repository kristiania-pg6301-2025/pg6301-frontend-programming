import React from "react";
import type { TaskItem } from "../../taskItem.js";
import { Link } from "react-router-dom";

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
        <li key={t.id}>
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) => onCompleted(t, e.target.checked)}
          />{" "}
          <Link
            to={`/tasks/${t.id}`}
            style={{ textDecoration: t.completed ? "line-through" : undefined }}
          >
            {t.summary}
          </Link>
        </li>
      ))}
    </ul>
  );
}
