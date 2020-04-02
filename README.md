# Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)

# Folder structure

Below is the folder structure.

```
src
└── assets
      └── css
            └── main.css
│
└── helpers
├── index.js
└── app.js
public
├── favicon.ico
└── index.html
```

Add your styles to the `css` folder and use the `@import` to add to the [styles.css](assets/css/main.css) file.

Add your assets, such as images to the [assets](public/assets) folder.

The [index.js](src/index.js) is the main JavaScript file, import all libraries there.

Edit the [index.html](public/index.html) in the public folder to suite your needs.

Replace the [favicon.ico](public/favicon.ico) with your own icon.

# Configuration

You may change a few configuration for Webpack within the [config.js](config.js) file within the root folder (default settings below).

```
  const hostName = process.env.localhost
  const portNumber = process.env.port
  const jsOutput = './assets/js/bundle.js'
  const cssOutput = './assets/css/styles.css'
```

Changes to Webpack configurations may be made within the [config](config) folder.

# To Use

## Install dependencies

```sh
  yarn install
```

## Development

```sh
  yarn dev
```

This will create a server at `http://localhost:9000/` or at the port number specified in the [config.js](config.js) file.

## Build

```sh
  yarn build
```

## Test

For testing JavaScript this boilerplate uses Jest along with [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) for testing non-exported functions.

```sh
  yarn test
```

### Watch

```sh
  yarn test:watch
```

## Lint

### JavaScript

```sh
  yarn lint:js
```

### CSS

```sh
  yarn lint:css
```

### Fix

This will fix both JavaScript and CSS files.

```sh
  yarn lint:fix
```
