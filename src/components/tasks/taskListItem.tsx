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
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : undefined }}>
      <input
        type={"checkbox"}
        checked={task.completed}
        onChange={(e) => onCompleted(task, e.target.checked)}
      />{" "}
      <Link to={`/tasks/${task.id}`}>{task.summary}</Link>
    </li>
  );
}
