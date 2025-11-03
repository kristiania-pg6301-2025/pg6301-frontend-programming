# Lecture 12: Review of everything

## Reset workspace:

<details>

```shell
git branch --delete lecture/12
git checkout --orphan lecture/12
git reset --hard
git clean -xf .husky dist node_modules server
git commit --allow-empty -m "Empty commit"
heroku apps

```

</details>

## Setup client project

<details>

```shell
echo .idea > .gitignore
npm init -y
npm i -D vite husky prettier typescript
echo node_modules/ >> .gitignore
npm pkg set scripts.dev=vite
npm i react react-dom react-router-dom
npx tsc --init
npm i -D @types/react @types/react-dom
npx prettier --write tsconfig.json
npm pkg set type=module
npx husky init
npm pkg set scripts.test="tsc --noEmit && prettier --check ."

```

</details>

## Setup server project

<details>

```shell
npm i -D @types/node
mkdir server
cd server
npm init -y
npm pkg set type=module
npm i -D tsx
npm i hono @hono/node-server
npm pkg set scripts.dev="tsx --watch index.ts"
cd ..

```

Update `tsconfig.json`:

```
    "types": ["node"],
```

</details>

## Initial files

<details>

### `index.html`

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Task Manager</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script src="src/main.tsx" type="module"></script>
</html>
```

### `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";

function Application() {
  return <h1>Hello World</h1>;
}

createRoot(document.getElementById("app")!).render(<Application />);
```

### `server/index.ts`

```ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));
```

</details>

## Test, commit and deploy to Heroku

<details>

## Setup Heroku

```shell
npm pkg set scripts.build="vite build"
echo dist >> .gitignore
npm pkg set scripts.postinstall="cd server && npm install --include=dev"
npm pkg set scripts.start="cd server && npm start"
cd server
npm pkg set scripts.start="tsx index.ts"
cd ..

```

1. Test: `npm run build && npm start` and open http://localhost:3000
2. Commit: `git add . && git commit -m "Initial project"`
3. Check git remotes: `git remote -v`
4. Create app definition on Heroku: `heroku apps:create `
5. Deploy to heroku: `git push heroku HEAD:main`
6. Check `heroku apps:open`

</details>

## Develop functionality

<details>

### Simplify development

```shell
npm i -D concurrently
npm pkg set scripts.dev="concurrently vite npm:dev:server"
npm pkg set scripts.dev:server="cd server && npm run dev"

```

Start developing with `npm run dev`

### Fetch from the server

```tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";

function Application() {
  const [locations, setLocations] = useState([
    { _id: "1", name: "Beachfront apartment", summary: "Wonderful" },
  ]);

  async function loadLocations() {
    const res = await fetch("/api/locations");
    setLocations(await res.json());
  }

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <>
      <h1>Locations</h1>
      {locations.map(({ _id, name }) => (
        <li key={_id}>
          <Link to={`/locations/${_id}`}>{name}</Link>
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";

export default defineConfig({
  server: { proxy: { "/api": "http://localhost:3000" } },
});
```

### Server responds

```ts
const locations = [
  { _id: "1", summary: "Server apartment", description: "Nice" },
  { _id: "2", summary: "Server cabin", description: "Beautiful" },
];
app.get("/api/locations", (c) => c.json(locations));
```

### Extract `interface RentalLocation` and correct typo

```typescript
export interface RentalLocation {
  _id: string;
  name: string;
  summary: string;
}
```

</details>

## Server uses Mongodb

<details>

### Setup Mongodb on Atlas

### Save data and retrieve in mongodb in `server/index.ts`

1. `echo .env >> .gitignore`
2. `cd server`
3. `npm i mongodb`
4. `npm pkg set scripts.dev="tsx --env-file ../.env --watch index.ts`
5. Restart the dev script to use the `.env`-file
6. Implement the `/api/locations` endpoints with MongoDB

Create a cluster on [Atlas MongoDB](https://cloud.mongodb.com/) and load the sample `sample_airbnb` into it.

Place the value from your connection settings into `.env`:

```properties
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-host>.mongodb.net/?appName=Cluster0
```

```ts
const client = new MongoClient(process.env.MONGODB_URL!);
const connection = await client.connect();
const listingsCollection = connection
  .db("sample_airbnb")
  .collection("listingsAndReviews");

app.get("/api/locations", async (c) =>
  c.json(await listingsCollection.find().limit(100).toArray()),
);
```

</details>
