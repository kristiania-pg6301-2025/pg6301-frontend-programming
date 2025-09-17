import type { TaskItem } from "../../taskItem.js";
import { Link, useParams } from "react-router-dom";
import React from "react";

function TaskView({ task: { summary } }: { task: TaskItem }) {
  return (
    <>
      <h1>Task {summary}</h1>
      <p>
        <Link to={"/"}>View all task</Link>
      </p>
    </>
  );
}

export function SingleTaskRoute({ tasks }: { tasks: TaskItem[] }) {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id === parseInt(taskId!));
  if (!task) return <h1>Task not found</h1>;
  return <TaskView task={task} />;
}
