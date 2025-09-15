import React from "react";
import type { TaskItem } from "../../taskItem.js";
import { TaskListItem } from "./taskListItem.js";

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
        <TaskListItem key={t.id} task={t} onCompleted={onCompleted} />
      ))}
    </ul>
  );
}
