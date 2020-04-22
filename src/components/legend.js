Vue.component('mylegend', {
  data: function () {
    return this.setDefault();
  },
  methods: {
    setDefault: function () {
      return {
        onoff: true,
        isOpen:false,
        width1:{width:'400px'},
        list:{
          cable:{
            label:'Cables',
            icon:'analytics-outline',
            isOpen:false,
            layers:[
              {id:'cables',active:true,classType:'line',color:GL.colorPalette.facility,name:'Cables'}
            ]
          },
          cls:{
            label:'CLS Points',
            icon:'radio-button-on-outline',
            isOpen:false,
            layers:[
              {id:'cls',active:true,classType:'point',color:GL.colorPalette.cls,name:'CLS Points'}
            ]
          },
          ixps:{
            label:'IXPS Points',
            icon:'stop-circle-outline',
            isOpen:false,
            layers:[
              {id:'ixps',active:true,classType:'point',color:GL.colorPalette.ixps,name:'IXPS Points'}
            ]
          },
          draw:{
            label:'Custom Drawns',
            icon:'pencil-outline',
            isOpen:false,
            layers:[
              {id:'drawPoint',active:true,classType:'point',color:GL.colorPalette.default,name:'Drawn Points'},
              {id:'drawLine',active:true,classType:'line',color:GL.colorPalette.facility,name:'Drawn Cables'}
            ]
          },
          facility:{
            label:'Facility Buildings',
            icon:'business-outline',
            isOpen:false,
            layers:[
              {id:'facility',active:true,classType:'polygon',color:GL.colorPalette.facility,name:'Facility Buildings'}
            ]
          }
        }
      }
    },
    open: function () {
      var md = new MobileDetect(window.navigator.userAgent,600);
      if(md.phone()==null){
        this.width1.width='400px';
      }else{
        if(window.screen.width<=390){
          this.width1.width=window.screen.width+'px !important';
        }
      }
      
      $("#sidebarPanel").modal({
        backdrop: false,
        keyboard: false
    });
      this.isOpen=true;
    },
    close: function () {
      this.isOpen=false;
      $("#sidebarPanel").modal('hide');
    },
    setVisible:function(layer){
      layer.active=!layer.active
      if(layer.active){
        GL.map.setLayoutProperty(layer.id, 'visibility', 'visible');
        GL.map.setLayoutProperty(layer.id+'-label', 'visibility', 'visible');
      }else{
        GL.map.setLayoutProperty(layer.id, 'visibility', 'none');
        GL.map.setLayoutProperty(layer.id+'-label', 'visibility', 'none');
      }
      
    }
  },
  template: '<div v-if="onoff">'+
  '<div id="topLeftButtons"><button @click="open" id="legend" class="btn btn-info ml-1 mt-1 btn-sm">Legend</button></div>'+
  '<div class="modal fade panelbox panelbox-left" id="sidebarPanel" tabindex="-1" role="dialog" :style="width1">'+
  '<div class="modal-dialog" role="document">'+
  '<div class="modal-content" :style="width1">'+
  '<div class="modal-body p-0">'+

  //logo & companyname
'<div class="profileBox">'+

'<div class="image-wrapper">'+
'<img src="https://ml.globenewswire.com/Resource/Download/3aa5711b-ec4f-471e-8c56-cd0403c128c2?size=2" alt="image" class="imaged rounded">'+
'</div>'+
'<div class="in">'+
'<strong>SEABORN</strong>'+
'<div class="text-muted">'+
'Custom Map Legend'+
'</div>'+
'</div>'+
'<a href="#" @click="close" class="close-sidebar-button" data-dismiss="modal">'+
'<ion-icon name="close"></ion-icon>'+
'</a>'+
'</div>'+
//logo & companyname

//acerdeon
'<div v-for="(item,id) in list" class="accordion">'+
  '<div class="item">'+
    '<div class="accordion-header">'+
      '<button @click="item.isOpen = !item.isOpen" class="btn collapsed" type="button">'+
      ' <ion-icon :name="item.icon"></ion-icon> {{item.label}}</button>'+
    '</div>'+
    '<div :class="item.isOpen==false?\'accordion-body collapse\':\'accordion-body collapse show\'">'+
      '<div class="accordion-content" style="padding: 0; padding-left: 20px;">'+

      '<div v-for="layer in item.layers" class="legbg" @click="setVisible(layer);">'+
        '<div :class="layer.classType" :style="{backgroundColor:layer.color}"></div>'+
        '<div :class="layer.active==true?\'legendFont\':\'legendFontPassive\'">{{layer.name}}</div>'+
      '</div>'+

      '</div>'+
    '</div>'+
  '</div>'+
'</div>'+


  '</div>'+
  '</div>'+
  '</div>'+
  '</div>'+
  '</div>'
});

var legend = {
  companent: null,
  setup: function () {
    this.companent = new Vue({
      el: '#mylegend'
    });
  }
};

export default legend;
