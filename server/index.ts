import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { HTTPException } from "hono/http-exception";
import type { TaskItem } from "../shared/taskItem.js";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const tasks: TaskItem[] = [
  { description: "Fetch data from server", completed: true },
  { description: "Deal with slow server", completed: true },
  { description: "Deal with errors from server", completed: true },
];

function randomError() {
  const random = Math.random();
  if (random < 0.2) {
    throw new Error("Error from promise");
  } else if (random < 0.5) {
    throw new HTTPException(400, { message: "Error from user" });
  }
}

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

app.get("/api/tasks", async (c) => {
  await delay(100);
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  await delay(2000).then(randomError);
  const task: TaskItem = await c.req.json();
  tasks.push(task);
  return c.newResponse(null, 204);
});
