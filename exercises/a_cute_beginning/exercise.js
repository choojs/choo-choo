let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const express = require('express')
const browserify = require('browserify-middleware')
const getPort = require('get-port')
const isHtml = require('is-html')
const got = require('got')
const path = require('path')
const log = require('../../lib/console')

exercise = filecheck(exercise)

exercise.addSetup(function (mode, cb) {
  log.info(this.__('setup.starting'))
  this.server = express()
  this.server.use(express.static(process.cwd()))
  this.server.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))
  getPort().then(port => {
    this.port = port
    this.server.listen(port, () => {
      log.info(this.__('setup.started', {port: this.port}))
      if (mode !== 'run')
        setTimeout(cb, 1000)
    })
  })
})

exercise.addVerifyProcessor(function (cb) {
  got(`http://localhost:${this.port}`).then(res => {
    log.pass(this.__('pass.response'))

    if (isHtml(res.body)) {
      log.pass(this.__('pass.content_ok'))
      cb()
    } else {
      log.fail(this.__('fail.not_html'))
      cb(new Error(this.__('fail.not_html')))
    }
  }).catch(err => {
    console.error(err)
  })
})

module.exports = exercise
