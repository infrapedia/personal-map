import mapConfig from '../config/mapConfig'
import GL from './GL'

const mapboxgl = require('mapbox-gl')

class MainMap {
  constructor({ wrapper, layers }) {
    this.wrapper = wrapper || 'map'
    this.layers = layers || []
    this.map = undefined
  }

  setup() {
    return this.initMapLayers(this.initMap())
  }

  initMap() {
    mapboxgl.accessToken = mapConfig.accessToken

    const map = new mapboxgl.Map({
      container: this.wrapper,
      zoom: mapConfig.zoom,
      center: mapConfig.center,
      style: mapConfig.style.default,
    })

    this.map = map
    window.custom_map = map
    return map
  }
  /**
   * @param map { Object } map instance
   */
  initMapLayers(map) {
    let vm = this
    map.on('load', function () {
      GL.loading(false)
      GL.setMap(map)
      GL.addControls()
      GL.addSource()
      GL.addLayers()
      vm.addMapSources(map)
    })
    return map
  }
  /**
   * @param map { Object } map instance
   */
  addMapSources(map) {
    for (let source of mapConfig.data.sources) {
      map.addSource(source.id, source.name)
    }
    this.addMapLayers(map)
  }
  /**
   * @param map { Object } map instance
   */
  addMapLayers(map) {
    for (let layer of this.layers) {
      map.addLayer(layer)
    }
  }
}

export default MainMap
