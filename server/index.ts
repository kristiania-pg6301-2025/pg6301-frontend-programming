import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import type { TaskItem } from "../shared/taskItem.js";

const initialTasks: TaskItem[] = [
  { description: "Create client", complete: true },
  { description: "Create server", complete: true },
  { description: "Deploy server", complete: true },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(initialTasks);
});
app.use("*", serveStatic({ root: "../dist" }));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
