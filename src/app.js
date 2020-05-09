import Drawer from './components/drawer'
import Print from './components/print'
import Map from './components/map'

class App {
  constructor({ wrapper }) {
    this.drawer = undefined
    this.wrapper = wrapper
    this.map = undefined
    this.print = undefined
  }

  createElemnt(el) {
    this.wrapper.appendChild(el)
    return el
  }

  initMap() {
    const map = new Map({ layers: [] }).setup()
    return map
  }

  initDrawer() {
    const drawer = new Drawer({ wrapperID: 'Drawer' }).setup()
    drawer.setData({ title: 'Testing' })
    return drawer
  }

  initPrint() {
    const print = new Print({ wrapperID: 'Print' }).setup()
    print.setData({ title: 'Testing' })
    return print
  }

  init() {
    this.drawer = this.initDrawer()
    this.map = this.initMap()
    this.print = this.initPrint()
    return this
  }
}

export default App
