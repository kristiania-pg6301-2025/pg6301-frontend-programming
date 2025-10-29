import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { getCookie, setCookie } from "hono/cookie";
import { MongoClient } from "mongodb";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

const client_id = "77m8tju8g0vwaz";
const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
if (!client_secret) {
  throw new Error("Please configure LINKEDIN_CLIENT_SECRET");
}

app.get("/api/login/:providerName/fetchToken", async (c) => {
  const { providerName } = c.req.param();
  const { error_description, code } = c.req.query();
  if (error_description) return c.text(error_description);

  if (!code) return c.text("Error: Code param is missing");

  const { token_endpoint } = await getDiscoveryDoc();

  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      grant_type: "authorization_code",
      redirect_uri: `http://localhost:5173/api/login/${providerName}/fetchToken`,
    }),
  });
  const responseJson = await res.json();
  if ("access_token" in responseJson) {
    setCookie(c, "token", responseJson.access_token, {
      httpOnly: true,
      secure: true,
    });
    return c.redirect("/profile");
  }

  return c.json(responseJson);
});

async function getDiscoveryDoc() {
  const res = await fetch(
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  );

  return await res.json();
}

app.get("/api/login/:providerName/start", async (c) => {
  const providerName = c.req.param().providerName;

  if (providerName === "linkedin") {
    const { authorization_endpoint } = await getDiscoveryDoc();

    const authorizationUri =
      authorization_endpoint +
      "?" +
      new URLSearchParams({
        client_id,
        response_type: "code",
        scope: "openid profile email",
        redirect_uri: `http://localhost:5173/api/login/${providerName}/fetchToken`,
      });

    return c.redirect(authorizationUri);
  }

  return c.json({ startingLogin: providerName });
});

app.get("/api/profile", async (c) => {
  const token = getCookie(c, "token")!;

  const { userinfo_endpoint } = await getDiscoveryDoc();

  console.log({ userinfo_endpoint, token });

  const res = await fetch(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  res.ok;
  return c.json(await res.json());
});

app.get("*", serveStatic({ root: "../dist" }));

const client = new MongoClient(process.env.MONGODB_URL!);

const connection = await client.connect();
const moviesCollection = connection.db("sample_mflix").collection("movies");

app.get("/api/movies", async (c) => {
  const { genres } = c.req.query();
  return c.json(
    await moviesCollection
      .find({ year: { $gt: 2000, $lt: 2005 }, genres })
      .sort({ metacritic: -1 })
      .skip(100)
      .limit(100)
      .toArray(),
  );
});
