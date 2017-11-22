const bankai = require('bankai/http')
const getPort = require('get-port')
const http = require('http')
const log = require('./console')

function setup (mode, cb) {
  // Start an Express server that serves the current directory, plus the
  // compiled bundle at /bundle.js
  const compiler = bankai(process.cwd(), { quiet: true })
  this.bundleServer = http.createServer((req, res) => {
    compiler(req, res, () => {
      res.statusCode = 404
      res.end('not found')
    })
  })

  // Run the server on a random port that is then printed out to the console
  getPort().then(port => {
    this.bundleServerPort = port
    this.bundleServer.listen(port, () => {
      const suffix = `${port}/?lang=${this.lang}`
      log.info(this.__('started', {suffix}))
      // Wait a second just so that it doesn't seem instantaneous
      setTimeout(cb, 1000)
    })
  })
}

function bundleServer (exercise) {
  // Set up the server before anything else runs
  exercise.addSetup(setup)
  return exercise
}

module.exports = bundleServer
