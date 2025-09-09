import { useNavigate, useParams } from "react-router-dom";
import type { TaskItem } from "../../taskItem.js";
import { type FormEvent, useState } from "react";

function TaskDetailsView({
  task,
  onChange,
}: {
  task: TaskItem;
  onChange(id: number, task: Partial<TaskItem>): void;
}) {
  const navigate = useNavigate();
  const { complete, summary } = task;
  const [description, setDescription] = useState(task.description);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onChange(task.id, { description });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Showing {summary} {complete && "✅"}
      </h1>
      <h3>Description</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div>
        <button>Update</button>
      </div>
    </form>
  );
}

export function TaskDetails({
  tasks,
  onChange,
}: {
  tasks: TaskItem[];
  onChange(id: number, task: Partial<TaskItem>): void;
}) {
  const { id } = useParams();
  const idAsInt = parseInt(id || "0");
  const task = tasks.find((t) => t.id == idAsInt);
  if (!task) return <h1>Task {id} not found</h1>;
  return <TaskDetailsView task={task} onChange={onChange} />;
}
