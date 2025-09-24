import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../shared/taskItem.js";

const tasks: TaskItem[] = [
  { id: 0, title: "Create React Application (server)", completed: true },
  { id: 1, title: "Create Hono server (server)", completed: true },
  { id: 2, title: "Restart server automatically", completed: true },
  { id: 3, title: "Create APIs (server)", completed: true },
  { id: 4, title: "Introduce typescript", completed: true },
  { id: 5, title: "Update state", completed: false },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const task: Omit<TaskItem, "id"> = await c.req.json();
  tasks.push({ ...task, id: tasks.length });
  return c.newResponse(null, 201);
});
app.put("/api/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const delta: Partial<TaskItem> = await c.req.json();
  console.log({ delta });
  tasks[parseInt(id)] = {
    ...tasks[parseInt(id)]!,
    ...delta,
  };
  return c.newResponse(null, 200);
});
serve(app);
