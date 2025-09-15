import type { TaskItem } from "../../taskItem.js";
import React from "react";
import { Link } from "react-router-dom";

export function TaskListItem({
  task,
  onCompleted,
}: {
  task: TaskItem;
  onCompleted: (task: TaskItem, completed: boolean) => void;
}) {
  const { id, summary, completed } = task;
  return (
    <li style={{ textDecoration: completed ? "line-through" : undefined }}>
      <input
        type={"checkbox"}
        checked={completed}
        onChange={(e) => onCompleted(task, e.target.checked)}
      />{" "}
      <Link to={`/tasks/${id}`}>{summary}</Link>
    </li>
  );
}
