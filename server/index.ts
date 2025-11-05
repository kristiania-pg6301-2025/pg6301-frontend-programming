import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { RentalLocation } from "../shared/rentalLocation.js";
import { MongoClient } from "mongodb";
import { createOpenidRoute } from "./openidRoute.js";
import { getCookie } from "hono/cookie";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.route(
  "/api/login/linkedin",
  await createOpenidRoute({
    client_id: "77m8tju8g0vwaz",
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    discoveryDocument:
      "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  }),
);
app.get("/api/userinfo", async (c) => {
  const authorizationCookie = getCookie(c, "authorization");
  if (authorizationCookie) {
    const { access_token, userinfo_endpoint } = JSON.parse(authorizationCookie);
    const res = await fetch(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return c.json(await res.json());
  }
  return c.newResponse(null, 401);
});

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
      .sort({ name: 1 })
      .limit(200)
      .toArray(),
  ),
);
