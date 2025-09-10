import React, { useState } from "react";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import type { TaskItem } from "../../taskItem.js";
import { Route, Routes, useParams } from "react-router-dom";

function FrontPage(props: {
  tasks: TaskItem[];
  onCompleted: (task: TaskItem, completed: boolean) => void;
  onNewTask: (task: Omit<TaskItem, "id">) => void;
}) {
  return (
    <>
      <h1>Task manager</h1>
      <h2>My tasks</h2>
      <TaskList tasks={props.tasks} onCompleted={props.onCompleted} />
      <h2>New task</h2>
      <NewTaskForm onNewTask={props.onNewTask} />
    </>
  );
}

function TaskView({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const task = tasks.find((t) => t.id === parseInt(id!));
  return (
    <h1>
      Task with id {id} shown: {task?.summary}
    </h1>
  );
}

export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, summary: "Create package.json file", completed: true },
    { id: 1, summary: "List existing tasks", completed: true },
    { id: 2, summary: "Introduce typescript", completed: true },
    { id: 3, summary: "Update state for checkboxes", completed: false },
  ]);
  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
  }

  function handleTaskCompleted(task: TaskItem, completed: boolean) {
    setTasks((old) =>
      old.map((o) => (task.id === o.id ? { ...o, completed } : o)),
    );
  }

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onCompleted={handleTaskCompleted}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route path={"/tasks/:id"} element={<TaskView tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}
