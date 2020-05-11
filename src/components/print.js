import GL from './GL';

class Print {
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
    document.getElementById('printmap96').addEventListener('click', e => {
      e.stopPropagation()
      GL.printMap(96);
      GL.openPrintMap(false);
    })
    document.getElementById('printmap150').addEventListener('click', e => {
      e.stopPropagation()
      GL.printMap(150);
      GL.openPrintMap(false);
    })
    document.getElementById('printmap300').addEventListener('click', e => {
      e.stopPropagation()
      GL.printMap(300);
      GL.openPrintMap(false);
    })

    document.getElementById('openPrintmap').addEventListener('click', e => {
      e.stopPropagation()
      console.log('Open Print Map');
      GL.openPrintMap(true);
    })

    document.getElementById('mobilePrintmapClose').addEventListener('click', e => {
      e.stopPropagation()
      GL.openPrintMap(false);
    })
    document.getElementById('webPrintmapClose').addEventListener('click', e => {
      e.stopPropagation()
      GL.openPrintMap(false);
    })

    document.getElementById('modalBackground').addEventListener('click', e => {
      e.stopPropagation()
      GL.openPrintMap(false);
    })
    
    document.getElementById('mobilePrint').addEventListener('click', e => {
      e.stopPropagation()
      GL.openPrintMap(false);
      var radios = document.getElementsByName('resulationType');
      for(var i=0;i<radios.length;i++){
        if(radios[i].checked==true){
          var value = radios[i].value;
          value = parseInt(value,10);
          GL.printMap(value);
          break;
        }
      }
    })
  }

  setup() {
    this.$self = document.getElementById(this.wrapperID)
    this.__$btnToggler = document.getElementById('openPrintmap')
    this.attachEvents()
    return this
  }
}

export default Print
