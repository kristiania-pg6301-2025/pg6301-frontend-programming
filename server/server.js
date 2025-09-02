import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

const tasks = [
  { description: "Create initial project structure", completed: true },
  { description: "Create frontend application", completed: true },
  { description: "Create hono server", completed: true },
  { description: "Create backend application", completed: true },
  { description: "Deploy to Heroku", completed: false },
];
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/task", async (c) => {
  const task = await c.req.json();
  tasks.push(task);
  return c.newResponse(200);
});

serve(app);
