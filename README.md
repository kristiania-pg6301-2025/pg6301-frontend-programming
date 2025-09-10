# PG6301 Web Development and API design

Welcome to this course in Web Development and API Design. In this course, we will
look at creating single-page applications with React backed by APIs implemented
with React. The application will store data in MongoDB and be deployed on Heroku

- [Lectures](#lectures)
- [Reference material](#reference-material)

## Understanding the course

In this course, we expect you to become proficient at building web applications
with JavaScript, React and Hono. During the lectures, you will see live coding
of how such applications may be constructed and many topics will be explained
along the way.

The course will not have slides, but all the lectures will be recorded and made
available on Canvas. Each lecture will consist of 10-15 commits which will be
available on GitHub for student's reference.

There are many topics that we believe are more suitable for self-study than
classroom explanations, and you will not always be shown how all topics are used
in a more general situation. _You will be expected to master some such topics
to get a top grade at the exam_. In order to be prepared for the exam, you have
to follow the lectures, but you also have to be able to solve new problems and
find relevant information along the way. To be able to do this, it's extremely
valuable for you to follow the exercises along the lectures.

The lectures will be recorded and the recordings will be available to students in Panopto in Canvas.

### The example applications

In the course we will mainly be building two example applications:

- The todo-application: This is a very common example, and you can see lots of examples
  using this online. The application lets to users create tasks and mark them as
  complete. In addition, we will be adding details to the tasks and give access to
  tasks to other users
- Movie reviews

## Lectures

### Lecture 1: Programming skills

[![Lecture 1 Mentimeter](https://img.shields.io/badge/Lecture_1-mentimenter-yellow)](https://www.menti.com/alqqnwny4ksk)

[![Lecture 1 code](https://img.shields.io/badge/Lecture_1-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/01)
[![Lecture 1 reference](https://img.shields.io/badge/Lecture_1-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/01)
[![Lecture 1 exercise](https://img.shields.io/badge/Lecture_1-exercise-pink)](./exercises/EXERCISES.md#exercise-1)
[![Lecture 1 issues](https://img.shields.io/badge/Lecture_1-issues-green)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/milestone/1)

In this lecture, we will look at some popular and effective software engineering practices:

- Test-driven development: Alternating between writing testing code and production code, writing the test code first
- Pair-programming: Two developers working together on the same code with one keyboard and mouse, preferably alternating frequently who is at the keyboard
- Refactoring: Improving the structure of the code without changing the behavior, preferably using refactoring support in the IDE
- Continuous integration: Sharing the code frequently with the rest of the team, preferably running automated checks whenever the code is pushed

These are some of the practices of Extreme Programming, the first Agile method to be widely documented and used.

### Lecture 2: Programming tools

[![Lecture 2 code](https://img.shields.io/badge/Lecture_2-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/02)
[![Lecture 2 reference](https://img.shields.io/badge/Lecture_2-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/02)
[![Lecture 2 exercise](https://img.shields.io/badge/Lecture_2-exercise-pink)](./exercises/EXERCISES.md#exercise-2)
[![Lecture 2 issues](https://img.shields.io/badge/Lecture_2-issues-green)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/milestone/2)

This lecture covers GitHub Actions, Pull requests, GitHub issues and Code Reviews. This completes most of the practices from Extreme Programming:

- Pair programming
- Test-driven development
- Simple design
- Refactoring
- Continuous integration
- Coding standard
- (Collective code ownership)
- (Sustainable pace)

Bonus content: Course logo

### Lecture 3: A tour of React, Hono and Heroku

[![Lecture 3 code](https://img.shields.io/badge/Lecture_3-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/03)
[![Lecture 3 reference](https://img.shields.io/badge/Lecture_3-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/03)
[![Lecture 3 exercise](https://img.shields.io/badge/Lecture_3-exercise-pink)](./exercises/EXERCISES.md#exercise-3)

We explore the most important parts to the whole application up and running on
a server. This lecture will be _way too fast to understand_ and will serve merely
as a teaser to topics that will be important through the course. After the
lecture, you will only be expected to know the basics of how to create a React
application with Vite and React Router

[Reference server running on Heroku](https://pg6301-reference-77c6cee527d5.herokuapp.com/)
[Lecture server running on Heroku](https://pg6301-lecture-fc44d69a53a7.herokuapp.com/)


### Lecture 4: React, `useState` and props

[![Lecture 4 code](https://img.shields.io/badge/Lecture_4-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/04)
[![Lecture 4 reference](https://img.shields.io/badge/Lecture_4-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/04)
[![Lecture 4 exercise](https://img.shields.io/badge/Lecture_4-exercise-pink)](./exercises/EXERCISES.md#exercise-4)

We will review the React topics from the last lecture: Creating a React app,
creating functional components and using props, state and effects.

#### Reference material

- [Fireship: React in 100 seconds](https://youtu.be/Tn6-PIqc4UM)
- [Fireship: every React hook](https://youtu.be/TNhaISOUy6Q)

### Lecture 5: `useEffect`, `useRef` and React Router

[![Lecture 5 code](https://img.shields.io/badge/Lecture_5-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/05)
[![Lecture 5 reference](https://img.shields.io/badge/Lecture_5-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/05)
[![Lecture 5 exercise](https://img.shields.io/badge/Lecture_5-exercise-pink)](./exercises/EXERCISES.md#exercise-5)

We will continue on the React topics from the last lecture of creating components.
We will use the `useEffect` and `useRef` hooks to set up interaction between our app and the DOM-objects in the browser
in order to create a Dialog component using the HTML `<dialog />` element
We will also look at navigating in the app with React Router.

#### Reference material

- [Fireship: every React hook](https://youtu.be/TNhaISOUy6Q)

### Lecture 6: Implementing a React backend with Hono

[![Lecture 6 code](https://img.shields.io/badge/Lecture_6-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/06)
[![Lecture 6 reference](https://img.shields.io/badge/Lecture_6-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/06)
[![Lecture 6 exercise](https://img.shields.io/badge/Lecture_6-exercise-pink)](./exercises/EXERCISES.md#exercise-6)

We will create an Hono server which serves a React application that uses an API implemented in [Hono](https://hono.dev/) to implement
functionality.
See [Convert to serve from Hono] on the steps to take the code from the
previous lecture to be served from Hono.

### Lecture 7: Publishing your application on Heroku

[![Lecture 7 code](https://img.shields.io/badge/Lecture_7-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/07)
[![Lecture 7 reference](https://img.shields.io/badge/Lecture_7-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/07)
[![Class assignment](https://img.shields.io/badge/Lecture_7-exercise-pink)](./exercises/EXERCISES.md#exercise-7)

In this lecture, we will upload a simple web application to a cloud service and look at automatic deploys.
See [the steps to deploy to Heroku](#deploy-to-heroku).

**Reference material:**

- [Heroku's documentation on using Node.js](https://www.heroku.com/nodejs)
- [Heroku free credits for students](https://www.heroku.com/github-students)

In this lecture, we also look at ways to make sure our code is good, from formatting, to linting, to testing.
We will look at the tools husky, prettier and Typescript. We will also be using GitHub to run our quality
checks automatically.

### Lecture 8: Communication between client and server

[![Lecture 8 code](https://img.shields.io/badge/Lecture_8-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/08)
[![Lecture 8 reference](https://img.shields.io/badge/Lecture_8-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/08)
[![Lecture 8 exercise](https://img.shields.io/badge/Lecture_8-exercise-pink)](./exercises/EXERCISES.md#exercise-8)

In this lecture, we will start from a blank application to review what we have covered so far. This will also give us
some chance to deal with some information we have glossed over about the communication between the client and the server.

### Lecture 9: Storing data MongoDB

[![Lecture 9 code](https://img.shields.io/badge/Lecture_9-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/09)
[![Lecture 9 reference](https://img.shields.io/badge/Lecture_9-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/09)
[![Lecture 9 exercise](https://img.shields.io/badge/Lecture_9-exercise-pink)](./exercises/EXERCISES.md#exercise-9)

In this lecture, we learn how to store and retrieve data in [MongoDB](https://www.mongodb.com/).

**Reference material:**

- [MongoDB Skills](https://www.youtube.com/watch?v=0vPt7GI-2kc) - very useful and brief
- [MongoDB in 100 seconds (Fireship.io)](https://www.youtube.com/watch?v=-bt_y4Loofg)
- [MongoDB University: JavaScript](https://university.mongodb.com/courses/M220JS/about)
- [MongoDB documentation: How to query collections](https://www.mongodb.com/docs/manual/reference/operator/query/)
- [MongoDB documentation: How to insert a document](https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/)

### Lecture 10: Who's your user? OpenID Connect

[![Lecture 10 Mentimeter](https://img.shields.io/badge/Lecture_10-mentimenter-yellow)](https://www.menti.com/)

[![Lecture 10 code](https://img.shields.io/badge/Lecture_10-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/10)
[![Lecture 10 reference](https://img.shields.io/badge/Lecture_10-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/10)
[![Lecture 10 exercise](https://img.shields.io/badge/Lecture_10-exercise-pink)](./exercises/EXERCISES.md#exercise-10)

In this lecture we will implement "log in with Google"-functionality. We will also explore other identity
services that also implement OpenID Connect, such as LinkedIn and Microsoft Entra ID.

### Lecture 11:

[![Lecture 11 code](https://img.shields.io/badge/Lecture_11-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/11)
[![Lecture 11 reference](https://img.shields.io/badge/Lecture_11-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/11)

### Lecture 12: Repetition of everything

[![Lecture 12 Mentimeter](https://img.shields.io/badge/Lecture_12-mentimenter-yellow)](https://www.menti.com/)

[![Lecture 12 code](https://img.shields.io/badge/Lecture_12-lecture_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/lecture/12)
[![Lecture 12 reference](https://img.shields.io/badge/Lecture_12-reference_code-blue)](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/tree/reference/12)
[![Lecture 12 exercise](https://img.shields.io/badge/Lecture_12-exercise-pink)](./exercises/exam-prep.md)

This week's lecture, we will talk a [little about the exam](./exercises/exam-prep.md).
We start then with a simple map and then discuss how to move forward based on the wishes
of the audience, so the lecture has no reference code.

For the exercise-time start on the last exercise that you haven't completed.

## Reference material

### Creating a React application

This list of commands:

1. Creates a `package.json`-file
2. Installs [Vite](https://vite.dev) which transforms `index.html` + `.tsx`-files to JavaScript
3. Installs [TypeScript](https://www.typescriptlang.org/) to check the correctness of your code
4. Installs [Prettier](https://prettier.io/) to check the coding style of your code
5. Installs [Husky](https://typicode.github.io/husky/) which runs checks before each login
6. Installs the [Vitest](https://vitest.dev) testing library

```shell
npm init -y
npm install -D vite
npm install react react-dom
npm pkg set scripts.dev=vite

npm install -D typescript
npm install -D @types/react @types/react-dom
npx tsc --init --jsx react

npm install -D prettier
npx prettier --write .
npm pkg set scripts.test="tsc --noEmit && prettier --check ."

npm install -D husky
npx husky init

npm install vitest

```

#### Minimal `index.html`

```html
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script src="src/main.tsx" type="module"></script>
</html>
```

#### Minimal `src/main.tsx`

```jsx
import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(<h1>Hello React</h1>);
```

#### Commiting to Git

1. Create a `.gitignore`-file that excludes `node_modules`, `dist` and `.idea`
2. Make sure all files are formatted with Prettier

## Deploying your application to the internet

You can either deploy using [GitHub pages](#a-deployment-to-github-pages) or [Heroku](#b-deploying-to-heroku).
GitHub pages is the simplest option, but it cannot run a database. If you want to include a database, you need
to use Heroku or a similar service

### A. Deployment to GitHub Pages

#### Minimal `vite.config.ts`

```ts
import { defineConfig } from "vite";

export default defineConfig({
  // This has to be equal to the name of your repository
  // For example, since this repository is https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming,
  //  `base` has to be `/pg6301-frontend-programming`
  base: "/pg6301-frontend-programming",
});
```

#### Minimal `.github/workflows/publish-to-github-pages.yml`

<details>

```yml
on:
  push:
    # Only deploy when the branch name matches one of these
    # You probably only need `main`, the others are provided to work with the lecture
    branches: ["main", "reference/*", "lecture/*"]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22.x, cache: "npm" }
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4

    permissions:
      id-token: write # to verify the deployment originates from an appropriate source
      pages: write # to deploy to Pages
      contents: read # to checkout private repositories
```

</details>

### B. Deploying to Heroku

By running on Heroku, you can have a server-side application which accesses a database.

#### Creating a Hono Application

This sets up your application to have a subdirectory for the server which should have node modules installed and be
started by Heroku.

This list of commands:

1. Sets up the scripts to build and start the application on Heroku
2. Creates a directory for the server with a separate `package.json`
3. Adds dependencies on [Hono](https://hono.dev/)
4. Creates the scripts to develop and run the server

```shell
npm pkg set scripts.postinstall="cd server && npm install --include=dev"
npm pkg set scripts.build="vite build"
npm pkg set scripts.start="cd server && npm start"

npm install -D @types/node

mkdir server
cd server
npm init -y

npm install hono @hono/node-server
npm install --save-dev tsx
npm pkg set scripts.dev="tsx --watch server.ts"
npm pkg set scripts.start="tsx server.ts"

```

**`server/server.ts`**

```typescript
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

// Heroku provides the port that the server should start on as an environment variable
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
serve({ fetch: app.fetch, port });
```

#### Deploying to Heroku

In order to deploy to Heroku you need to register an account with [Heroku](https://heroku.com). Read through the
documentation about [Heroku for GitHub Students](https://www.heroku.com/github-students) so you understand how to avoid
cloud bills.

Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Now you need to commit your changes. You can then create a Heroku application and push your code to it.

1. `heroku apps:create`
2. `git push heroku`

#### Snapshot testing - check that a view is rendered correctly

For testing react code, I recommend [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

<details>

To test with react, install devDependencies `@testing-library/react` and `jsdom`

1. `npm install --save-dev vitest @testing-library/react jsdom`
2. Add the following to your `vite.config.js`:

   ```js
   import { defineConfig } from "vite";

   export default defineConfig({
     test: {
       environment: "jsdom",
     },
   });
   ```

- Use `render` from `@testing-library/react` to instantiate components
- Use `expect(RenderResult.baseElement).toMatchSnapshot()` for a test that checks that nothing has changed
- Use `RenderResult.baseElement.{querySelector,querySelectorAll}` to find DOM elements to inspect in the test
- You can also use [`RenderResult.findBy{Text,LabelText}`](https://testing-library.com/docs/queries/about) to find elements - this retries for up to one second
- Use `fireEvent` from `@testing-library/react` to create change, submit and other events
- Use [`vitest.fn()`](https://vitest.dev/guide/mocking) to create a [Mock](https://vitest.dev/guide/mocking) function that can be used to verify that an event was triggered

```javascript
import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, render } from "@testing-library/react";
import React from "react";

// Without this, each test will extend the web page from the previous instead of starting over
afterEach(cleanup);

it("matches snapshot", async () => {
  const app = render(
    <MemoryRouter initialEntries={["/"]}>
      <MoviesRoutes fetchMovies={() => movies} />,
    </MemoryRouter>,
  );
  expect(app.baseElement).toMatchSnapshot();
  expect(
    [...app.baseElement.querySelectorAll("h3")].map((c) => c.textContent),
  ).toEqual(["Barbie", "Oppenheimer"]);
});
```

</details>

#### Simulate events

<details>

```javascript
import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";

// Without this, each test will extend the web page from the previous instead of starting over
afterEach(cleanup);

it("handles event", async () => {
  const handleClick = vitest.fn();
  const app = render(
    <button onClick={() => handleClick(123)}>Click me</button>,
  );
  fireEvent.click(await app.findByText("Click me"));
  expect(handleClick).toBeCalledWith(123);
});
```

</details>

#### Using supertest to check server side behavior

For testing Hono files, I recommend [Supertest](https://github.com/ladjs/supertest)

<details>

**_Setup_**:

1. `cd client`
2. `npm install --save-dev vitest supertest`

To test a bookApi defined in `server/booksApi.js` like this:

TODO

you can use a test in `server/tests/booksApi.test.js` like this:

TODO

## OpenID Connect - Log on with Google

### Client side (implicit flow)

<details>

"Implicit flow" means that the login provider (Google) will not require a client secret to complete the authentication.
This is often not recommended, and for example Microsoft Entra ID instead uses another mechanism called PKCE, which
protects against some security risks.

1. Set up the application in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Create a new
   OAuth client ID and select Web Application. Make sure `http://localhost:3000` is added as an Authorized JavaScript
   origin and `http://localhost:3000/callback` is an authorized redirect URI
2. To start authentication, redirect the browser (see code below)
3. To complete the authentication, pick up the `access_token` when Google redirects the browser back (see code below)
4. Save the `access_token` (e.g. in `localStorage`) and add as a header to all requests to backend

</details>

#### Redirect the client to authenticate

<details>

```javascript
function LoginButton() {
  const [authorizationUrl, setAuthorizationUrl] = useState();
  async function generateAuthorizationUrl() {
    // Get the location of endpoints from Google
    const { authorization_endpoint } = await fetchJson(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    // Tell Google how to perform the authentication
    const parameters = {
      response_type: "token",
      client_id: "<get this from Google Cloud Console>",
      // Tell user to come back to http://localhost:3000/login/callback when logged in
      redirect_uri: window.location.origin + "/login/callback",
      scope: "profile email",
    };
    setAuthorizationUrl(
      discoveryDoc.authorization_endpoint +
        "?" +
        new URLSearchParams(parameters),
    );
  }

  useEffect(() => {
    generateAuthorizationUrl();
  }, []);

  return <a href={authorizationUrl}>Log in with Google</a>;
}
```

In the case of Entra ID, you also need
parameters `response_type: "code"`, `response_mode: "fragment"`, `code_challenge_method` and `code_challenge` (the
latest two are needed for PKCE).

</details>

#### Handle the authentication callback

<details>

```javascript
// Router should take user here on /callback
export function LoginCallback() {
  const navigate = useNavigate();
  // Given an URL like http://localhost:3000/callback#access_token=sdlgnsoln&foo=bar,
  //  window.location.hash will give the part starting with "#"
  //  ...substring(1) will remove the "#"
  //  and Object.fromEntries(new URLSearchParams(...)) will parse it into an object
  // In this case, hash = { access_token: "sdlgnsoln", foo: "bar" }
  const callbackParameters = Object.fromEntries(
    new URLSearchParams(window.location.hash.substring(1)),
  );

  async function handleCallback() {
    // Get the values returned from the login provider. For Active Directory,
    // this will be more complex
    const { access_token } = callbackParameters;
    await fetch("/api/login/accessToken", {
      method: "POST",
      body: JSON.stringify({ access_token }),
      headers: {
        "content-type": "application/json",
      },
    });
    navigate("/");
  }

  useEffect(() => {
    handleCallback();
  }, []);

  return <div>Please wait...</div>;
}
```

For Active Directory, the hash will instead include a `code`, which you will then need to send to the `token_endpoint`
along with the `client_id` and `redirect_uri` as well as `grant_type: "authorization_code"` and the `code_verifier`
value from PKCE. This call will return the `access_token`.

</details>

#### Handle access_token on the backend

<details>

```javascript
app.use(async (req, res, next) => {
  const { access_token } = req.signedCookies;
  if (access_token) {
    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration",
    );
    req.userinfo = await fetchJSON(userinfo_endpoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }
  next();
});

app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(204);
});

app.get("/profile", (req, res) => {
  if (!req.userinfo) {
    res.send(401);
  } else {
    res.send(req.userinfo);
  }
});
```

</details>

## Tools

### IntellJ shortcuts

<details>
These are some of the most versatile keyboard shortcuts in IntelliJ. There are many more, but learning these 12 will really speed up your code

| Shortcut (Windows)   | Shortcut (Mac)      | Command                                    |
| -------------------- | ------------------- | ------------------------------------------ |
| alt-enter            | opt-enter           | Show content action (quick fix)            |
| ctrl-alt-shift-t     | ctrl-t              | Refactor this (show refactor menu)         |
| alt-insert           | cmd-n               | New... (add some content)                  |
| ctrl-w               | opt-up              | Expand selection                           |
| shift-alt-f10        | ctrl-alt-r          | Run....                                    |
| shift-alt-f9         | ctrl-alt-d          | Debug....                                  |
| shift-f10            | ctrl-d              | Rerun last....                             |
| ctrl-b               | cmd-b               | Navigate to symbol                         |
| alt-j                | ctrl-g              | Add next match to selection (multi-cursor) |
| shift-ctrl-backspace | shift-cmd-backspace | Goto last edit location                    |
| shift, shift         | shift, shift        | Search anywhere                            |

Make yourself familiar with `Refactor this` (ctrl-alt-shift-t / ctrl-t) and use it to learn the shortcut keys for your
favorite refactorings like Extract method, Rename and Inline.

</details>

### Git commands

<details>

| Command      | Description                              | IntelliJ shortcut                         |
| ------------ | ---------------------------------------- | ----------------------------------------- |
| `git init`   | Creates a new local git repo in `.git/`  | VCS > Import into version control         |
| `git add`    | Stage files to include in next commit    | (not needed)                              |
| `git commit` | Store your local changes in git history  | ctrl-k / cmd-k                            |
| `git push`   | Upload changes to remote repo (github)   | ctrl-sh-k / cmd-sh-k                      |
| `git clone`  | Create a local copy from remote (github) | File > New > Project from version control |
| `git pull`   | Update local copy with others' changes   | ctrl-t / cmd-t                            |
| `git log`    | View change history                      | View > Tool Windows > Version control     |

</details>

## Software and libraries used in this course:

- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React](https://react.dev)
- [NodeJs](https://nodejs.org)
- [Hono](https://hono.dev/)
- [IntelliJ](https://www.jetbrains.com/idea/)
- [Heroku](https://devcenter.heroku.com/)
- [MongoDB](https://www.mongodb.com/)
- [Husky](https://typicode.github.io/husky/)
- [Prettier](https://prettier.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest](https://github.com/ladjs/supertest)
- Google Login
- Entra ID (?)
