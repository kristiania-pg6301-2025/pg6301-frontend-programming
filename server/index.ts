import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("/api/tasks", (c) =>
  c.json([
    { description: "Deploy to heroku", complete: true },
    { description: "Fetch data from server", complete: true },
    { description: "Deal with slow requests", complete: false },
    { description: "Deal with errors", complete: false },
  ]),
);

app.get("*", serveStatic({ root: "../dist" }));
