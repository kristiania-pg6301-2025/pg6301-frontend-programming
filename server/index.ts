import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const tasks = [
  { description: "Fetch data from server", completed: true },
  { description: "Deal with slow server", completed: false },
  { description: "Deal with errors from server", completed: false },
];

app.get("/api/tasks", (c) => c.json(tasks));
