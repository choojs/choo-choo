var success = {
  en: 'Congrats! You passed this exercise!'
}

module.exports = function (state) {
  window.fetch('http://localhost:8574/response', {
    method: 'POST',
    body: JSON.stringify(state),
    mode: 'no-cors'
  }).then(res => {
    const div = document.createElement('div')
    div.classList.add('w-100', 'bg-light-green', 'green', 'pv3', 'tc')
    div.innerHTML = success[state.query.lang || 'en']
    document.body.prepend(div)
  })
}
