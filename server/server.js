import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/api/tasks", (c) => {
  return c.json([
    { description: "Create initial project structure", completed: true },
    { description: "Create frontend application", completed: true },
    { description: "Create hono server", completed: true },
    { description: "Create backend application", completed: false },
    { description: "Deploy to Heroku", completed: false },
  ]);
});

serve(app);
