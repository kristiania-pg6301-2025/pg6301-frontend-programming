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
serve(app);
