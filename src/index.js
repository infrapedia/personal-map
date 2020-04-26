import App from './app'
import 'bootstrap';

if (typeof module.hot !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

function initApp() {
  new App({ wrapper: document.getElementById('app') }).init()
}

window.onload = (function () {
  return initApp
})()
