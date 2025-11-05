import { Hono } from "hono";
import { setCookie } from "hono/cookie";

export async function createOpenidRoute({
  client_id,
  client_secret,
  discoveryDocument,
}: {
  client_id: string;
  client_secret: string;
  discoveryDocument: string;
}) {
  const { authorization_endpoint, token_endpoint, userinfo_endpoint } = await (
    await fetch(discoveryDocument)
  ).json();
  const app = new Hono();

  app.get("/", (c) => {
    const authorizationUrl = `${authorization_endpoint}?${new URLSearchParams({
      client_id,
      response_type: "code",
      scope: "openid profile email",
      redirect_uri: c.req.url + "/complete",
    })}`;
    return c.redirect(authorizationUrl);
  });

  app.get("/complete", async (c) => {
    const { code, error, error_description } = c.req.query();
    if (error) {
      return c.json({ error, error_description });
    }

    if (code) {
      const url = new URL(c.req.url);
      const body = new URLSearchParams({
        code,
        grant_type: "authorization_code",
        client_id,
        client_secret,
        redirect_uri: url.origin + url.pathname,
      }).toString();
      const res = await fetch(token_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      const tokenResponse = await res.json();
      const { access_token } = tokenResponse;
      const cookieValue = JSON.stringify({ access_token, userinfo_endpoint });
      setCookie(c, "authorization", cookieValue, {
        secure: true,
        httpOnly: true,
      });
      return c.json(tokenResponse);
    }

    return c.text("What happened??");
  });

  return app;
}
