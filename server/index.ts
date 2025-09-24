import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../shared/taskItem.js";

const tasks: TaskItem[] = [
  { title: "Create React Application (server)", completed: true },
  { title: "Create Hono server (server)", completed: true },
  { title: "Restart server automatically", completed: true },
  { title: "Create APIs (server)", completed: true },
  { title: "Introduce typescript", completed: true },
  { title: "Update state", completed: false },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push(task);
  return c.newResponse(null, 201);
});
serve(app);
