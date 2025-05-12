
# Project Scripts Documentation

This document provides an explanation of all available npm/bun scripts in the project's package.json file, along with usage examples.

## Available Scripts

### `dev`

**Purpose**: Starts the development server with hot-reloading.

**Usage**:
```bash
npm run dev
# or
bun run dev
```

This will start the Vite development server, typically at http://localhost:8080. The server will automatically reload when you make changes to your code.

### `build`

**Purpose**: Creates an optimized production build of the application.

**Usage**:
```bash
npm run build
# or
bun run build
```

This script compiles the TypeScript code, bundles the application with Vite, and generates optimized assets in the `dist` directory.

### `lint`

**Purpose**: Runs ESLint to check for code quality issues.

**Usage**:
```bash
npm run lint
# or
bun run lint
```

This will analyze your code for potential errors, style issues, and best practices violations based on the ESLint configuration.

### `preview`

**Purpose**: Serves the production build locally to preview before deployment.

**Usage**:
```bash
npm run build  # First create a production build
npm run preview
# or
bun run build
bun run preview
```

This starts a local server to preview your production build, typically at http://localhost:4173.

### `test`

**Purpose**: Runs the test suite.

**Usage**:
```bash
npm run test
# or
bun run test
```

Executes tests using the configured test runner (e.g., Vitest).

### `coverage`

**Purpose**: Runs tests with coverage reporting.

**Usage**:
```bash
npm run coverage
# or
bun run coverage
```

Similar to the `test` script but generates a coverage report showing which parts of your code are covered by tests.

## Combining Scripts

You can run multiple scripts in sequence. For example, to lint, build, and preview:

```bash
npm run lint && npm run build && npm run preview
# or
bun run lint && bun run build && bun run preview
```

## CI/CD Integration

For continuous integration systems, you might want to run:

```bash
npm run lint && npm run test && npm run build
# or
bun run lint && bun run test && bun run build
```

This sequence ensures that your code passes linting, all tests are successful, and the build can be completed without errors.
