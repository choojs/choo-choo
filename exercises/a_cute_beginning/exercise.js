let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const isHtml = require('is-html')
const got = require('got')
const log = require('../../lib/console')
const bundleServer = require('../../lib/bundleServer')

exercise = filecheck(exercise)
exercise = bundleServer(exercise)

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
