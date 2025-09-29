import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { UserInfo } from "../shared/userInfo.js";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const app = new Hono();

const client_secret = process.env.CLIENT_SECRET;
if (!client_secret) throw "Missing CLIENT_SECRET";

const config = {
  openidDiscoveryUri:
    "https://www.linkedin.com/oauth/.well-known/openid-configuration",
  client_id: "7792wb3of776if",
};

async function getDiscoveryDocument(): Promise<{
  token_endpoint: string;
  authorization_endpoint: string;
  userinfo_endpoint: string;
}> {
  const res = await fetch(config.openidDiscoveryUri);
  return await res.json();
}

app.get("/api/login/start", async (c) => {
  const { client_id } = config;
  const { authorization_endpoint } = await getDiscoveryDocument();

  const redirect_uri = `${new URL(c.req.url).origin}/api/login/linkedin/callback`;
  const query = {
    client_id,
    redirect_uri,
    response_type: "code",
    scope: "openid profile email",
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(query)}`);
});

app.get("/api/login/end_session", async (c) => {
  deleteCookie(c, "access_token");
  return c.redirect("/");
});

app.get("/api/login/:provider/callback", async (c) => {
  const { client_id } = config;
  const { error, error_description, code } = c.req.query();
  if (error) {
    return c.json({ error, error_description });
  }
  if (code) {
    const { token_endpoint } = await getDiscoveryDocument();
    const redirect_uri = `${new URL(c.req.url).origin}/api/login/linkedin/callback`;
    const payload = {
      client_id,
      client_secret,
      code,
      redirect_uri,
      grant_type: "authorization_code",
    };
    const tokenRes = await fetch(token_endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload),
    });
    const { access_token } = await tokenRes.json();
    setCookie(c, "access_token", access_token, {
      httpOnly: true,
      secure: true,
    });
    return c.redirect("/");
  }
  return c.text("Don't know yet");
});

app.get("/api/userinfo", async (c) => {
  const { access_token } = getCookie(c);

  if (!access_token) {
    return c.newResponse(null, 401);
  }

  const { userinfo_endpoint } = await getDiscoveryDocument();
  const res = await fetch(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!res.ok) return c.newResponse(null, 401);
  const userinfo: UserInfo = await res.json();
  return c.json(userinfo);
});

serve(app);
