import mapConfig from '../config/mapConfig';

const mapboxgl = require('mapbox-gl');


class MainMap {
  constructor({ wrapper }) {
    this.wrapper = wrapper
    this.map = undefined
  }
  init() {
    mapboxgl.accessToken = mapConfig.accessToken

    this.map = new mapboxgl.Map({
      container: this.wrapper,
      zoom: mapConfig.zoom,
      center: mapConfig.center,
      style: mapConfig.style.default
    })

    return this.map
  }
}

export default MainMap
