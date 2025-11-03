import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const locations = [
  { _id: "1", summary: "Server apartment", description: "Nice" },
  { _id: "2", summary: "Server cabin", description: "Beautiful" },
];
app.get("/api/locations", (c) => c.json(locations));
