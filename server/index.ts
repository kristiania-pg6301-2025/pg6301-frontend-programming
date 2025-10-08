import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../shared/taskItem.js";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

const tasks: TaskItem[] = [
  { description: "Deploy to heroku", completed: true },
  { description: "Fetch data from server", completed: true },
  { description: "Deal with slow requests", completed: false },
  { description: "Deal with errors", completed: false },
];

app.get("/api/tasks", (c) => c.json(tasks));

app.get("*", serveStatic({ root: "../dist" }));
