import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const tasks = [
  { id: 0, description: "Create project (server)", completed: true },
  { id: 1, description: "Create React webapp (server)", completed: true },
  { id: 2, description: "Create Hono backend", completed: true },
  { id: 3, description: "Update with Hono backend", completed: false },
];
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const { description } = await c.req.json();
  tasks.push({ id: tasks.length, description, completed: false });
  return c.newResponse(null, 201);
});
app.put("/api/tasks/:taskId", async (c) => {
  const { taskId } = c.req.param();
  const { completed } = await c.req.json();
  tasks
    .filter((t) => t.id === parseInt(taskId))
    .forEach((t) => (t.completed = completed));
  return c.newResponse(null, 200);
});

serve(app);
