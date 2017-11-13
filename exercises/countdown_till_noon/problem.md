Woo! You have your development environment all set up, so now we're ready to
give into Choo and how it works. Choo is an _event based_ framework, which
means that there's a big continous event loop that communicates with both
sender and recipient. It looks a bit like this:

```
          --------------
          |            |
--------> | Event Loop | ------>
 Emitters |            | Listeners
          --------------
```

Think of it as a big blackbox that takes messages from your code that say
"Hey, can you activate Event XYZ for me?", and redirects them to the
proper recipient, in this case, an bit of code that only fires on Event XYZ.

This is backed by a _global, mutable state_, which is an object that holds all
of the data your app cares about. In the example case of a memory card game
app, this would be which cards the player has gotten wrong or right, what the
player's score is, maybe a timer, and so forth. The state should only be
modified in the event listeners, which is why you would use the state in the
first place - to decouple it from your app's templates.

Speaking of templates, Choo uses JavaScript template strings, which are
essentially multiline strings that support variable interpolation. They look
like this:

```
const string = `
  this is a multiline string.

  1 plus 1 is: ${1 + 1}
`
```

Choo uses these for its HTML templates.

## The challenge

If you run `choo-choo run`, you will get a link in your console. If you paste
this link into a browser, you can see that there's a little example application
already set up for you! It's a simple counter that increases when you press the
big button. We'll use this to check when the button has been clicked exactly
five times, at which point we'll make the exercise pass.

The directory structure of your project is split into different parts:

```
├── assets -- stuff that should be served statically, e.g. image files and so on
├── views -- a view file returns html, takes the current state and can emit events
│   ├── 404.js -- used for any route that doesn't match
│   └── main.js -- used when we visit the root of our site
├── README.md -- useful for if you want to put your project on GitHub
├── index.js -- the main file
├── manifest.json -- irrelevant for now, useful for offline capabilities
├── package-lock.json -- lockfile for npm
├── package.json -- it's a package.json!
├── store.js -- contains all event listeners
└── sw.js -- used for service workers, irrelevant right now
```

The most interesting parts right now are the `views/` folder and the `store.js`
file. Views fire events, and they're being handled by the code in `store.js`.
So, you're going to have to modify the code in `store.js`, since code in there
gets called every time you press the button.

In order to pass this exercise, use the `verify` method provided by
`choo-choo`. First, require it, and then just call it with the app's state:

```js
var verify = require('choo-choo/verify')

// ...
verify(state)
// ...
```

Good luck!

(Tip: you just have to add one `if`-statement in the `store.js` file!)
