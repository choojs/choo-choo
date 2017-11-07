const express = require('express')
const browserify = require('browserify-middleware')
const getPort = require('get-port')
const path = require('path')
const log = require('./console')

function setup (mode, cb) {
  log.info(this.__('setup.starting'))
  
  // Start an Express server that serves the current directory, plus the
  // compiled bundle at /bundle.js
  this.server = express()
  this.server.use(express.static(process.cwd()))
  this.server.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))

  // Run the server on a random port that is then printed out to the console
  getPort().then(port => {
    this.bundleServerPort = port
    this.server.listen(port, () => {
      log.info(this.__('setup.started', {port: this.bundleServerPort}))
      if (mode !== 'run')
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
