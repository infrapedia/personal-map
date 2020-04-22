
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import 'ionicons';
import download from 'downloadjs';
import MobileDetect from 'mobile-detect';
import App from './app';


if (typeof module.hot !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

function initApp() {
  new App({ wrapper: document.getElementById('app') }).init()
}

window.onload = (function () {
  /*setTimeout(() => {
    $('#loader').fadeToggle(250);
}, 700);*/
window.$=$;
window.jQuery=$;
window.download=download;
window.MobileDetect=MobileDetect;
  return initApp
})()
