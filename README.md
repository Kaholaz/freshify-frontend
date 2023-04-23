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

### Setup
The frontend is formatted with [Prettier](https://prettier.io/), and linted with [ESLint](https://eslint.org/). To ensure
correct formatting and linting, you should add the pre-commit file (found in the root of this repository) to your .git/hooks/
folder after cloning this repository.

### Mocking an api
To mock the api, you may use the prism. To install prism, run the following command:
```shell
npm install -g @stoplight/prism-cli
``` 

Prism needs a swagger file to mock the api. This can be found in the 
[backend repository](https://gitlab.stud.idi.ntnu.no/idatt2106-v23-10/smartmat-backend/-/blob/dev/docs/swagger.yaml).

To start the mock server, run:
```shell
prism mock swagger.yaml
```
