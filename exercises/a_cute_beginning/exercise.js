let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const express = require('express')
const browserify = require('browserify-middleware')
const getPort = require('get-port')
const isHtml = require('is-html')
const got = require('got')
const path = require('path')
const out = require('../../lib/out')

exercise = filecheck(exercise)

exercise.addSetup(function (mode, cb) {
  out.info(this.__('setup.starting'))
  this.server = express()
  this.server.use(express.static(process.cwd()))
  this.server.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))
  getPort().then(port => {
    this.port = port
    this.server.listen(port, () => {
      out.info(this.__('setup.started', {port: this.port}))
      setTimeout(cb, 1000)
    })
  })
})

exercise.addProcessor(function (mode, cb) {
  got(`http://localhost:${this.port}`).then(res => {
    out.pass(this.__('pass.response'))
    if (isHtml(res.body)) {
      out.pass(this.__('pass.content_ok'))
      cb()
    } else {
      out.error(this.__('fail.not_html'))
      cb(new Error(this.__('fail.not_html')))
    }
  })
})

module.exports = exercise
