let exercise = require('workshopper-exercise')()
const bundleServer = require('../../lib/bundle_server')
const resServer = require('../../lib/res_server')

exercise = bundleServer(exercise)

resServer(exercise, function (mode, cb) {
  this.resServer.post('/response', (req, res) => {
    res.end()
    if (req.body.totalClicks === 5 && mode === 'verify') {
      this.spinner.succeed(this.__('verification.ok'))
      cb()
    }
  })
})

module.exports = exercise
