const WA = require('workshopper-adventure')

const cc = WA({
  appDir: __dirname,
  languages: ['en'],
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer')
})

cc.addAll([
  'a cute beginning'
])

module.exports = cc
