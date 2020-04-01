import createElement from './helpers/createElement'
import Drawer from './components/drawer'
import Map from './components/map'

class App {
  constructor({ wrapper }) {
    this.drawer = undefined
    this.wrapper = wrapper
    this.map = undefined
  }

  createElemnt(el) {
    this.wrapper.appendChild(el)
    return el
  }

  initMap() {
    const id = 'map'
    let map

    this.createElemnt(createElement('div', { id }))
    map = new Map({ wrapper: id, layers: [] })
    map.loadAll()

    return map
  }

  initDrawer() {
    const wrapper = this.createElemnt(createElement('div', {
      class: 'drawer-wrapper',
      style: {
        position: 'absolute',
        left: '2rem',
        top: 0
      }
    }))

    const drawer = new Drawer({
      wrapper,
      visible: false,
      createElemnt: this.createElemnt
    })

    drawer.init()
    return drawer
  }

  init() {
    this.drawer = this.initDrawer()
    this.map = this.initMap()
    return this
  }
}

export default App
