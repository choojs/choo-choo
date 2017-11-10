module.exports = function (state) {
  window.fetch('http://localhost:8574/response', {
    method: 'POST',
    body: JSON.stringify(state),
    mode: 'no-cors'
  }).catch(err => {
    console.error(err)
  })
}
