import type { TaskItem } from "../../taskItem.js";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dialog } from "../dialog/dialog.js";

function TaskView({ task: { summary, completed } }: { task: TaskItem }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <h1>Single task: {summary}</h1>
      <p>
        <Link to={"/"}>All tasks</Link>
      </p>
      {completed && <p>Completed</p>}
      <button onClick={() => setIsDialogOpen(true)}>Update description</button>
      <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}>
        <form>
          <h2>Task description</h2>
          <textarea></textarea>
          <p>
            <button>Update</button>
          </p>
          <p>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </p>
        </form>
      </Dialog>
    </>
  );
}

export function TaskRoute({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Task {id} not found</h1>;
  return <TaskView task={task} />;
}
