import createElement from './helpers/createElement'
import Map from './components/map'
import GL from './lib/GL';
import mylegend from './components/legend';
import myprintmap from './components/printmap';

class App {
  debugger;
  constructor({ wrapper }) {
    this.wrapper = wrapper
    this.map = undefined
    this.printmap = undefined;
  }

  createElemnt(el) {
    this.wrapper.appendChild(el)
    return el
  }

  initMap() {
    const id = 'map'
    let map

    this.createElemnt(createElement('div', { id }))
    map = new Map({ wrapper: id, layers: [] }).setup();
    return map
  }


  init() {
    this.map = this.initMap();
    mylegend.setup();
    myprintmap.setup();
    return this
  }
}

export default App
