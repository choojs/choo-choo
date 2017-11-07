const express = require('express')
const browserify = require('browserify-middleware')
const getPort = require('get-port')
const path = require('path')
const log = require('./console')

function setup (mode, cb) {
  log.info(this.__('setup.starting'))
  this.server = express()
  this.server.use(express.static(process.cwd()))
  this.server.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))
  getPort().then(port => {
    this.bundleServerPort = port
    this.server.listen(port, () => {
      log.info(this.__('setup.started', {port: this.bundleServerPort}))
      if (mode !== 'run')
        setTimeout(cb, 1000)
    })
  })
}

function bundleServer (exercise) {
  exercise.addSetup(setup)
  return exercise
}

module.exports = bundleServer
