# smartmat-frontend

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Contributing

The frontend is formatted with [Prettier](https://prettier.io/), and linted with [ESLint](https://eslint.org/), and the
backend is formatted with
Spotless. To ensure that your code is formatted correctly, you should ensure to format your code before committing. To
do this easily, you can add this
hook in your `.git/hooks/pre-commit` file:

For linux or mac:

```shell
#!/bin/bash

FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -n "$FILES" ]; then
    npm run lint
    npm run format
    git add $FILES
fi
``` 
