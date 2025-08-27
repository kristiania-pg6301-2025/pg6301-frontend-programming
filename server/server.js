import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
app.get("/api/tasks", async (c) => {
  return c.json([
    { title: "Client side", completed: true },
    { title: "Fetch from server", completed: true },
    { title: "Post to server" },
    { title: "Deployment" },
  ]);
});
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  console.log(task);
  return c.status(201);
});
serve(app);
