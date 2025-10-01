import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../shared/taskItem.js";

const taskList: TaskItem[] = [
  { description: "Create react app", completed: true },
  { description: "Create Hono application (server updated)", completed: true },
  { description: "Deploy to Heroku", completed: true },
];

const app = new Hono();
app.get("/api/tasks", (c) => {
  return c.json(taskList);
});

async function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  await sleep(2000);
  taskList.push({ description, completed });
  return c.newResponse(null, 204);
});
app.get("*", serveStatic({ root: "../dist" }));
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
