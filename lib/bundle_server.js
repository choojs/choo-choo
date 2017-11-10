const express = require('express')
const browserify = require('browserify-middleware')
const getPort = require('get-port')
const path = require('path')
const log = require('./console')

function setup (mode, cb) {
  log.info(this.__('starting'))

  // Start an Express server that serves the current directory, plus the
  // compiled bundle at /bundle.js
  this.bundleServer = express()
  this.bundleServer.use(express.static(process.cwd()))
  this.bundleServer.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))

  // Run the server on a random port that is then printed out to the console
  getPort().then(port => {
    this.bundleServerPort = port
    this.bundleServer.listen(port, () => {
      log.info(this.__('started', {port: this.bundleServerPort}))
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
