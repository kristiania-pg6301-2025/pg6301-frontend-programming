import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const tasks = [
  { description: "Fetch data from server", completed: true },
  { description: "Deal with slow server", completed: false },
  { description: "Deal with errors from server", completed: false },
];

async function delayWithError(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.2) {
        reject(new Error("Error from promise"));
      } else if (random < 0.3) {
        reject(new HTTPException(400, { message: "Error from user" }));
      } else {
        resolve();
      }
    }, timeout);
  });
}

app.get("/api/tasks", async (c) => {
  await delayWithError(300);
  return c.json(tasks);
});
