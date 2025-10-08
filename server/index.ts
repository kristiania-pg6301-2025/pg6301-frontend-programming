import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../shared/taskItem.js";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

const tasks: TaskItem[] = [
  { description: "Deploy to heroku", completed: true },
  { description: "Fetch data from server", completed: true },
  { description: "Deal with slow requests", completed: true },
  { description: "Deal with errors", completed: false },
];

async function delay(millis: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), millis);
  });
}

app.get("/api/tasks", async (c) => {
  await delay(500);
  if (Math.random() < 0.6) {
    throw new HTTPException(400, { message: "You did something wrong" });
  }
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  await delay(1000);
  const { description, completed } = await c.req.json();
  tasks.push({ description, completed });
  return c.newResponse(null, 204);
});

app.get("*", serveStatic({ root: "../dist" }));
