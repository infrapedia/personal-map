var GL = {
  dpi : 96,
  subdomain:'',
  darkMode:false,
  devicePixelRatio:1,
};

window.GL = GL;

GL.colorPalette={
  cls:'#f44336',
  ixps:'#8bc34a',
  default:'#efefef',
  facility:'#666666'
};

GL.splitHostname = function() {
  var hostname = window.location.hostname;
  if(hostname.indexOf('www.')!==-1){
    hostname = hostname.replace('www.','');
  }
  var parts = hostname.split('.');
    if(parts.length==3){
      return parts[0];
    }else{
      return 'alikilic';
    }
}

GL.setMap = function(map){

  Object.defineProperty(window, 'devicePixelRatio', {
    get: function() {return GL.devicePixelRatio}
  });
  GL.subdomain = GL.splitHostname();
  GL.map=map;
  GL.popup = new mapboxgl.Popup({closeOnClick: false});
}

GL.addControls = function(){
  GL.map.addControl(new mapboxgl.NavigationControl());
}


GL.styleMaker = {
  line:function(sourceId,layerId,obj){
    var obj2 = {};
    obj.map(function(columnName){
      switch(columnName){
        case 'stroke':{
          obj2['line-color'] = ['get', columnName];
          break;
        }
        case 'stroke-width':{
          obj2['line-width'] = ['get', columnName];
          break;
        }
        case 'stroke-opacity':{
          obj2['line-opacity'] = ['get', columnName];
          break;
        }
      }
    });
    return {
      id:layerId,
      type: 'line',
      source:sourceId,
      paint:obj2
    }
  },
  threeD:function(sourceId,layerId,obj){
    var obj2 = {
      id: layerId,
      type: 'fill-extrusion',
      source: sourceId,
      layout: {},
      paint: {
        'fill-extrusion-color': '#666666',
        'fill-extrusion-height': 25,
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 1
      }
    };
    return obj2
  },
  default:function(type,sourceId,layerId){
    switch(type){
      case 'line':{
        return {
          id:layerId,
          type: 'line',
          source:sourceId,
          paint:{
            'line-opacity': 1,
            'line-color':'#607d8b',
            'line-width': 5
          },
          filter: ['==', '$type', 'LineString']
        }
        break;
      }
      case 'fill':{
        return {
          id:layerId,
          type: 'fill',
          source:sourceId,
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4
            },
          filter: ['==', '$type', 'Polygon']
        }
        break;
      }
      case 'circle':{
        
        return {
          'id': layerId,
          'type': 'circle',
          'source': sourceId,
          'paint': {
            'circle-radius': 5,
            'circle-color': ['case',
            ['==', ['get', 'type'], 'cls'],GL.colorPalette.cls,
            ['==', ['get', 'type'], 'ixps'],GL.colorPalette.ixps,
            GL.colorPalette.default],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#333333'
          },
          filter: ['==', '$type', 'Point']
        }
          
        
      }
    }
  },
  label:function(type,id,source,columnName){
    switch(type){
      case 'line':{
        return {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{'+columnName+'}',
            'symbol-placement': 'line',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.1]
          },
          paint: {
            'text-color': '#485E69'
          },
          filter: ['==', '$type', 'LineString']
        }
        break;
      }
      case 'circle':{
        return {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{'+columnName+'}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.3]
          },
          paint: {
            'text-color': '#485E69'
          },
          filter: ['==', '$type', 'Point']
        }
        break;
      }
      case '3D':{
        return {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{'+columnName+'}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.1]
          },
          paint: {
            'text-color': '#FFFFFF'
          }
        }
        break;
      }
    }
    
  }
};

