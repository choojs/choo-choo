const choo = require('choo')
const html = require('choo/html')
const verify = require('choo-choo/verify')

const app = choo()

app.use(function (state, emitter) {
  state.clicked = 0

  emitter.on('inc', function () {
    state.clicked += 1
    if (state.clicked === 5) {
      verify(state)
    }
  })
})

function indexView (state, emit) {
  function onClick () {
    emit('inc')
  }

  return html`
    <body>
      <button onclick=${onClick}>click me!</button>
    </body>
  `
}

app.route('/', indexView)
app.mount('body')
