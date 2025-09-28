import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../shared/taskItem.js";

const initialTasks: TaskItem[] = [
  { description: "Create client", complete: true },
  { description: "Create server", complete: true },
  { description: "Deploy server", complete: false },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(initialTasks);
});
serve(app);
