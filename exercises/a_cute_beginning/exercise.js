let exercise = require('workshopper-exercise')()
const filecheck = require('workshopper-exercise/filecheck')
const express = require('express')
const browserify = require('browserify-middleware')
const path = require('path')

exercise = filecheck(exercise)

exercise.addSetup(function (mode, cb) {
  this.server = express()
  this.server.use(express.static(process.cwd()))
  this.server.use('/bundle.js', browserify(path.join(process.cwd(), this.args[0])))
  this.server.listen(8000, () => {
    console.log('up')
  })
})

module.exports = exercise
