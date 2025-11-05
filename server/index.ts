import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { RentalLocation } from "../shared/rentalLocation.js";
import { MongoClient } from "mongodb";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const client = new MongoClient(process.env.MONGODB_URL!);
const connection = await client.connect();
const collection = connection
  .db("sample_airbnb")
  .collection<RentalLocation>("listingsAndReviews");

app.get("/api/locations", async (c) =>
  c.json(
    await collection
      .find({ property_type: "House", "address.market": "Porto" })
      .limit(200)
      .toArray(),
  ),
);
