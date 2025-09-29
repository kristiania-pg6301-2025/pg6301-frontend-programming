import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { UserInfo } from "../shared/userInfo.js";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const app = new Hono();

const linkedin_client_secret = process.env.LINKEDIN_CLIENT_SECRET;
if (!linkedin_client_secret) throw "Missing LINKEDIN_CLIENT_SECRET";

interface OpenidConfig {
  discovery_url: string;
  client_id: string;
  client_secret: string;
}

const configs: Record<string, OpenidConfig> = {
  linkedin: {
    discovery_url:
      "https://www.linkedin.com/oauth/.well-known/openid-configuration",
    client_id: "7792wb3of776if",
    client_secret: linkedin_client_secret,
  },
};

async function getDiscoveryDocument({ discovery_url }: OpenidConfig): Promise<{
  token_endpoint: string;
  authorization_endpoint: string;
  userinfo_endpoint: string;
}> {
  const res = await fetch(discovery_url);
  return await res.json();
}

app.get("/api/login/:provider/start", async (c) => {
  const { provider } = c.req.param();
  const config = configs[provider]!;
  const { authorization_endpoint } = await getDiscoveryDocument(config);

  const redirect_uri = `${new URL(c.req.url).origin}/api/login/${provider}/callback`;
  const query = {
    client_id: config.client_id,
    redirect_uri,
    response_type: "code",
    scope: "openid profile email",
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(query)}`);
});

app.get("/api/login/end_session", async (c) => {
  for (const provider of Object.keys(configs)) {
    deleteCookie(c, `access_token_${provider}`);
  }
  return c.redirect("/");
});

app.get("/api/login/:provider/callback", async (c) => {
  const { provider } = c.req.param();
  const config = configs[provider]!;
  const { client_id, client_secret } = config;
  const { error, error_description, code } = c.req.query();
  if (error) {
    return c.json({ error, error_description });
  }
  if (code) {
    const { token_endpoint } = await getDiscoveryDocument(config);
    const redirect_uri = `${new URL(c.req.url).origin}/api/login/${provider}/callback`;
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
    setCookie(c, `access_token_${provider}`, access_token, {
      httpOnly: true,
      secure: true,
    });
    return c.redirect("/");
  }
  return c.text("Don't know yet");
});

app.get("/api/userinfo", async (c) => {
  const cookies = getCookie(c);
  for (const [provider, config] of Object.entries(configs)) {
    const access_token = getCookie(c, `access_token_${provider}`);
    if (!access_token) continue;

    console.log(`Found access token for ${provider}`);

    const { userinfo_endpoint } = await getDiscoveryDocument(config);
    const res = await fetch(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!res.ok) return c.newResponse(null, 401);
    const userinfo: UserInfo = await res.json();
    return c.json(userinfo);
  }

  return c.newResponse(null, 401);
});

serve(app);
