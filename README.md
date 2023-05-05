# smartmat-frontend

This application is created by NTNU students as part of a SCRUM agile project. The applications main purpose is to reduce food waste by helping the user keep track of what food items they currently own. The app also tracks statistics about what items are producing the most food waste as well as letting the user keep a handy shopping list that multiple household members can contribute to.


Backend repo:
[SmartMat Backend](https://gitlab.stud.idi.ntnu.no/idatt2106-v23-10/smartmat-backend)




## Clone Repo

```sh
Frontend:
git clone git@gitlab.stud.idi.ntnu.no:idatt2106-v23-10/smartmat-frontend.git

Backend:
git clone git@gitlab.stud.idi.ntnu.no:idatt2106-v23-10/smartmat-backend.git

```

---
## Project Setup
To run the application, clone the repo and open the project folder. Run the following command.

```sh
npm install
```
You can now open a browser and navigate to localhost:5173
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
---
## Running tests

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
---
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
