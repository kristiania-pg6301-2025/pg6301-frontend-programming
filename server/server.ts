import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

const client_id = "7792wb3of776if";
const client_secret = process.env.CLIENT_SECRET!;

async function getDiscoveryDoc() {
  const res = await fetch(
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  );
  return await res.json();
}

app.get("/api/login/linkedin/start", async (c) => {
  const { authorization_endpoint } = await getDiscoveryDoc();
  const redirect_uri = "http://localhost:5173/api/login/linkedin/complete";
  return c.redirect(
    `${authorization_endpoint}?${new URLSearchParams({ client_id, redirect_uri, response_type: "code", scope: "email openid" })}`,
  );
});

app.get("/api/login/linkedin/complete", async (c) => {
  const { code } = c.req.query();
  const { token_endpoint } = await getDiscoveryDoc();
  const redirect_uri = "http://localhost:5173/api/login/linkedin/complete";

  const payload = {
    client_id,
    client_secret,
    code: code!,
    grant_type: "authorization_code",
    redirect_uri,
  };
  const res = await fetch(token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(payload),
  });

  return c.text(
    `we'll see: Post to ${token_endpoint} ${code}: ${await res.text()}`,
  );
});
