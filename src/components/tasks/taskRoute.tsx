import type { TaskItem } from "../../taskItem.js";
import React from "react";

export function TaskRoute({ tasks }: { tasks: TaskItem[] }) {
  return <h1>Single task</h1>;
}
