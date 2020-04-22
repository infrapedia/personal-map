Vue.component('printmap', {
  data: function () {
    return this.setDefault();
  },
  methods: {
    setDefault: function () {
      return {
        onoff: true,
        isOpen:false,
        types:[
          {
            id:'dpi96',
            title:'Low Resolution 96 dpi',
            img:'https://gislayer.com/assets/map96dpi.png',
            dpi:96
          },
          {
            id:'dpi150',
            title:'Normal Resolution 150 dpi',
            img:'https://gislayer.com/assets/map150dpi.png',
            dpi:150
          },
          {
            id:'dpi300',
            title:'High Resolution 300 dpi',
            img:'https://gislayer.com/assets/map300dpi.png',
            dpi:300
          }
        ]
      }
    },
    open: function () {
      debugger;
      var md = new MobileDetect(window.navigator.userAgent,600);
      if(md.phone()==null){
        $('#exampleModal').modal('show');
      }else{
        //for mobile
        $('#mobilePrintmap').modal('show');
      }

      this.isOpen=true;
    },
    close: function () {
      this.isOpen=false;
      $("#sidebarPanel").modal('hide');
      $('#exampleModal').modal('hide');
    },
    print:function(dpi){
      debugger;
      GL.printMap(dpi);
      this.close();
    }
  },
  template: '<div v-if="onoff">'+
  '<div id="bottomRightButtons"><button @click="open" id="printmap" class="btn btn-success mr-1 mb-1 btn-sm">Print Map</button></div>'+
  
  //modal for pc
  '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
  '<div class="modal-dialog modal-lg" role="document">'+
  '<div class="modal-content">'+
  '<div class="modal-header bg-info">'+
  '<h4 style="color:#fff;" class="modal-title" id="exampleModalLabel">Print Map Panel</h4>'+
  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
  '<ion-icon name="close"></ion-icon>'+
  '</button>'+
  '</div>'+

  '<div class="modal-body">'+
  '<div class="row">'+
  '<div v-for="item in types" class="col-4">'+
    '<div class="card">'+
    '<div class="card-header">{{item.title}}</div>'+
    '<div class="card-body" style="padding: 0 !important;">'+
      '<img style="border-radius: 0px !important; width: 100%;" :src="item.img" class="card-img-top" alt="image">'+
    '</div>'+
    '<div class="card-footer" style="padding: 0 !important; border: none;">'+
      '<button type="button" @click="print(item.dpi)" class="btn btn-success square btn-block">Download</button>'+
    '</div>'+
    '</div>'+
  '</div>'+
  '</div>'+
  '</div>'+

  '</div>'+
  '</div>'+
  '</div>'+
  //modal for pc

  //modal for mobile
  '<div class="modal fade modalbox" id="mobilePrintmap" tabindex="-1" role="dialog">'+
    '<div class="modal-dialog" role="document">'+
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<h5 class="modal-title">Print Map Panel</h5>'+
          '<a href="javascript:;" style="color:#8bc34a;" data-dismiss="modal">Close</a>'+
        '</div>'+
        '<div class="modal-body">'+
          '<div class="row">'+
            '<div v-for="item in types" class="col-12">'+
              '<div class="card">'+
              '<div class="card-header">{{item.title}}</div>'+
              '<div class="card-body" style="padding: 0 !important;">'+
                '<img style="border-radius: 0px !important; width: 100%;" :src="item.img" class="card-img-top" alt="image">'+
              '</div>'+
              '<div class="card-footer" style="padding: 0 !important; border: none;">'+
                '<button type="button"  @click="print(item.dpi)" class="btn btn-success square btn-block">Download</button>'+
              '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+

        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
  //modal for mobile

  '</div>'
});

var printmap = {
  companent: null,
  setup: function () {
    this.companent = new Vue({
      el: '#myprintmap'
    });
  }
};

export default printmap;
