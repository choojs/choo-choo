const express = require('express')
const bodyParser = require('body-parser')
const ora = require('ora')

function resServer (exercise, fn) {
  exercise.addSetup(function (mode, cb) {
    this.resServer = express()
    this.spinner = ora(this.__('setup.waiting_verification'))
    this.resServer.use(bodyParser.json({
      type: 'text/plain'
    }))
    fn.bind(this)(cb)
    this.resServer.listen(8574, () => {
      this.spinner.start()
    })
  })
}

module.exports = resServer
