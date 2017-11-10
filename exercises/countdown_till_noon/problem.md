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
first place - to decouple the state from your app's templates.

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

To get a feel of the basic components of a Choo app, you will build a simple
app that exposes a HTML button. After this button was clicked 5 times, you'll
send a verification request to the workshopper, which will verify that the
button was indeed clicked 5 times. You will store the amount the button was
clicked as a number in the global state, under the name `clicked`.

Here's a little help as to what a starter template could look like:

```
const choo = require('choo')
const html = require('choo/html')
const validate = require('choo-choo/validate')

const app = choo()

function indexView (state, emit) {
  return html`
    <body>
      Hello world!
    </body>
  `
}

app.route('/', indexView)
app.mount('body')
```

Let's go through this. First, we require the Choo framework and a helper that
lets us construct HTML from JS template strings, plus the validation function
you're going to use later on. We initialize our app, and define a function that
acts as a _view_. View functions are passed two arguments, the global state and
a function used to emit events. This function returns a string of HTML.

Then, we use the `app.route` function to add this view to a route, in our case,
the root route. Finally, we mount our entire app to the HTML body tag.

To make a button react to clicking, just attach a DOM event name as an attribute:

```
function onButtonClick () {
  // do some stuff
}

function view (state, emit) {
  return html`
    <body>
      <button onclick=${onButtonClick}>Test!</button>
    </body>
  `
}
```

In order to define global event listeners, you need to call `app.use`:

```
app.use(function (state, emitter) {
  emitter.on('my_event', function () {
    // do something cool
  })
})
```

`app.use` calls are the __only place__ where you can modify the state. You need
to call `validate` in an event listener. `validate` takes one argument, which is
the entire state of your application, meaning you'd call it like this:

```
const validate = require('choo-choo/validate')

// omit other stuff
validate(state)
// omit more stuff
```

## How to test your program

Running `choo-choo run yourFile.js` will run a server where your app will be
compiled and running. If you want to verify your solution, run
`choo-choo run verify yourFile.js`, then access the web server, click on your
button (5 times!) and hope that it works!
