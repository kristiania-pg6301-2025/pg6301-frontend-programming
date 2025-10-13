import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("/api/tasks", (c) =>
  c.json([
    { description: "Fetch tasks from server", completed: true },
    { description: "Send tasks to server", completed: false },
    { description: "Save tasks in database", completed: false },
  ]),
);

app.get("*", serveStatic({ root: "../dist" }));
