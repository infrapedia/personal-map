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
    map = new Map({ wrapper: id, layers: [] }).loadAll()

    return map
  }

  initDrawer() {
    const drawer = new Drawer({ wrapperID: 'Drawer' }).init()
    drawer.setDrawerData({ title: 'Testing' })
    return drawer
  }

  init() {
    this.drawer = this.initDrawer()
    this.map = this.initMap()
    return this
  }
}

export default App
