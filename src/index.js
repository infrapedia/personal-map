import './assets/main.css'
import 'normalize.css'
import App from './app'

if (typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

function initApp() {
  const app = new App({ wrapper: document.getElementById('app') })
  app.init()
}

window.onload = (function () {
  return initApp()
}())
