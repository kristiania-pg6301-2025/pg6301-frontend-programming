import { Collection, type Filter } from "mongodb";
import type { RentalLocation } from "../shared/rentalLocation.js";
import { Hono } from "hono";

export function createRentalLocationsApp(
  collection: Collection<RentalLocation>,
) {
  const app = new Hono();
  app.get("/", async (c) => {
    const query = c.req.query();
    let filter: Filter<RentalLocation> = {};
    if ("market" in query)
      filter = { ...filter, "address.market": query.market };
    return c.json(
      await collection
        .find(filter)
        .project({ _id: 1, name: 2, summary: 3, images: { picture_url: 4 } })
        .limit(100)
        .toArray(),
    );
  });
  app.get("/markets", async (c) =>
    c.json(
      (await collection.distinct("address.market")).filter((s) => s.length > 0),
    ),
  );
  app.get("/:id", async (c) =>
    c.json(await collection.findOne({ _id: c.req.param().id })),
  );
  app.post("/:id/reviews", async (c) => {
    const user = c.get("user");
    if (!user) return c.newResponse(null, 401);
    const { id } = c.req.param();
    const { comments } = await c.req.json();
    const review = {
      _id: Date.now().toString(),
      reviewer_name: user.name,
      comments,
      date: new Date().toISOString(),
    };
    await collection.updateOne({ _id: id }, { $push: { reviews: review } });
    return c.newResponse(null, 204);
  });

  return app;
}
