import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);