GL.addSource = function(){

  GL.mapSource = {
    cable:{
      id:'cable',
      status:true,
      source:'https://storage.googleapis.com/infrapediacom/clients/'+GL.subdomain+'_cables.geojson',
      layers:['cables'],
      label:{
        cables:{
          status:true,
          columnName:'nameCable'
        }
      },
      paint:{
        cables:{
          type:'line',
          status:true,
          columns:["stroke","stroke-width","stroke-opacity"]
        }
      }
    },
    cls:{
      id:'cls',
      status:true,
      source:'https://storage.googleapis.com/infrapediacom/clients/'+GL.subdomain+'_cls.geojson',
      layers:['cls'],
      label:{
        cls:{
          status:true,
          columnName:'name'
        }
      },
      paint:{
        cls:{
          type:'circle',
          status:true,
          columns:[]
        }
      }
    },
    draw:{
      id:'draw',
      status:true,
      source:'https://storage.googleapis.com/infrapediacom/clients/'+GL.subdomain+'_draw.geojson',
      layers:['drawLine','drawPoint'],
      label:{
        drawLine:{
          status:true,
          columnName:'name'
        },
        drawPoint:{
          status:true,
          columnName:'name'
        }
      },
      paint:{
        drawPoint:{
          type:'circle',
          status:true,
          columns:[]
        },
        drawLine:{
          type:'line',
          status:true,
          columns:["stroke","stroke-width","stroke-opacity"]
        }
      }
    },
    facilities:{
      id:'facilities',
      status:true,
      source:'https://storage.googleapis.com/infrapediacom/clients/'+GL.subdomain+'_facilities.geojson',
      layers:['facility'],
      label:{
        facility:{
          status:true,
          columnName:'name'
        }
      },
      paint:{
        facility:{
          type:'3D',
          status:true,
          columns:[]
        }
      }
    },
    ixps:{
      id:'ixps',
      status:true,
      source:'https://storage.googleapis.com/infrapediacom/clients/'+GL.subdomain+'_ixps.geojson',
      layers:['ixps'],
      label:{
        ixps:{
          status:true,
          columnName:'name'
        }
      },
      paint:{
        ixps:{
          type:'circle',
          status:true,
          columns:[]
        }
      }
    }
  };

}

GL.addLayers = function(){
    for(var i in GL.mapSource){
      var source = GL.mapSource[i];
      if(source.status){
        GL.map.addSource(source.id, {
          type: 'geojson',
          data: source.source
        });
  
        var layers = source.layers;
        layers.map(function(layerName){
  
          if(typeof source.paint[layerName]!=="undefined"){
            var obj = {};
            var paint = source.paint[layerName];
            var layerStyle = {};
            if(paint.status){
              switch(paint.type){
                case 'line':{
                  layerStyle = GL.styleMaker.line(source.id,layerName,paint.columns);
                  break;
                }
                case 'circle':{
                  layerStyle = GL.styleMaker.default(paint.type,source.id,layerName);
                  break;
                }
                case '3D':{
                  layerStyle = GL.styleMaker.threeD(source.id,layerName,paint.columns);
                  break;
                }
              }
            }else{
              layerStyle = GL.styleMaker.default(paint.type,source.id,layerName);
            }
            GL.map.addLayer(layerStyle);

            GL.map.on('mousemove', layerStyle.id, function(e) {
              GL.map.getCanvas().style.cursor = 'pointer';
              if (e.features.length) {
                var html ="<b>"+e.features[0].properties.name+"</b>";
                GL.map.getCanvas().style.cursor = 'pointer';
                GL.popup.setHTML(html);
                GL.popup.setLngLat(e.lngLat);
                GL.popup.addTo(GL.map);
              }
            });

            GL.map.on('mouseleave', layerStyle.id, function(e) {
              GL.map.getCanvas().style.cursor = '';
              GL.popup.remove();
            });

            GL.map.on('click', layerStyle.id, function(e) {
              GL.setColor(layerStyle);
            });

          }
  
          if(typeof source.label[layerName]!=="undefined"){
            var label = source.label[layerName];
            if(label.status){
              var style = GL.styleMaker.label(paint.type,layerName+'-label',source.id,label.columnName);
              GL.map.addLayer(style);
            }
          }
  
        });
        //GL.legend.change();
      }
      
    }
    $('#loader').fadeToggle(250);
}

