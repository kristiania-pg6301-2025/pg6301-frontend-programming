import type { TaskItem } from "../../taskItem.js";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import React from "react";

export function FrontPage(props: {
  tasks: TaskItem[];
  onItemChecked: (id: number, complete: boolean) => void;
  onNewTask: (task: Omit<TaskItem, "id">) => void;
}) {
  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={props.tasks} onItemChecked={props.onItemChecked} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={props.onNewTask} />
    </>
  );
}
