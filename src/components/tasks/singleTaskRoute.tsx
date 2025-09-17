import type { TaskChangeHandler, TaskItem } from "../../taskItem.js";
import { Link, useParams } from "react-router-dom";
import React, { type FormEvent, useState } from "react";
import { Dialog } from "../dialog/dialog.js";

function TaskView({
  task: { id, summary, description },
  onTaskChanged,
}: {
  task: TaskItem;
  onTaskChanged: TaskChangeHandler;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editedDescription, setEditedDescription] = useState(description || "");
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onTaskChanged(id, { description: editedDescription });
    setIsDialogOpen(false);
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
        <button onClick={() => setIsDialogOpen(true)}>Edit description</button>
      </p>
      <Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <form onSubmit={handleSubmit}>
          <h1>Here is the task description</h1>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <p>
            <button>Submit</button>
          </p>
          <p>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </p>
        </form>
      </Dialog>
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
