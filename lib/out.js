const chalk = require('chalk')
const figures = require('figures')

module.exports = {
  pass (s) {
    console.log(chalk`{green ${figures.tick} ${s}}`)
  },
  info (s) {
    console.log(chalk`{yellow ${figures.ellipsis} ${s}}`)
  },
  error (s) {
    console.log(chalk`{red ${figures.cross} ${s}}`)
  }
}
