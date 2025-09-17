import React from "react";
import type { TaskChangeHandler, TaskItem } from "../../taskItem.js";
import { Link } from "react-router-dom";

export function TaskList({
  tasks,
  onTaskChanged,
}: {
  tasks: TaskItem[];
  onTaskChanged: TaskChangeHandler;
}) {
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) =>
              onTaskChanged(t.id, { completed: e.target.checked })
            }
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
