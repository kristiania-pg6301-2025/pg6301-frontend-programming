# PG6301 Web Development and API design - Exercises

## Exercise 1

<details>

Good programming is about getting frequent feedback from what you are working on, both from team members and from programming tools.

Test-driven development is a method where the tools help you take small, quick steps and validate the work along the way.

Pair programming is a normal way of working where two programmers sit at the same machine, screen, keyboard, and mouse, and solve the task together.

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

Programming tools allow you to collaborate safely and efficiently with other programmers. In this exercise, we will learn about GitHub Actions Workflows, Pull requests and Code reviews.

Make sure that you have followed Exercise 1 first, as Exercise 2 builds on what you learned before.

In this exercise, we will implement a program to calculate the scores of a [Yahtzee game](https://codingdojo.org/kata/Yahtzee/)

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

GitHub Actions makes GitHub run verification steps and perform other actions each time you push a new version of the code. This can save you lots of trouble down the line.

1. On your repository in GitHub, choose Actions
2. Here, you are presented with starting points for GitHub Actions. Type `node.js` into the search field and select the workflow with the same name among those that show up
3. When you commit this workflow, the Action will start running on GitHub. Make sure you get it to run to green

### Pull request

You should now continue on the Yahtzee task, but first, create a new branch.

1. In IntelliJ, click the branch name ("main") on the toolbar and select "New Branch..." from the menu. Give the branch the name `feature/score-threes`
2. Implement the test and push
3. In GitHub, go to "Pull requests" and create a new pull request based on `feature/score-threes`
4. The other programmer than the one who created the Pull request should review the Pull request on GitHub and make a few comments
5. Merge the pull requests
6. In IntelliJ, once you pull the main branch, you should see the Pull request as a branch in the Git Window

### Repeat to learn

Create a branch for `feature/score-pair`, implement scoring pair in Yahtzee with two tests with different pairs. Then create a Pull request, do a code review and merge

### Complete the task

Talk among yourselves and review what is a good approach going forward. You have implemented a few Yahtzee rules. Which ones would you do next? What changes are needed to the code? Which branches would you like to create?

In GitHub, go to Issues and create a New issue for the tasks you are planning to execute.

This is a good time to test out working in parallel. Assign one issue to each of the programmers in the pair, complete some Yahtzee rules and create a Pull request each. Review and merge each other's pull request.

## Exercise 3

<details>

### The React todo-application

The main running exercise of this course is the classic "TODO" application. This is a very common example, and you can see lots of examples using this online. The application lets to users create tasks and mark them as complete. In addition, we will be adding details to the tasks and give access to tasks to other users.

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

We need a logo for the course GitHub pages. Post your as a comment to [Course logo issue](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/issues/12) and vote with emojiis on other entries. Despite knowing better from experience, I will let the democratic process decide on the logo.

</details>
