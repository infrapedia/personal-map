import GL from './GL';

class Drawer {
  constructor({ wrapperID }) {
    this.__$btnToggler = undefined
    this.wrapperID = wrapperID
    this.$self = undefined
    this.data = {
      visible: false,
    }
  }

  setData(data) {
    if (!data) return

  }

  attachEvents() {
    document.getElementById('openLegend').addEventListener('click', e => {
      e.stopPropagation()
      GL.openLegend(true);
    })

    document.getElementById('modalBackground').addEventListener('click', e => {
      e.stopPropagation()
      GL.openLegend(false);
    })

    document.getElementById('legendCloseButton').addEventListener('click', e => {
      e.stopPropagation()
      GL.openLegend(false);
    })
  }

  setup() {
    this.$self = document.getElementById(this.wrapperID)
    this.__$btnToggler = document.getElementById('openLegend')
    this.attachEvents()
    return this
  }
}

export default Drawer
