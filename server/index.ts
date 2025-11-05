import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { RentalLocation } from "../shared/rentalLocation.js";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

const locations: RentalLocation[] = [
  { _id: "1", name: "Server apartment", summary: "Nice" },
  { _id: "2", name: "Server cabin", summary: "Beautiful" },
];
app.get("/api/locations", (c) => c.json(locations));
