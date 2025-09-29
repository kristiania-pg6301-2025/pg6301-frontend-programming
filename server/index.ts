import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { UserInfo } from "../shared/userInfo.js";

const app = new Hono();

app.get("/api/userinfo", async (c) => {
  const userinfo: UserInfo = {
    username: "Test User",
  };
  return c.json(userinfo);
});

serve(app);
