# React assignment

## Start

`yarn && yarn start`

## Implementation

- The task was made with minimum usage of external libraries to reduce setup time
- Dashboard designed in order to be able easily maintain the amount of applicant states(columns) and to reduce the amount of iterations while operating with an array of applicants.
- Code quality checks are performed with `linter` and `prettier` via IDE file watchers.
- Main components
    - Page layout `<App />`
    - `<Dashboard* />` components which contains all dashboard logic splitted between separate small components
- With help of `enzyme` and `jest` I achieved 100% coverage of all components. Run `yarn test --coverage` to check.
- Added `flow` types.     

### Constraints

- do not use any boilerplate code or create-react-app
- do not leave any unused dependencies or scripts
- do not copy API response to your repository

### Evaluation points

- use of clean code which is self documenting
- use of domain driven design
- tests for business logic
- use of code quality checkers such as linters and build tools
- use of git with appropriate commit messages
- documentation: README and inline code comments