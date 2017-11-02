const choo = require('choo')
const html = require('choo/html')

const app = choo()

app.route('/', () => {
  return html`
    <body>
      hello world!
    </body>
  `
})

app.mount('body')
