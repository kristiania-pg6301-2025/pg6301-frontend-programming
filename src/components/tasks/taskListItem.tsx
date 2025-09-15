import type { TaskItem } from "../../taskItem.js";
import React from "react";

export function TaskListItem({
  task,
  onCompleted,
}: {
  task: TaskItem;
  onCompleted: (task: TaskItem, completed: boolean) => void;
}) {
  return (
    <li>
      <label
        style={{ textDecoration: task.completed ? "line-through" : undefined }}
      >
        <input
          type={"checkbox"}
          checked={task.completed}
          onChange={(e) => onCompleted(task, e.target.checked)}
        />{" "}
        {task.summary}
      </label>
    </li>
  );
}
