class Drawer {
  constructor({ wrapperID }) {
    this.__$btnToggler = undefined
    this.wrapperID = wrapperID
    this.$self = undefined
    this.data = {
      visible: false,
    }
  }

  toggleVisibility() {
    if (this.data.visible) {
      this.data.visible = false
      this.$self.classList.remove('active')
      this.__$btnToggler.classList.remove('hidden')
    } else {
      this.data.visible = true
      this.__$btnToggler.classList.add('hidden')
      this.$self.classList.add('active')
    }
  }

  setDrawerData(data) {
    if (!data) return

    const h1 = document.querySelector(`#${this.wrapperID} header h1`)
    h1.innerHTML = data.title
  }

  attachEvents() {
    document.getElementById('drawer-toggler').addEventListener('click', e => {
      e.stopPropagation()
      this.toggleVisibility()
    })

    document.getElementById('btnDrawerClose').addEventListener('click', e => {
      e.stopPropagation()
      this.toggleVisibility()
    })
  }

  init() {
    this.$self = document.getElementById(this.wrapperID)
    this.__$btnToggler = document.getElementById('drawer-toggler')
    this.attachEvents()
    return this
  }
}

export default Drawer
