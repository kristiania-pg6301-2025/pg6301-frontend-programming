import type { TaskItem } from "../../taskItem.js";
import React from "react";
import { useParams } from "react-router-dom";

export function TaskRoute({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id!));
  return <h1>Single task: {task?.summary}</h1>;
}
