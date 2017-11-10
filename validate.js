module.exports = function () {
  fetch('http://localhost:8574/response', {
    method: 'POST',
    body: JSON.stringify({
      passed: true
    }),
    mode: 'no-cors'
  }).catch(err => {
    console.error(err)
  })
}
