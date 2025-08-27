import React, { type FormEvent, useState } from "react";

interface Task {
  title: string;
  color?: string;
}

function NewTaskForm({ onNewTask }: { onNewTask: (task: Task) => void }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNewTask({ title, color });
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Task description: </strong>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <strong>Color: </strong>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <button disabled={!title}>Submit</button>
      </div>
    </form>
  );
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li style={{ backgroundColor: t.color }}>
          <label>
            <input type={"checkbox"} />
            {t.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

export function Application() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleNewTask(newTask: Task) {
    setTasks((old) => [...old, newTask]);
  }
  return (
    <>
      <h1>Tasks</h1>
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
      <h2>Existing tasks</h2>
      <TaskList tasks={tasks} />
    </>
  );
}
