import React, { type FormEvent, useState } from "react";
import type { TaskItem } from "../../taskItem.js";

export function NewTaskForm({
  onNewTask,
}: {
  onNewTask: (task: TaskItem) => void;
}) {
  const [summary, setSummary] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNewTask({ summary, completed: false });
  }

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
        <button>Submit</button>
      </div>
    </form>
  );
}
