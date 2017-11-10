let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const express = require('express')
const bodyParser = require('body-parser')
const ora = require('ora')
const log = require('../../lib/console')
const bundleServer = require('../../lib/bundleServer')

exercise = filecheck(exercise)

exercise = bundleServer(exercise)

exercise.addSetup(function (mode, cb) {
  this.resServer = express()
  this.spinner = ora(this.__('setup.waiting_verification'))
  this.resServer.use(bodyParser.json({
    type: 'text/plain'
  }))
  this.resServer.post('/response', (req, res) => {
    res.end()
    if (req.body.passed === true) {
      this.spinner.succeed(this.__('pass.verification_ok'))
      cb()
    }
  })
  this.resServer.listen(8574, () => {
    this.spinner.start()
  })
})

module.exports = exercise
