const WA = require('workshopper-adventure')

const cc = WA({
  appDir: __dirname,
  languages: ['en'],
  header: require('./lib/header'),
  footer: require('./lib/footer')
})

cc.addAll([
  'a cute beginning',
  'countdown till noon'
])

module.exports = cc
