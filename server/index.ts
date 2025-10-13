import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../shared/taskItem.js";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

const tasks: TaskItem[] = [
  { description: "Fetch tasks from server", completed: true },
  { description: "Send tasks to server", completed: true },
  { description: "Save tasks in database", completed: false },
];

app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  tasks.push({ description, completed });
  return c.newResponse(null, 204);
});

app.get("*", serveStatic({ root: "../dist" }));
