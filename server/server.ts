import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

const client_id = "7792wb3of776if";

app.get("/api/login/linkedin/start", async (c) => {
  const res = await fetch(
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  );
  const { authorization_endpoint } = await res.json();
  const redirect_uri = "http://localhost:5173/api/login/linkedin/complete";
  return c.redirect(
    `${authorization_endpoint}?${new URLSearchParams({ client_id, redirect_uri, response_type: "code", scope: "email openid" })}`,
  );
});
