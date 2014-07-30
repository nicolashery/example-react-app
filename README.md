## Example React App

Exploring ways to organize an app built with [React](http://facebook.github.io/react).

## Tech stack

App:

- [React](http://facebook.github.io/react) (rendering engine)
- [Fluxy](https://github.com/jmreidy/fluxy) ([Flux](http://facebook.github.io/react/docs/flux-overview.html) architecture for data flow)
- [Mori](http://swannodette.github.io/mori/) (immutable data and functional programming)
- [Bluebird](https://github.com/petkaantonov/bluebird/) (promises for async things)
- [fn.js](http://eliperelman.com/fn.js/) (functional programming for plain JavaScript)

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

## Organization

`components/`: Re-usable React components, the building blocks of the application (ex: buttons, inputs, list items, etc.). They have no state (except on rare occasions), and props are plain JavaScript types and objects.

`controllers/`: Any React component that needs to interact with Flux actions or stores go here. Their state is usually synced with one or more stores, and contains Mori data structures (which they can use to optimize when they should re-render).

`layouts/`: React components whose sole purpose is to organize the position of application elements on the page, using "regions" (ex: header, content, footer, modal, etc.). Each region is usually a prop that expects a React "renderable".

`routes/`: Contains React components called "pages", that are matched to a route in `table.js`. Pages use layouts and controllers to render a full page. Anything else that concerns routing is found here, like `setup.js` for the router, and `nav.js` for the main navbar.

`<domain>/`: Flux actions and stores, as well as corresponding "services" (ex: talking to an HTTP API, interacting with the browser's URL hash, etc.), are grouped in "domain" folders (ex: `user/`, `router`/, etc.).

`App.js`: Top-level React component. Responds to a route change by rendering the appropriate page according to the routing table.

`init.js`: Anything that needs to happen before the app is actually started goes in this async function (ex: checking the validity of an auth token stored locally).

`index.js`: Main entry point. Sets up and starts and services, calls the `init` function, and when it's done renders the `App` component to the DOM.

## Development

### Debugging

To enable logging, set `localStorage.debug = true` in the browser's console and refresh the page.
