import type { TaskChangeHandler, TaskItem } from "../../taskItem.js";
import { Link, useParams } from "react-router-dom";
import React, { type FormEvent, useRef, useState } from "react";

function TaskView({
  task: { id, summary, description },
  onTaskChanged,
}: {
  task: TaskItem;
  onTaskChanged: TaskChangeHandler;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [editedDescription, setEditedDescription] = useState(description || "");
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onTaskChanged(id, { description: editedDescription });
  }
  return (
    <>
      <h1>Task {summary}</h1>
      <p>
        <Link to={"/"}>View all task</Link>
      </p>
      {description && (
        <>
          <h2>Description</h2>
          <p>{description}</p>
        </>
      )}
      <p>
        <button onClick={() => dialogRef.current?.showModal()}>
          Edit description
        </button>
      </p>
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <h1>Here is the task description</h1>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <p>
            <button onClick={() => dialogRef.current?.close()}>Submit</button>
          </p>
        </form>
      </dialog>
    </>
  );
}

export function SingleTaskRoute({
  tasks,
  onTaskChanged,
}: {
  tasks: TaskItem[];
  onTaskChanged: TaskChangeHandler;
}) {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id === parseInt(taskId!));
  if (!task) return <h1>Task not found</h1>;
  return <TaskView task={task} onTaskChanged={onTaskChanged} />;
}
