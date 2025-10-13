# Lecture 8: Communication between the client and the server

## Reset workspace:

<details open>

```shell
git branch --delete lecture/09
git checkout --orphan lecture/09
git reset --hard
git clean -xf .husky dist node_modules server
git commit --allow-empty -m "Empty commit"
heroku apps

```

</details>

## Setup client project

<details open>

```shell
echo .idea > .gitignore
npm init -y
npm i -D vite husky prettier typescript
echo node_modules/ >> .gitignore
npm pkg set scripts.dev=vite
npm i react react-dom
npm i -D @types/react @types/react-dom
npx tsc --init
npx prettier --write tsconfig.json
npm pkg set type=module
npx husky init
npm pkg set scripts.test="tsc --noEmit && prettier --check ."

```

## Setup server project

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
git add package.json package-lock.json
```

Start developing with `npm run dev`

### Fetch from the server

```tsx
function Application() {
  const [tasks, setTasks] = useState([
    { description: "Fetch data from server", completed: false },
  ]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}
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
const tasks = [
  { description: "Fetch data from server", complete: true },
  { description: "Deal with slow server", complete: false },
  { description: "Deal with errors from server", complete: false },
];

app.get("/api/tasks", (c) => c.json(tasks));
```

## Server uses Mongodb

### Run Mongodb in Docker Desktop

1. Download [Docker Desktop](https://docs.docker.com/desktop/)
2. Create a docker compose file to start Mongodb

```yaml
services:
  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

### Save data and retrieve in mongodb in `server/index.ts`

1. `cd server`
2. `npm i mongodb`
3. Implement the `/api/tasks` endpoints with MongoDB

```ts
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";

const client = new MongoClient(MONGODB_URL);
const connection = await client.connect();
const taskDb = connection.db("task_application");

app.get("/api/tasks", async (c) => {
  return c.json(await taskDb.collection("tasks").find().toArray());
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  const task = { description, completed };
  await taskDb.collection("tasks").insertOne(task);
  return c.newResponse(null, 204);
});
```

</details>
