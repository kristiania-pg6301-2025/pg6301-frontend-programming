import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

const client_id = "77m8tju8g0vwaz";
const client_secret = "WPL_AP1.GxRqFuQGTry0awzY.TVxm5w==";

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
      grant_type: "authorization_code",
      client_secret,
      redirect_uri: `http://localhost:5173/api/login/${providerName}/fetchToken`,
    }),
  });
  const responseJson = await res.json();
  if (false && "access_token" in responseJson) {
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
