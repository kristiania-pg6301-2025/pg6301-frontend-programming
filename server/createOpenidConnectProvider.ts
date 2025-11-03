import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";

function createOauthProvider({
  authorization_endpoint,
  client_id,
  client_secret,
  token_endpoint,
  userinfo_endpoint,
}: {
  client_id: string;
  client_secret: string;
  authorization_endpoint: any;
  token_endpoint: any;
  userinfo_endpoint: any;
}) {
  const app = new Hono();
  app.get("/", (c) =>
    c.redirect(
      `${authorization_endpoint}?${new URLSearchParams({
        client_id,
        redirect_uri: `${c.req.url}/complete`,
        response_type: "code",
        scope: "openid profile",
      })}`,
    ),
  );
  app.get("/complete", async (c) => {
    const { error, error_description, code } = c.req.query();
    if (error) {
      return c.json({ error, error_description });
    }
    if (code) {
      const url = new URL(c.req.url);
      const res = await fetch(token_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id,
          redirect_uri: url.origin + url.pathname,
          client_secret,
        }).toString(),
      });
      if (res.ok) {
        setCookie(c, "access_token", (await res.json()).access_token, {
          httpOnly: true,
          secure: true,
        });
        setCookie(c, "userinfo_endpoint", userinfo_endpoint);
        return c.redirect(url.origin);
      }
      return c.json(await res.json());
    }
    return c.text("Dummy text");
  });
  app.get("/endsession", (c) => {
    deleteCookie(c, "userinfo_endpoint");
    deleteCookie(c, "access_token");
    return c.redirect(new URL(c.req.url).origin);
  });

  return app;
}

export async function createOpenidConnectProvider({
  discovery_doc,
  client_id,
  client_secret,
}: {
  discovery_doc: string;
  client_id: string;
  client_secret: string;
}) {
  const res = await fetch(discovery_doc);
  const { authorization_endpoint, token_endpoint, userinfo_endpoint } =
    await res.json();

  return createOauthProvider({
    client_id,
    client_secret,
    authorization_endpoint,
    token_endpoint,
    userinfo_endpoint,
  });
}
