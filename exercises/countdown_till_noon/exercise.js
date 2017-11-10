let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const log = require('../../lib/console')
const bundleServer = require('../../lib/bundle_server')
const resServer = require('../../lib/res_server')

exercise = filecheck(exercise)

exercise = bundleServer(exercise)

resServer(exercise, function (cb) {
  this.resServer.post('/response', (req, res) => {
    res.end()
    if (req.body.passed === true) {
      this.spinner.succeed(this.__('pass.verification_ok'))
      cb()
    }
  })
})

module.exports = exercise
