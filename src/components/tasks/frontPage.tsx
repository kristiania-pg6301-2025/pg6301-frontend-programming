import type { TaskChangeHandler, TaskItem } from "../../taskItem.js";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import React from "react";

export function FrontPage(props: {
  tasks: TaskItem[];
  onTaskChanged: TaskChangeHandler;
  onNewTask: (task: Omit<TaskItem, "id">) => void;
}) {
  return (
    <>
      <h1>Task manager</h1>
      <h2>My tasks</h2>
      <TaskList tasks={props.tasks} onTaskChanged={props.onTaskChanged} />
      <h2>New task</h2>
      <NewTaskForm onNewTask={props.onNewTask} />
    </>
  );
}
