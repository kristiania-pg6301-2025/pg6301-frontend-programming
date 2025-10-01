import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../shared/taskItem.js";

const taskList: TaskItem[] = [
  { description: "Create react app", completed: true },
  { description: "Create Hono application (server updated)", completed: true },
  { description: "Deploy to Heroku", completed: false },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(taskList);
});
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
