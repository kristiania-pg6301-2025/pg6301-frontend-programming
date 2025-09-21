import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const tasks = [
  { description: "Create project (server)", completed: true },
  { description: "Create React webapp (server)", completed: true },
  { description: "Create Hono backend", completed: true },
  { description: "Update with Hono backend", completed: false },
];
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push(task);
  return c.newResponse(null, 201);
});

serve(app);
