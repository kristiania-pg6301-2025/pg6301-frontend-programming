import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
const tasks = [
  { title: "Client side", completed: true },
  { title: "Fetch from server", completed: true },
  { title: "Post to server", completed: true },
  { title: "Deployment" },
];
app.get("/api/tasks", async (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push(task);
  return c.newResponse(null, 201);
});

app.use("*", serveStatic({ root: "../dist" }));
serve(app);
