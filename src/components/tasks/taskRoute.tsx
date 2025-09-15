import type { TaskItem } from "../../taskItem.js";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

function TaskView({ task: { summary, completed } }: { task: TaskItem }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    dialogRef.current?.addEventListener("close", () => setIsDialogOpen(false));
  }, []);
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  return (
    <>
      <h1>Single task: {summary}</h1>
      <p>
        <Link to={"/"}>All tasks</Link>
      </p>
      {completed && <p>Completed</p>}
      <button onClick={() => setIsDialogOpen(true)}>Update description</button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsDialogOpen(false);
        }}
      >
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
      </dialog>
    </>
  );
}

export function TaskRoute({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Task {id} not found</h1>;
  return <TaskView task={task} />;
}
