# PG6301 Web Development and API design - Exercises

## Exercise 1

<details>

Good programming is about getting frequent feedback from what you are working on, both from team members and from
programming tools.

Test-driven development is a method where the tools help you take small, quick steps and validate the work along the
way.

Pair programming is a normal way of working where two programmers sit at the same machine, screen, keyboard, and mouse,
and solve the task together.

Both methods are useful for quality, progress, and—perhaps most importantly—for making programming more fun.

In exercise 1, we will go through setting up the necessary tools to get started. We will then combine test-driven
development and pair programming to implement a program that converts a number to Roman numerals. For example, given
1999, the program should output "MCMXCIX".

For a full description of the coding problem,
see [Coding Dojo description of Roman Numerals](https://codingdojo.org/kata/RomanNumerals/)

### Step 1: Install and sign up for necessary tools

1. Install [NodeJS](https://nodejs.org/en/download/package-manager) (if you don't already have it)
2. Sign up for [GitHub student developer pack](https://education.github.com/pack/join) which gives you access to
   important resources like IntelliJ Ultimate and Heroku for free. Make sure to use your school email address for the
   registration.
3. Download [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/download/). You can use a Trial license until your
   GitHub student pack is registered. You can then
   use [the IntelliJ student page](https://www.jetbrains.com/shop/eform/students)
   to get a long term license

### Step 2: Create a new project with NodeJS and Vitest

1. Find a partner
2. One of you should [create a new repository](https://github.com/new) on GitHub
3. Add your partner under Settings > Collaborator
4. In IntelliJ, select ☰ > File > New Project from Version Control and copy your new GitHub repo as the URL
5. Open the terminal Windows in IntelliJ
6. Create the `package.json` files for your Vitest tests to work
   1. `npm init -y`
   2. `npm install --save-dev vitest husky prettier`
   3. `npx husky init`
   4. `npm pkg set scripts.test="prettier --check ."`
   5. `npm pkg set scripts.test:watch="vitest --watch"`
7. Start running the tests: `npm run test:watch`

You should now see an error message saying "No test files found. You can change the file name pattern by pressing "p"".
This means that your tests are configured correctly.

### Step 3: Write your first failing test

1. Create a file named `romanNumerals.test.js`
   - The output from "vitest" should now say "No test suite found in file ...". This means that Vitest found the test
     file, but it was empty
2. Add code for your first test in `romanNumerals.test.js`

   ```js
   import { test, expect } from "vitest";

   test("1 in roman numerals is I", () => {
     expect(romanNumerals(1)).toBe("I");
   });
   ```

3. You should now receive the error message "ReferenceError: romanNumerals is not defined". This means that your test
   ran, but we haven't yet created the code for it to test
4. In IntelliJ, press F2 to select the next problem and `Alt-enter` (`opt-enter` on Mac) to get a quick fix. You can now
   select to create a new function.
5. Creating an empty function is fine. You test will fail with "AssertionError: expected undefined to be 'I' //
   Object.is equality"

This means that it is time to give control to your partner. You need to commit your code. In IntelliJ, you can select
☰ > Git > Git commit. However, when you try to commit, you will receive an error because Husky (which we installed
earlier)
is calling Prettier (which we installed earlier) to check that your code is formatted well.

In the terminal, write `npx prettier --write .` to reformat your code. You can now commit.

Select ☰ > Git > Push to push your changes to GitHub.

### Step 4: Make the test pass

The other programmer should now take over.

1. The other programmer should get the code to their computer from GitHub
2. In IntelliJ, select ☰ > File > New Project from Version Control and copy your GitHub repo as the URL
3. In the terminal, run `npm install`, then run `npm run test:watch`. You should now get a failing test
4. Implement the test as simply as possible: Just make `romanNumerals` always `return "I"`
5. You tests run green. You should now give each other a HIGH FIVE
6. Implement the second test:
   ```js
   test("2 in roman numerals is II", () => {
     expect(romanNumerals(2)).toBe("II");
   });
   ```
7. The test should fail with "AssertionError: expected 'I' to be 'II'"
8. Reformat you code with Prettier (if needed), git commit and git push

### Step 5: Ping-pong

The first programmer should now take over.

1. Use Git pull to get the failing test from GitHub. See that it is failing on your computer, too
2. Update `romanNumerals`: `if (number === 2) return "II";`
3. See the test pass
4. Add another test for 3 ("III")

Instead of running Prettier manually, you may want to install the Prettier plugin in IntelliJ: File > Settings
and select Plugins. Then go to Languages & frameworks > JavaScript > Prettier

Commit and push your code to GitHub

### Step 6: Refactoring towards of logic

The other programmer should take over.

1. Copy the line for dealing with 2 to also deal with 3 - this is the fastest way to get the test to green
2. See the test run green. Now you can refactor.
3. Instead of having a list of "ifs", make a loop that adds one "I" to the resulting value. Changing the working code is
   called "refactoring"
4. If you do it correctly, you tests will still pass
5. You can now add a test for 4 ("IV"). If you do it correctly, you will get the message "AssertionError: expected
   'IIII' to be 'IV'". This a satifying result as it is reflecting the current understanding in your code

Commit and push your code to GitHub and let your partner take over.

Continue creating new tests and pass control back and forth. If you do it smartly, your tests will probably continue
with 5, 6, then skip to 9, 10, 11 and then skip to 20

</details>

## Exercise 2

<details>

Programming tools allow you to collaborate safely and efficiently with other programmers. In this exercise, we will
learn about GitHub Actions Workflows, Pull requests and Code reviews.

Make sure that you have followed Exercise 1 first, as Exercise 2 builds on what you learned before.

In this exercise, we will implement a program to calculate the scores of
a [Yahtzee game](https://codingdojo.org/kata/Yahtzee/)

### Setup

1. Find a partner
2. One of you should [create a new repository](https://github.com/new) on GitHub
3. Add your partner under Settings > Collaborator
4. Create a NPM project with Vitest as in [exercise 1](#exercise-1)

### Implement the first rules of yahtzee

1. The first programmer should implement scoring of "chance":
   ```js
   test("scoring Chance add all dice", () => {
     expect(yatzeeScore("Chance", [1, 2, 3, 4, 5])).toBe(1 + 2 + 3 + 4 + 5);
   });
   ```
2. Once you see the test run and fail, commit and push the code
3. The other programmer should implement `yahtzeeScore` to make it pass
4. The other programmer should write a new test, for example to describe `Ones`
5. The first programmer should make `Ones` pass, then write another test for `Twos`
6. The other programmer should make `Twos` pass. **But wait with writing the next test**

### Implement GitHub Actions

GitHub Actions makes GitHub run verification steps and perform other actions each time you push a new version of the
code. This can save you lots of trouble down the line.

1. On your repository in GitHub, choose Actions
2. Here, you are presented with starting points for GitHub Actions. Type `node.js` into the search field and select the
   workflow with the same name among those that show up
3. When you commit this workflow, the Action will start running on GitHub. Make sure you get it to run to green

### Pull request

You should now continue on the Yahtzee task, but first, create a new branch.

1. In IntelliJ, click the branch name ("main") on the toolbar and select "New Branch..." from the menu. Give the branch
   the name `feature/score-threes`
2. Implement the test and push
3. In GitHub, go to "Pull requests" and create a new pull request based on `feature/score-threes`
4. The other programmer than the one who created the Pull request should review the Pull request on GitHub and make a
   few comments
5. Merge the pull requests
6. In IntelliJ, once you pull the main branch, you should see the Pull request as a branch in the Git Window

### Repeat to learn

Create a branch for `feature/score-pair`, implement scoring pair in Yahtzee with two tests with different pairs. Then
create a Pull request, do a code review and merge

### Complete the task

Talk among yourselves and review what is a good approach going forward. You have implemented a few Yahtzee rules. Which
ones would you do next? What changes are needed to the code? Which branches would you like to create?

In GitHub, go to Issues and create a New issue for the tasks you are planning to execute.

This is a good time to test out working in parallel. Assign one issue to each of the programmers in the pair, complete
some Yahtzee rules and create a Pull request each. Review and merge each other's pull request.

</details>

## Exercise 3

<details>

### The React todo-application

The main running exercise of this course is the classic "TODO" application. This is a very common example, and you can
see lots of examples using this online. The application lets to users create tasks and mark them as complete. In
addition, we will be adding details to the tasks and give access to tasks to other users.

Your application should have the following:

1. A list of checkboxes for all created tasks
2. An input field with a submit button to add a new task

### Before you begin

Make sure you have signed up for GitHub Education and installed NodeJS and IntelliJ.

### Getting started

1. Create a repository in GitHub. You can also create a subdirectory in an existing repository if you prefer
2. In the terminal, create a React project
   1. `npm init -y`
   2. `npm install -D husky prettier vite`
   3. `npm pkg set scripts.test="prettier --check ."`
   4. `npx husky init`
   5. `npm install react react-dom`
   6. `npm pkg set scripts.dev="vite"`
3. Go to http://localhost:5173 to see the Vite development server running. You will receive a 404 error as it is empty
4. Create a file named `index.html`:
   ```html
   <html lang="en">
     <body>
       <div id="root"></div>
     </body>
     <script src="src/main.jsx" type="module"></script>
   </html>
   ```
5. Create a file named `src/main.jsx`:

   ```jsx
   import React from "react";
   import { createRoot } from "react-dom/client";

   createRoot(document.getElementById("root")).render(<h1>Hello React</h1>);
   ```

6. If you refresh your browser, you will now see the message
7. Try to change the text "Hello React" in `src/main.jsx`. As you save, your browser should refresh automatically

If you want to explore React a bit more right away, check out the [official React tutorials](https://react.dev/learn).

### Create the React code for the todo application

At this point, your todo application should consist of two components:

- A list of tasks, backed by `const [tasks, setTasks] = useState([])`
- A form to create a new task, with the title backed by `const [title, setTitle] = useState("")`
- When submitting the form, you need to create a `onSubmit` handler which updates the `tasks` state

### Step 4: Competition

We need a logo for the course GitHub pages. Post your as a comment
to [Course logo issue](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/issues/12) and vote with
emojiis on other entries. Despite knowing better from experience, I will let the democratic process decide on the logo.

</details>

## Exercise 4

<details>

### Updating tasks

The goal of this exercise is to extend the task management application from [exercise 3](#exercise-3) with functionality
to write details about a task and to make the task as being completed.

You should complete exercise 3 before starting this
exercise.

### Goal #1: Mark tasks as checked or and unchecked

When the user checks the "complete" checkbox for a task, the task should be changed to completed. In order
to make this work, you need to implement an id for each task in the list.

### Goal #2: View and update details about tasks

Add react-router-dom as a dependency.

When the user clicks the title for a task, they should navigate to the details for that task. If there is no
description registered for the task, the user should be able to provide one.

If you want to explore React a bit more right away, check
out [the official React tutorials](https://react.dev/learn/tutorial-tic-tac-toe).

</details>

## Exercise 5

<details>

### Dialog, useEffect and useRef

The goal of this exercise is to use the fairly new HTML tag `<dialog />` with React. As `<dialog />` has a lot of
built-in functionality, our React code must interact with the JavaScript of the DOM (document object model).

You should complete exercise 4 before starting this exercise.

### Desired functionality

1. Create a new task from the front page (exercise 3)
2. Click on the title of the task to see the task details with react-router-dom (exercise 4)
3. Click on an `Edit` button to bring up a `<dialog />` to change the description of the task (this exercise)
4. Submitting the form in the dialog should close the dialog and update the task description. It should also be possible
   to cancel the update

### How to implement it:

- Use `useState` to create a `isDialogOpen`-state that reflects the state of the `<dialog />`
- Use `useRef` to refer to the `<dialog>` element
- Use `useEffect` to call `showModal()` on the ref when `isDialogOpen` updates

### Close the dialog correctly

If you press Escape in the dialog for updating task title, you may be unable to click the dialog open again.
This is because the state of `isDialogOpen` has drifted away from the state of the HTML elements. Add a close listener
to the dialog (using the `useRef` reference) to update `isDialogOpen` state when the user closes the dialog.

### Show task details with a router

Add `react-router-dom` as a dependency. Clicking on a task should take you to another route that focuses on the task.
You can choose whether this page just displays the task description or if you want to add more info.

</details>

## Exercise 6:

<details>

### Implementing APIs with Hono

The goal of this exercise is to store the tasks on a server so all users see the same task list. It's helpful to
have completed [exercise 4](#exercise-4) before you start this exercise so you are familiar with React, but I
recommend starting the code from scratch for this exercise.

### Step-by-step instructions: Getting the client ready:

1. Create a new GitHub repository and open it in IntelliJ
2. [Create a basic React application](../README.md#creating-a-react-application) with vite (you should add
   prettier and husky as well, but I will leave them out of the description)
   1. `npm init -y`
   2. `npm i -D vite`
   3. `npm pkg set scripts.dev="vite"`
   4. Run the project with `npm run dev` (or `npx vite`)
   5. Add `index.html`
   6. Add `node_modules/` and `/.idea` to `.gitignore`
   7. Commit all files to Git and push to GitHub
3. Add React:
   1. `npm i react react-dom`
   2. Update `index.html` to have a `<div id="app"></div>` element and
      `<script src="src/main.jsx" type="module"></script>`
      (see [reference material](../README.md#minimal-indexhtml) for details)
   3. Create a minimal React Application (see
      [reference material](../README.md#minimal-srcmaintsx) for details)
   4. Commit and push the new files
4. Create a `<Application>` component to hold and render the task and use it in the
   `createRoot(...).render(<Application />)` statement:
   ```jsx
   function Application() {
     const [tasks, setTasks] = useState([
       { description: "Create project", completed: true },
       { description: "Create React webapp", completed: false },
       { description: "Create Hono backend", completed: false },
     ]);
     return (
       <>
         <h1>My Task Manager</h1>
         <ul>
           {tasks.map((t) => (
             <li>{t.description}</li>
           ))}
         </ul>
       </>
     );
   }
   ```
5. Commit and push your changes

### Step-by-step: Moving the state to the server

1. Move the loading of tasks to `useEffect`:

   ```jsx
   function Application() {
     const [tasks, setTasks] = useState([]);

     function loadTasks() {
       setTasks([
         { description: "Create project", completed: true },
         { description: "Create React webapp", completed: false },
         { description: "Create Hono backend", completed: false },
       ]);
     }

     useEffect(() => {
       loadTasks();
     }, []);
   }
   ```

2. Replace the loading of tasks with an API call. Notice that this will fail:
   ```js
   async function loadTasks() {
     const res = await fetch("/api/tasks");
     setTasks(await res.json());
   }
   ```
3. We now need to create the Hono server to answer `/api/tasks`
4. (You can commit at this point if you want to )

### Step-by-step: Create the server

For the full instructions, see the [reference materials](../README.md#creating-a-hono-application)

1. Create a subdirectory with the server:
   1. `mkdir server`
   2. `cd server`
   3. `npm init -y`
   4. WARNING: Unfortunately, this creates a problem in `server/package.json` that we need to
      fix with `npm pgk set type=module`
   5. `npm i hono @hono/http-server`
   6. `npm i -D nodemon`
   7. `npm pkg set scripts.dev="nodemon index.js"`
   8. Run `npm run dev` in the server directory to start the server
      - WARNING: This will crash at this point!
2. Implement `server/index.js` as a Hono server application:

   ```js
   import { Hono } from "hono";
   import { serve } from "@hono/node-server";

   const app = new Hono();
   serve(app);
   ```

3. Start the server by running `npm run dev` in the `server` directory and go to http://localhost:3000.
   At this time, this will return a 404 error
4. Fix the `server/index.js` to return the tasks
   ```js
   const tasks = [
     { description: "Create project (server)", completed: true },
     { description: "Create React webapp (server)", completed: true },
     { description: "Create Hono backend", completed: true },
     { description: "Update with Hono backend", completed: false },
   ];
   app.get("/api/tasks", (c) => {
     return c.json(tasks);
   });
   ```
5. Verify that it works on http://localhost:3000/api/tasks
6. Commit the changes to Git. MAKE SURE `server/node_modules` is Git-ignored

### Step-by-step: Use the server in the React application

1. The client code of `fetch("/api/tasks")` is correct, but this fetches from
   http://localhost:5173/api/tasks and not http://localhost:3000/api/tasks.
2. In order to make Vite forward API requests to Hono, we need to create a `vite.config.js`-file:

   ```js
   import { defineConfig } from "vite";

   export default defineConfig({
     server: {
       proxy: { "/api": "http://localhost:3000" },
     },
   });
   ```

3. You need to restart `vite` for it to understand that there is a new config file
4. You can verify the changes by going to http://localhost:5173/
5. Commit and push your changes

### Self-directed: Create tasks to be stored in Hono

1. In the front-end: Create a `<form>` element with a `<input>` and a `<button>` to add a new task and the React code
   to handle `<input onChange>` and `<form onSubmit>`
2. If you want, the form submit could first update the frontend state directly
3. Implement `handleSubmit` to call POST the new task to the server:
   `fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newTask) })`
4. In the server, create `app.post("/api/tasks")` to update the task collection:
   ```js
   app.post("/api/tasks", async (c) => {
     const task = await c.req.json();
     tasks.push(task);
     return c.newResponse(null, 201);
   });
   ```
5. In the client, you should call `loadTasks` after saving the new task to the server

### Self-directed: Update state

You probably want to be able to check tasks as done. The usual way of doing this is to use
use fetch to call `PUT /tasks/:taskId` with the id of the task in question.

In order to implement this, you have to make the following changes:

- The tasks should have unique ids created by the server
- The client should display check-boxes with the value of `Task.completed`
- The checkbox should have a `onChange` handler that calls fetch on the server:
  ```js
  async function handleCompleted(taskId, competed) {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }
  ```
- The server should update the task state in `app.put("/api/tasks/:taskId")`
- The client should refresh the task list after PUT-ing the new state

### Bonus challenge: Typescript

You should add Typescript to the application. For the server, this
requires you to replace `nodemon` with `tsx`. Try to put the definition
of `TaskItem` in a place where both the client and the server use the
same `.ts`-file.

It's easiest to do this by 1. adding typescript, 2. renaming `vite.config.{js => ts}`
and committing, 3. rename `src/main.{jsx => tsx}`, fix errors and commit,
and 4. rename `server/index.{js => ts}` fix scripts and commit. Then add
the `TaskItem` type and use it in the client and server.

</details>

## Exercise 7

<details open>

### Deploying your application to Heroku

The goals of this exercise is to have an application running on Heroku. It's best to have completed exercise 6 before
you start exercise 7, but I recommend starting exercise 7 with a new repository to maximize learning. We will create
as small of an application as possible. When you have deployed it, you can expand it with the functionality you
created in exercise 5 and 6.

### Step-by-step: Getting the client ready

1. Create a new GitHub repository and open it in IntelliJ
2. Create a basic Node project with Vite, Husky, Prettier, and Typescript
   1. `npm init -y`
   2. `npm pkg set type=module`
   3. `npm i -D husky prettier typescript vite`
   4. `npx tsc --init`
   5. `npx husky init`
   6. `npm pkg set scripts.test="tsc --noEmit && prettier --check ."`
   7. Create a `vite.config.ts` file to avoid `tsc` failing with no input files

   ```ts
   import { defineConfig } from "vite";

   export default defineConfig({});
   ```

3. Update `.gitignore` and commit
   1. `echo .idea/ > .gitignore`
   2. `echo node_modules/ >> .gitignore`
   3. Commit and push your project
4. Create a React application
   1. `npm i react react-dom`
   2. `npm i -D @types/react @types/react-dom`
   3. Create `index.html`
      ```html
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Task application</title>
        </head>
        <body>
          <div id="app"></div>
        </body>
        <script src="src/main.tsx" type="module"></script>
      </html>
      ```
   4. Create `src/main.tsx`:

      ```tsx
      import { createRoot } from "react-dom/client";
      import { Application } from "./application.js";
      import React from "react";

      export function Application() {
        return <h1>Task application</h1>;
      }

      createRoot(document.getElementById("app")!).render(<Application />);
      ```

   5. `npm pkg set scripts.dev=vite`
   6. Run `npm run dev` and click on the URL in the console to see your application running

### Step-by-step: Create a client component to fetch the tasks from the server

Make the task application fetch tasks from the server. This will not work until
the server is implemented:

```tsx
export function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "Create client", completed: true },
    { description: "Fetch from server", completed: false },
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
      <h1>Task application</h1>
      {tasks.map(({ description, complete }) => (
        <li>
          <input type="checkbox" checked={complete} /> {description}
        </li>
      ))}
    </>
  );
}
```

### Step-by-step: Implement the server:

Create the server `package.json` and the Hono server:

1. `mkdir server`
2. `cd server`
3. `npm init -y`
4. `npm i -D tsx`
5. `npm pkg set type=module`
6. `npm pkg set scripts.dev="tsx --watch index.ts"`
7. `npm i hono @hono/node-server`
8. Run `npm run dev` to start the server - this will crash until you make `index.ts`

Create `server/index.ts`:

```ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
const app = new Hono();
serve(app);
```

If you go to http://localhost:3000, you should now get a 404 as the server is
running but doesn't have any content.

Add a handler for `GET /api/tasks` in `index.ts`:

```ts
app.get("/api/tasks", (c) => {
  return c.json([
    { description: "Create client", completed: true },
    { description: "Fetch from server", completed: true },
    { description: "Deploy to Heroku", completed: false },
  ]);
});
```

If you go to http://localhost:3000/api/tasks, you should now see the JSON.

### Step-by-step: Integrate the client and the server

If you followed the instructions correctly, `<Application />` should load the
tasks with `fetch("/api/tasks")`. However, this fetches the tasks from
http://localhost:5173/api/tasks, not http://localhost:3000/api/tasks. During
development, we need to tell Vite to forward the requests to Hono.

Update `vite.config.ts` to forward the requests:

```ts
export default defineConfig({
  server: { proxy: { "/api": "http://localhost:3000" } },
});
```

If you go to http://localhost:5173 the tasks from the server should now be visible.

### Step-by-step: Create a Heroku app

In order to deploy to Heroku you need to register an account with [Heroku](https://heroku.com). Read through the
documentation about [Heroku for GitHub Students](https://www.heroku.com/github-students) so you understand how to avoid
cloud bills.

Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

You can create a Heroku app and push your code to it. However, this will fail as
our application hasn't set up a build and start script.

1. `heroku apps:create`
2. `git push heroku`
3. See if you can understand the error message that comes from Herok

### Step-by-step: Making your application deployable to Heroku

When Heroku sees that you have a `package.json`-file, it correctly assumes that
you have a JavaScript application. Heroku will perform the following steps:

- Run `npm install` to download your dependencies (notice: we need to work around
  some effects of Heroku running with the environment variable `NODE_ENV=production`)
- Run `npm run build` if there is a build script in your application
- Run `npm start` with the environment variable `PORT=...` set to the port
  Heroku wants your server to use (for us, this is Hono)
- If your application doesn't answer on the PORT within a certain timeout,
  Heroku will terminate it

This is what you need to do to set it up:

1. `npm install` needs to also install the server dependencies (`--include=dev` is a workaround for Heroku running with `NODE_ENV=production`)
   1. `npm pkg set scripts.postinstall="cd server && npm install --include=dev"`
2. `npm run build` needs to run Vite to build your React code which outputs to the `dist/` directory
   1. `npm pkg set scripts.build="vite build"`
   2. `echo dist >> .gitignore`
3. Hono needs to serve the code build by Vite in the previous step. Update `server/index.ts`

   ```ts
   import { serveStatic } from "@hono/node-server/serve-static";

   // ... the rest of the code goes here
   app.use("*", serveStatic({ root: "../dist" }));
   ```

4. Hono needs to use the port specified by Heroku
   1. change the line `serve(app)` in `server/index.ts` to the following
      ```ts
      const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
      serve({ fetch: app.fetch, port });
      ```
   2. In order to make typescript recognize the `process` variable, you
      need to add a dependency to `@types/node`:
   3. `npm i -D @types/node`
5. Heroku needs a `start` script
   1. `npm pkg set scripts.start="cd server && npm start"`
   2. `cd server`
   3. `npm pkg set scripts.start="tsx index.ts"`
6. `git commit`
7. `git push heroku`
8. Check that you didn't get any errors and try to open your app in the browser
9. `heroku apps:open`
10. If you got an error, run `heroku logs` to see if you can figure it out

### Additional tasks

1. Currently, the task items on the server and the client are not checked to be similar.
   Create a `TaskItem` interface in `shared/taskItem.ts` and use it from both the
   client and the server
2. You should be able to add new tasks. Follow the steps in [exercise 6](#exercise-6)
   to create the code on the client and the server. After you have developed and
   checked the functionality locally, deploy it to Heroku
3. The user should be able to check a task as done. Follow the instructions in
   exercise 6 to get it to work
4. In [exercise 5](#exercise-5) we introduced React Router. Implement the same
   functionality. If you use `<BrowserRouter />` refreshing the page on Heroku
   will return 404 (but `<HashRouter />`) will work. You will need a
   "catch-all" route with Hono that serves statically `../dist/index.html`.
   Can you figure it out?

</details>
