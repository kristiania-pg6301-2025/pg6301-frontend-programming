import React from "react";
import type { TaskItem } from "../../taskItem.js";

export function TaskList({
  tasks,
  onItemChecked,
}: {
  tasks: TaskItem[];
  onItemChecked(id: number, checked: boolean): void;
}) {
  return (
    <ul>
      {tasks.map(({ id, complete, summary }) => (
        <li
          key={id}
          style={{ textDecoration: complete ? "line-through" : undefined }}
        >
          <label>
            <input
              type={"checkbox"}
              checked={complete}
              onChange={(e) => onItemChecked(id, e.target.checked)}
            />{" "}
            {summary}
          </label>
        </li>
      ))}
    </ul>
  );
}
