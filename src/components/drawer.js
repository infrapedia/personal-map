import createElement from '../helpers/createElement'

class Drawer {
  constructor({ wrapper, visible, createElemnt }) {
    this.visible = visible
    this.wrapper = wrapper
    this.createElemnt = createElemnt
  }

  toggleVisibility() {
    this.visible
      ? this.wrapper.style.display = 'none'
      : this.wrapper.style.display = 'block'
  }

  init() {
    this.createElemnt(
      createElement('div', {
      class: 'drawer', style: { display: 'none' }
    }))
  }
}

export default Drawer
