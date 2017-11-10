let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const isHtml = require('is-html')
const got = require('got')
const log = require('../../lib/console')
const bundleServer = require('../../lib/bundle_server')

// Check if the file passed in as argument exists...
exercise = filecheck(exercise)

// Set up our bundle serving server...
exercise = bundleServer(exercise)

// Add a processor that only runs on `choo-choo verify` that checks if the
// bundle server returns anything valid HTML, meaning that the directory has
// been successfully downloaded
exercise.addVerifyProcessor(function (cb) {
  got(`http://localhost:${this.bundleServerPort}`).then(res => {
    log.pass(this.__('response'))

    if (isHtml(res.body)) {
      log.pass(this.__('content_ok'))
      cb()
    } else {
      log.fail(this.__('not_html'))
      cb(new Error(this.__('not_html')))
    }
  }).catch(err => {
    console.error(err)
  })
})

// Don't exit when ran with `choo-choo run`
exercise.addRunProcessor(function (cb) {})

module.exports = exercise
