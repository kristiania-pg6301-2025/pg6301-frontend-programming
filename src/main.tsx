import { createRoot } from "react-dom/client";
import { type FormEvent, useEffect, useState } from "react";
import type { TaskItem } from "../shared/taskItem.js";

function useTasks() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  async function saveTask(task: TaskItem) {
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    await loadTasks();
  }

  return { tasks, loadTasks, saveTask };
}

function NewTaskForm({
  onNewTask,
}: {
  onNewTask: (task: TaskItem) => Promise<void>;
}) {
  const [description, setDescription] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onNewTask({ description, completed: false });
    setDescription("");
  }

  return (
    <>
      <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}

function Application() {
  const { tasks, loadTasks, saveTask } = useTasks();
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>My tasks</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type="checkbox" checked={completed} />
          {description}
        </li>
      ))}
      <NewTaskForm onNewTask={saveTask} />
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
