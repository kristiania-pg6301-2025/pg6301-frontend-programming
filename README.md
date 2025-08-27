# Deploying a TODO application to Heroku

## Creating the React application

1. `npm init -y`
2. `npm install -D husky prettier vite`
3. `npm pkg set scripts.test="prettier --check ."`
4. `npx husky init`
5. `npm install react react-dom`
6. `npm pkg set scripts.dev="vite"`

Run [Vite](https://vite.dev) with `npm run dev` and view your application at http://localhost:5173

## Creating the React application:

Create [index.html](./index.html) as a starting point with the React code living at [`src/main.jsx`](./src/main.jsx)

## Create the server

1. `mkdir server`
2. `cd server`
3. `npm init -y`
4. `npm install -D nodemon`
5. `npm install hono @hono/node-server`
6. `npm pkg set scripts.dev="nodemon server.js"`

## Creating the Hono application

The server code lives in [`server/server.js`](./server/server.js)

## Create Heroku application

1. Sign up to Heroku at https://heroku.com
   > NOTE: Notice that Heroku gives free applications with GitHub Education, but you have to register a credit card
2. Install the [Heroku Command Line Interface (CLI)](https://devcenter.heroku.com/articles/heroku-command-line)
3. `heroku app:create`
4. `git push heroku`

Heroku will not work as Heroku expects your application to be running from Git with the following commands: `npm install`, `npm run build` and then `npm start`

## Make your application ready for Heroku

We need to get the application to run from a clean slate.

1. Stop any node processes you're running
2. `git clean -xf node_modules server/node_modules` - this simulates starting from scratch

We now need to set up the build process:

1. `npm install`
2. `npm pkg set scripts.build="vite build"`
3. `npm run build`

You will now see the output in a new `dist/`. This should be added to `.gitignore`

We now need to make `npm start` work

1. `npm pkg set scripts.start="cd server && npm start"`
2. `npm pkg set scripts.postinstall="cd server && npm install"`
3. `npm install`
4. `npm start`

If you go to http://localhost:3000/api/tasks you will now see the tasks

But we still need to see the React application at http://localhost:3000
