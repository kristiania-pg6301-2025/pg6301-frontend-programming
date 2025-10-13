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
const taskDb = connection.db("task_application");

app.get("/api/tasks", async (c) => {
  return c.json(await taskDb.collection("tasks").find().toArray());
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  const task = { description, completed };
  await taskDb.collection("tasks").insertOne(task);
  return c.newResponse(null, 204);
});

const movieDb = connection.db("sample_mflix");
app.get("/api/movies", async (c) => {
  return c.json(await movieDb.collection("movies").find().limit(200).toArray());
});

app.get("*", serveStatic({ root: "../dist" }));
