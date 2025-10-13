import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { MongoClient } from "mongodb";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

console.log(process.env);

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";

const client = new MongoClient(MONGODB_URL);
const connection = await client.connect();
const db = connection.db("task_application");

app.get("/api/tasks", async (c) => {
  return c.json(await db.collection("tasks").find().toArray());
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  const task = { description, completed };
  await db.collection("tasks").insertOne(task);
  return c.newResponse(null, 204);
});

app.get("*", serveStatic({ root: "../dist" }));
