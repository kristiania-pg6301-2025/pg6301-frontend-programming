import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Filter, MongoClient } from "mongodb";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { createOpenidConnectProvider } from "./createOpenidConnectProvider.js";

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

app.get("/api/userinfo", async (c) => {
  const userinfo_endpoint = getCookie(c, "userinfo_endpoint");
  const access_token = getCookie(c, "access_token");
  if (!userinfo_endpoint || !access_token) return c.status(401);
  const res = await fetch(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!res.ok) {
    throw new HTTPException(res.status as ContentfulStatusCode, {
      message: await res.text(),
    });
  }
  return c.json(await res.json());
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
const listingsCollection = connection
  .db("sample_airbnb")
  .collection("listingsAndReviews");

app.get("/api/locations", async (c) => {
  const query = c.req.query();
  let filter: Filter<any> = {};
  if ("market" in query) filter = { ...filter, "address.market": query.market };
  return c.json(
    await listingsCollection
      .find(filter)
      .project({ _id: 1, name: 2, summary: 3, images: { picture_url: 4 } })
      .limit(100)
      .toArray(),
  );
});
app.get("/api/markets", async (c) =>
  c.json(
    (await listingsCollection.distinct("address.market")).filter(
      (s) => s.length > 0,
    ),
  ),
);
