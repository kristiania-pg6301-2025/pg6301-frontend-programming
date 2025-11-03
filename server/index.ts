import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { MongoClient } from "mongodb";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const client = new MongoClient(process.env.MONGODB_URL!);
const connection = await client.connect();
const listingsCollection = connection
  .db("sample_airbnb")
  .collection("listingsAndReviews");

app.get("/api/locations", async (c) =>
  c.json(await listingsCollection.find().limit(100).toArray()),
);
