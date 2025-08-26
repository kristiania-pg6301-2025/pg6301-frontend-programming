# This lecture shows an episode of changes with pull requests with GitHub

In this lecture, we first write test to solve the roman numerals coding kata exercise from last week. We then implement localized application texts using Typescript with Continuous Integration and Pull Requests.

## Set up the project with Vitest and Typescript:

- `npm init -y`
- `npm install --save-dev prettier typescript husky vitest`
- `npx husk init`
- `npm pkg set scripts.test="prettier --check ."`
- `npx tsc --init`
- `npm pkg set scripts.test="tsc --noEmit && npx prettier --check ."`

## Setup `.github/workflows/node.js.yaml`

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: "npm"
      - run: npm ci
      - run: npm test
      - run: npx vitest --run

on:
  push:
    branches:
      - main
      - reference/*
      - lecture/*
```

## Pull requests

- [Implement general error](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/pull/2)
- [Implement serverError and invalidWeekday](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/pull/3)
- [Implement emailDomains](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/pull/4)
- [Implement emailDomains with multiple domains](https://github.com/kristiania-pg6301-2025/pg6301-frontend-programming/pull/6)
