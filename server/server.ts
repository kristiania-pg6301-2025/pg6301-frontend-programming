import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

app.get("/api/login/linkedin/start", (c) => {
  return c.redirect(
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  );
});
