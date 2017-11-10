const express = require('express')
const bodyParser = require('body-parser')
const ora = require('ora')

function resServer (exercise, fn) {
  exercise.addSetup(function (mode, cb) {
    this.resServer = express()
    const phrase = mode === 'verify' ? 'setup.waiting_verification' : 'setup.running_verification'
    this.spinner = ora(this.__(phrase))
    this.resServer.use(bodyParser.json({
      type: 'text/plain'
    }))
    fn.bind(this)(mode, cb)
    this.resServer.listen(8574, () => {
      this.spinner.start()
    })
  })
}

module.exports = resServer
