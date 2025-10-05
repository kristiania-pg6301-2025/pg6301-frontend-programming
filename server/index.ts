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

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

app.get("/api/tasks", async (c) => {
  await delay(1500);
  return c.json(tasks);
});
