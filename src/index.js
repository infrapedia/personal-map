import './assets/main.css'
import 'normalize.css'

if (typeof(module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}


function createMapWrapper(id) {
  const div = document.createElement('div')
  div.setAttribute('id', id)

  document.getElementById('app').appendChild(div)
}

function InitApp() {
  const MapViewer = require('./components/map').default
  const mapContainerID = 'map'

  createMapWrapper(mapContainerID)
  const map = new MapViewer({ wrapper: mapContainerID })
  map.init()
  console.log(map)
}

window.onload = (function () {
  return InitApp()
}())
