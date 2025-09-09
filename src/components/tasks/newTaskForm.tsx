import React, { type FormEvent, useState } from "react";
import type { TaskItem } from "../../taskItem.js";

export function NewTaskForm({
  onNewTask,
}: {
  onNewTask(task: Omit<TaskItem, "id">): void;
}) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNewTask({ summary, complete: false, description: "" });
  }

  const [summary, setSummary] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Description: </strong>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
      <div>
        <button>Create</button>
      </div>
    </form>
  );
}
