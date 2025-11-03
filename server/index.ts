import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { MongoClient } from "mongodb";
import { getCookie } from "hono/cookie";
import { createOpenidConnectProvider } from "./createOpenidConnectProvider.js";
import type { RentalLocation } from "../shared/rentalLocation.js";
import { createRentalLocationsApp } from "./rentalLocationsApp.js";

interface User {
  name: string;
}

declare module "hono" {
  interface ContextVariableMap {
    user: User;
  }
}

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));

app.use(async (c, next) => {
  const forwardedProto = c.req.header("x-forwarded-proto");
  if (forwardedProto === "https") {
    Object.defineProperty(c.req, "url", {
      value: c.req.url.toString().replace("http:", "https:"),
      configurable: true,
    });
  }
  await next();
});

app.use("*", async (c, next) => {
  const userinfo_endpoint = getCookie(c, "userinfo_endpoint");
  const access_token = getCookie(c, "access_token");
  if (userinfo_endpoint && access_token) {
    const res = await fetch(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (res.ok) c.set("user", await res.json());
  }
  return next();
});

app.get("/api/userinfo", async (c) => {
  const user = c.get("user");
  if (!user) return c.status(401);
  return c.json(user);
});

app.route(
  "/api/login/linkedin",
  await createOpenidConnectProvider({
    client_id: "7792wb3of776if",
    client_secret: process.env.LINKED_CLIENT_SECRET!,
    discovery_doc:
      "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  }),
);

const client = new MongoClient(process.env.MONGODB_URL!, { timeoutMS: 5_000 });
const connection = await client.connect();
console.log("Connected to " + client);

app.route(
  "/api/locations",
  createRentalLocationsApp(
    connection
      .db("sample_airbnb")
      .collection<RentalLocation>("listingsAndReviews"),
  ),
);
