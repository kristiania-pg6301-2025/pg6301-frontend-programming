import type { TaskItem } from "../../taskItem.js";
import React from "react";
import { Link, useParams } from "react-router-dom";

function TaskView({ task: { summary, completed } }: { task: TaskItem }) {
  return (
    <>
      <h1>Single task: {summary}</h1>
      <p>
        <Link to={"/"}>All tasks</Link>
      </p>
      {completed && <p>Completed</p>}
    </>
  );
}

export function TaskRoute({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Task {id} not found</h1>;
  return <TaskView task={task} />;
}