GL.getDate=function(){
  var date = new Date(); //date
  var day=date.getDate(); //day
  if(day<10){day="0"+day;}
  var month=date.getMonth()+1; //month
  if(month<10){month="0"+month;}
  var year=date.getFullYear(); //year

  var hours=date.getHours(); //hours
  if(hours<10){hours="0"+hours;}
  var min=date.getMinutes(); //min
  if(min<10){min="0"+min;}
  var sec=date.getSeconds(); //sec
  if(sec<10){sec="0"+sec;}
  var fulldate=day+'.'+month+'.'+year+' '+hours+':'+min+':'+sec;
  return fulldate;
}


GL.createVirtualCanvas = function(dpi){
  Object.defineProperty(window, 'devicePixelRatio', {
    get: function() {return dpi / 96}
  });

  var orjinalCanvas = GL.map.getCanvas();
  var width = orjinalCanvas.width/GL.devicePixelRatio;
  var height = orjinalCanvas.height/GL.devicePixelRatio;

  var hidden = document.createElement('div');
  hidden.id = 'printMap'
  hidden.style.visibility="hide";
  document.body.appendChild(hidden);
  var container = document.createElement('div');
  container.style.width = width+'px';
  container.style.height = height+'px';
  container.style.position = 'absolute';
  hidden.appendChild(container);

  var zoom = GL.map.getZoom();
  var center = GL.map.getCenter();
  var bearing = GL.map.getBearing();
  var pitch = GL.map.getPitch();
  var style = GL.map.getStyle();

  var renderMap = new mapboxgl.Map({
    container: container,
    center: center,
    zoom: zoom,
    style: style,
    bearing: bearing,
    pitch: pitch,
    interactive: false,
    preserveDrawingBuffer: true,
    fadeDuration: 0,
    attributionControl: false
  });
  return renderMap;
}


GL.backRealRatio=function(){
  Object.defineProperty(window, 'devicePixelRatio', {
    get: function() {return GL.dpi / 96}
  });
}

GL.downloadCanvas = function(canvas,name){
  canvas.once('idle', function() {
    canvas.getCanvas().toBlob(function(blob) {
        GL.backRealRatio();
        document.getElementById('printMap').remove();
        download(blob,name+'.png','image/png');
    });
  });
}

GL.printMap = function(dpi,fileName){
  var md = new MobileDetect(window.navigator.userAgent,600);
  if(md.phone()!==null){
    GL.devicePixelRatio=1;
  }
  dpi = dpi || 96;
  dpi = parseInt(dpi,10);
  fileName = fileName || 'Infrapedia-Print-Map-'+GL.getDate()+'.png';
  var renderMap = GL.createVirtualCanvas(dpi);
  GL.downloadCanvas(renderMap,fileName);
}

GL.addEvents = function(){
  GL.layers.map(function(item){
    var name = item.name;
    var layerId = item.id;
    GL.map.on('mousemove', layerId, function(e) {
      GL.map.getCanvas().style.cursor = 'pointer';
        var layer = GL.map.getLayer(layerId);
      if (e.features.length) {
        var html ="<b>"+name+"</b>";
        GL.map.getCanvas().style.cursor = 'pointer';
        GL.popup.setHTML(html);
        GL.popup.setLngLat(e.lngLat);
        GL.popup.addTo(GL.map);
      }
    });

    GL.map.on('mouseleave', layerId, function(e) {
      var layer = GL.map.getLayer(layerId);
      GL.map.getCanvas().style.cursor = '';
      GL.popup.remove();
    });

    GL.map.on('click', layerId, function(e) {
      var layer = GL.map.getLayer(layerId);
      GL.setColor(layerId);
    });
  })
}

GL.setColor=function(layer){
  debugger;
  /*if(layer.type=="line"){
    GL.map.setPaintProperty(layer.id, 'line-color', '#000000');
  }*/
  

};



export default GL;