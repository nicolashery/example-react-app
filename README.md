## Example React App

Exploring ways to organize an app built with [React](http://facebook.github.io/react).

## Tech stack

App:

- [React](http://facebook.github.io/react)
- [Fluxy](https://github.com/jmreidy/fluxy) ([Flux](http://facebook.github.io/react/docs/flux-overview.html) framework)
- [Mori](http://swannodette.github.io/mori/) (immutable data)
- [Bluebird](https://github.com/petkaantonov/bluebird/) (promises)

Development:

- [Webpack](http://webpack.github.io/docs/) (bundler)
- [Sweet.js](http://sweetjs.org/) (macros for JavaScript)
- [jsx-reader](https://github.com/jlongster/jsx-reader) (use JSX with Sweet.js)
- [es6-macros](https://github.com/jlongster/es6-macros) (use ES6 with Sweet.js)

## Quick start

Clone this repo and install dependencies:

```bash
$ npm install
```

Start development server with:

```bash
$ npm start
```

Point your browser to `http://localhost:8080`.

## Development

### Debugging

Enable the app's debug output by typing `$debug.enable('*')` in the browser's console and refreshing the page.
