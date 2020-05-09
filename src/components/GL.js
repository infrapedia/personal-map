import isMobile from 'is-mobile'
import download from 'downloadjs'
const mapboxgl = require('mapbox-gl')

var GL = {
  dpi: 96,
  subdomain: '',
  darkMode: false,
  devicePixelRatio: 1,
}

if (isMobile() == true) {
  GL.isMobile = true
} else {
  GL.isMobile = false
}

GL.colorPalette = {
  cls: '#f44336',
  ixps: '#8bc34a',
  default: '#efefef',
  facility: '#666666',
}

GL.splitHostname = function () {
  var hostname = window.location.hostname
  if (hostname.indexOf('www.') !== -1) {
    hostname = hostname.replace('www.', '')
  }
  var parts = hostname.split('.')
  if (parts.length == 3) {
    return parts[0]
  } else {
    return 'alikilic'
  }
}

GL.setMap = function (map) {
  Object.defineProperty(window, 'devicePixelRatio', {
    get: function () {
      return GL.devicePixelRatio
    },
  })
  GL.subdomain = GL.splitHostname()
  GL.map = map
  //GL.popup = new mapboxgl.Popup({closeOnClick: false});
}

GL.addControls = function () {
  GL.map.addControl(new mapboxgl.NavigationControl())
}

window.GL = GL

GL.getWidth = function () {
  var widthResult = 400
  if (GL.isMobile) {
    var width = window.screen.width
    if (width < 400) {
      widthResult = width
    }
  }
  return widthResult
}

GL.loading = function (text) {
  if (text == false) {
    document.getElementById('loader').style.display = 'none'
    document.getElementById('loadingText').innerHTML = 'Loading !...'
  } else {
    document.getElementById('loader').style.display = 'flex'
    document.getElementById('loadingText').innerHTML = text
  }
}

GL.openLegend = function (status) {
  var width = GL.getWidth()
  if (status) {
    document.getElementById('legend').className =
      'modal fade panelbox panelbox-left animated3 fadeInLeft show'
    document.getElementById('legend').style.display = 'block'
    document.getElementById('legend').style.width = width + 'px'
    document.getElementById('legendDialog').style.width = width + 'px'
    GL.legend.refreshTable()
    //document.getElementById('modalBackground').className='modal-backdrop fade show';
    //document.getElementById('modalBackground').style.display='block';
  } else {
    document.getElementById('legend').className =
      'modal fade panelbox panelbox-left animated3 fadeOutLeft'
    document.getElementById('legend').style.display = 'block'
    //document.getElementById('modalBackground').className='modal-backdrop fade';
    //document.getElementById('modalBackground').style.display='none';
  }
}

GL.openPrintMap = function (status) {
  if (GL.isMobile) {
    if (status) {
      document.getElementById('mobilePrintMapDialog').className =
        'modal fade animated3 fadeIn dialogbox show'
      document.getElementById('mobilePrintMapDialog').style.display = 'block'
      document.getElementById('modalBackground').className =
        'modal-backdrop fade show'
      document.getElementById('modalBackground').style.display = 'block'
    } else {
      document.getElementById('mobilePrintMapDialog').className =
        'modal fade animated3 fadeIn dialogbox'
      document.getElementById('mobilePrintMapDialog').style.display = 'none'
      document.getElementById('modalBackground').className =
        'modal-backdrop fade'
      document.getElementById('modalBackground').style.display = 'none'
    }
  } else {
    if (status) {
      //webPrintMapDialog
      document.getElementById('webPrintMapDialog').className =
        'modal fade animated3 fadeIn dialogbox show'
      document.getElementById('webPrintMapDialog').style.display = 'block'
      document.getElementById('modalBackground').className =
        'modal-backdrop fade show'
      document.getElementById('modalBackground').style.display = 'block'
    } else {
      document.getElementById('webPrintMapDialog').className =
        'modal fade animated3 fadeIn dialogbox'
      document.getElementById('webPrintMapDialog').style.display = 'none'
      document.getElementById('modalBackground').className =
        'modal-backdrop fade'
      document.getElementById('modalBackground').style.display = 'none'
    }
  }
}

GL.legend = {
  list: [],
  addToList: function (layerID, LayerName, type, style) {
    var obj = {
      id: layerID,
      name: LayerName,
      status: true,
      style: style,
      type: type,
    }
    var control = GL.legend.list.find(function (l) {
      if (l.id == layerID) {
        return true
      }
    })
    if (control == undefined) {
      GL.legend.list.push(obj)
      GL.legend.refreshTable()
    } else {
      alert('Already you have this layer.')
    }
  },
  setActive: function (layerID, status) {
    GL.legend.list.map(function (l) {
      if (layerID == l.id) {
        l.status = status
        if (status == true) {
          GL.map.setLayoutProperty(layerID, 'visibility', 'visible')
          GL.map.setLayoutProperty(layerID + '-label', 'visibility', 'visible')
        } else {
          GL.map.setLayoutProperty(layerID, 'visibility', 'none')
          GL.map.setLayoutProperty(layerID + '-label', 'visibility', 'none')
        }
      }
    })
  },
  refreshTable: function () {
    var parent = document.getElementById('legendList')
    parent.style.marginTop = '75px'
    parent.innerHTML = ''
    GL.legend.list.map(function (layer) {
      var li = document.createElement('li')
      var item = document.createElement('div')
      item.className = 'item'
      item.style.textTransform = 'capitalize'

      var icon = document.createElement('div')
      if (layer.type == 'fill') {
        icon.className = 'con-box bg-success iconRightMargin'
        icon.innerHTML =
          '<ion-icon style="color:#fff;" name="grid-outline"></ion-icon>'
      }
      if (layer.type == '3D') {
        icon.className = 'con-box bg-success iconRightMargin'
        icon.innerHTML =
          '<ion-icon style="color:#fff;" name="cube-outline"></ion-icon>'
      }
      if (layer.type == 'line') {
        icon.className = 'con-box bg-warning iconRightMargin'
        icon.innerHTML =
          '<ion-icon style="color:#fff;" name="analytics-outline"></ion-icon>'
      }
      if (layer.type == 'circle') {
        icon.className = 'con-box bg-info iconRightMargin'
        icon.innerHTML =
          '<ion-icon style="color:#fff;" name="location-outline"></ion-icon>'
      }

      var inn = document.createElement('div')
      inn.className = 'in'
      inn.innerHTML =
        '<div> ' +
        layer.name +
        ' <div class="text-muted">' +
        layer.type +
        '</div> </div>'

      var switchh = document.createElement('div')
      switchh.className = 'custom-control custom-switch'
      var input = document.createElement('input')
      input.className = 'custom-control-input'
      input.type = 'checkbox'
      input.id = 'legendInput-' + layer.id
      input.dataset.id = layer.id
      if (layer.status == true) {
        input.checked = true
      }
      input.addEventListener('change', function (e) {
        var status = e.target.checked
        var layerId = e.target.dataset.id
        GL.legend.setActive(layerId, status)
      })
      var label = document.createElement('label')
      label.className = 'custom-control-label'
      label.htmlFor = 'legendInput-' + layer.id
      switchh.appendChild(input)
      switchh.appendChild(label)
      inn.appendChild(switchh)

      item.appendChild(icon)
      item.appendChild(inn)

      li.appendChild(item)
      parent.appendChild(li)
    })
  },
}

GL.getDate = function () {
  var date = new Date() //date
  var day = date.getDate() //day
  if (day < 10) {
    day = '0' + day
  }
  var month = date.getMonth() + 1 //month
  if (month < 10) {
    month = '0' + month
  }
  var year = date.getFullYear() //year

  var hours = date.getHours() //hours
  if (hours < 10) {
    hours = '0' + hours
  }
  var min = date.getMinutes() //min
  if (min < 10) {
    min = '0' + min
  }
  var sec = date.getSeconds() //sec
  if (sec < 10) {
    sec = '0' + sec
  }
  var fulldate =
    day + '.' + month + '.' + year + ' ' + hours + ':' + min + ':' + sec
  return fulldate
}

GL.createVirtualCanvas = function (dpi) {
  Object.defineProperty(window, 'devicePixelRatio', {
    get: function () {
      return dpi / 96
    },
  })

  var orjinalCanvas = GL.map.getCanvas()
  var width = orjinalCanvas.width / GL.devicePixelRatio
  var height = orjinalCanvas.height / GL.devicePixelRatio

  var hidden = document.createElement('div')
  hidden.id = 'printMap'
  hidden.style.visibility = 'hide'
  document.body.appendChild(hidden)
  var container = document.createElement('div')
  container.style.width = width + 'px'
  container.style.height = height + 'px'
  container.style.position = 'absolute'
  hidden.appendChild(container)

  var zoom = GL.map.getZoom()
  var center = GL.map.getCenter()
  var bearing = GL.map.getBearing()
  var pitch = GL.map.getPitch()
  var style = GL.map.getStyle()

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
    attributionControl: false,
  })
  return renderMap
}

GL.backRealRatio = function () {
  Object.defineProperty(window, 'devicePixelRatio', {
    get: function () {
      return GL.dpi / 96
    },
  })
}

GL.downloadCanvas = function (canvas, name) {
  canvas.once('idle', function () {
    canvas.getCanvas().toBlob(function (blob) {
      GL.backRealRatio()
      document.getElementById('printMap').remove()
      download(blob, name + '.png', 'image/png')
      GL.loading(false)
    })
  })
}

GL.printMap = function (dpi, fileName) {
  GL.loading('Print Image Creating !...')
  if (GL.isMobile == false) {
    GL.devicePixelRatio = 1
  }
  dpi = dpi || 96
  dpi = parseInt(dpi, 10)
  fileName = fileName || 'Print-' + dpi + 'dpi-' + GL.getDate() + '.png'
  var renderMap = GL.createVirtualCanvas(dpi)
  GL.downloadCanvas(renderMap, fileName)
}

GL.styleMaker = {
  line: function (sourceId, layerId, obj) {
    var obj2 = {}
    obj.map(function (columnName) {
      switch (columnName) {
        case 'stroke': {
          obj2['line-color'] = ['get', columnName]
          break
        }
        case 'stroke-width': {
          obj2['line-width'] = ['get', columnName]
          break
        }
        case 'stroke-opacity': {
          obj2['line-opacity'] = ['get', columnName]
          break
        }
      }
    })
    return {
      id: layerId,
      type: 'line',
      source: sourceId,
      paint: obj2,
    }
  },
  threeD: function (sourceId, layerId) {
    var obj2 = {
      id: layerId,
      type: 'fill-extrusion',
      source: sourceId,
      layout: {},
      paint: {
        'fill-extrusion-color': '#666666',
        'fill-extrusion-height': 25,
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 1,
      },
    }
    return obj2
  },
  default: function (type, sourceId, layerId) {
    var style = {}
    switch (type) {
      case 'line': {
        style = {
          id: layerId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-opacity': 1,
            'line-color': '#607d8b',
            'line-width': 5,
          },
          filter: ['==', '$type', 'LineString'],
        }
        break
      }
      case 'fill': {
        style = {
          id: layerId,
          type: 'fill',
          source: sourceId,
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
          filter: ['==', '$type', 'Polygon'],
        }
        break
      }
      case 'circle': {
        style = {
          id: layerId,
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': 5,
            'circle-color': [
              'case',
              ['==', ['get', 'type'], 'cls'],
              GL.colorPalette.cls,
              ['==', ['get', 'type'], 'ixps'],
              GL.colorPalette.ixps,
              GL.colorPalette.default,
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#333333',
          },
          filter: ['==', '$type', 'Point'],
        }
        break
      }
    }
    return style
  },
  label: function (type, id, source, columnName) {
    var style = {}
    switch (type) {
      case 'line': {
        style = {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{' + columnName + '}',
            'symbol-placement': 'line',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.1],
          },
          paint: {
            'text-color': '#485E69',
          },
          filter: ['==', '$type', 'LineString'],
        }
        break
      }
      case 'circle': {
        style = {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{' + columnName + '}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.3],
          },
          paint: {
            'text-color': '#485E69',
          },
          filter: ['==', '$type', 'Point'],
        }
        break
      }
      case '3D': {
        style = {
          id: id,
          source: source,
          type: 'symbol',
          layout: {
            'text-field': '{' + columnName + '}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-justify': 'right',
            'text-anchor': 'bottom',
            'text-offset': [0, -0.1],
          },
          paint: {
            'text-color': '#FFFFFF',
          },
        }
        break
      }
    }
    return style
  },
}

GL.addSource = function () {
  GL.mapSource = {
    cable: {
      id: 'cable',
      status: true,
      source:
        'https://storage.googleapis.com/infrapediacom/clients/' +
        GL.subdomain +
        '_cables.geojson',
      layers: ['cables'],
      label: {
        cables: {
          status: true,
          columnName: 'nameCable',
        },
      },
      paint: {
        cables: {
          type: 'line',
          status: true,
          columns: ['stroke', 'stroke-width', 'stroke-opacity'],
        },
      },
    },
    cls: {
      id: 'cls',
      status: true,
      source:
        'https://storage.googleapis.com/infrapediacom/clients/' +
        GL.subdomain +
        '_cls.geojson',
      layers: ['cls'],
      label: {
        cls: {
          status: true,
          columnName: 'name',
        },
      },
      paint: {
        cls: {
          type: 'circle',
          status: true,
          columns: [],
        },
      },
    },
    draw: {
      id: 'draw',
      status: true,
      source:
        'https://storage.googleapis.com/infrapediacom/clients/' +
        GL.subdomain +
        '_draw.geojson',
      layers: ['drawLine', 'drawPoint'],
      label: {
        drawLine: {
          status: true,
          columnName: 'name',
        },
        drawPoint: {
          status: true,
          columnName: 'name',
        },
      },
      paint: {
        drawPoint: {
          type: 'circle',
          status: true,
          columns: [],
        },
        drawLine: {
          type: 'line',
          status: true,
          columns: ['stroke', 'stroke-width', 'stroke-opacity'],
        },
      },
    },
    facilities: {
      id: 'facilities',
      status: true,
      source:
        'https://storage.googleapis.com/infrapediacom/clients/' +
        GL.subdomain +
        '_facilities.geojson',
      layers: ['facility'],
      label: {
        facility: {
          status: true,
          columnName: 'name',
        },
      },
      paint: {
        facility: {
          type: '3D',
          status: true,
          columns: [],
        },
      },
    },
    ixps: {
      id: 'ixps',
      status: true,
      source:
        'https://storage.googleapis.com/infrapediacom/clients/' +
        GL.subdomain +
        '_ixps.geojson',
      layers: ['ixps'],
      label: {
        ixps: {
          status: true,
          columnName: 'name',
        },
      },
      paint: {
        ixps: {
          type: 'circle',
          status: true,
          columns: [],
        },
      },
    },
  }
}

GL.addLayers = function () {
  for (var i in GL.mapSource) {
    var source = GL.mapSource[i]
    if (source.status) {
      GL.map.addSource(source.id, {
        type: 'geojson',
        data: source.source,
      })

      var layers = source.layers
      layers.map(function (layerName) {
        if (typeof source.paint[layerName] !== 'undefined') {
          var paint = source.paint[layerName]
          var layerStyle = {}
          if (paint.status) {
            switch (paint.type) {
              case 'line': {
                layerStyle = GL.styleMaker.line(
                  source.id,
                  layerName,
                  paint.columns
                )
                break
              }
              case 'circle': {
                layerStyle = GL.styleMaker.default(
                  paint.type,
                  source.id,
                  layerName
                )
                break
              }
              case '3D': {
                layerStyle = GL.styleMaker.threeD(
                  source.id,
                  layerName,
                  paint.columns
                )
                break
              }
            }
          } else {
            layerStyle = GL.styleMaker.default(paint.type, source.id, layerName)
          }
          GL.map.addLayer(layerStyle)

          GL.legend.addToList(layerName, layerName, paint.type, layerStyle)

          GL.map.on('mousemove', layerStyle.id, function (e) {
            GL.map.getCanvas().style.cursor = 'pointer'
            if (e.features.length) {
              var html = '<b>' + e.features[0].properties.name + '</b>'
              GL.map.getCanvas().style.cursor = 'pointer'
              GL.popup.setHTML(html)
              GL.popup.setLngLat(e.lngLat)
              GL.popup.addTo(GL.map)
            }
          })

          GL.map.on('mouseleave', layerStyle.id, function () {
            GL.map.getCanvas().style.cursor = ''
            GL.popup.remove()
          })

          GL.map.on('click', layerStyle.id, function () {
            GL.setColor(layerStyle)
          })
        }

        if (typeof source.label[layerName] !== 'undefined') {
          var label = source.label[layerName]
          if (label.status) {
            var style = GL.styleMaker.label(
              paint.type,
              layerName + '-label',
              source.id,
              label.columnName
            )
            GL.map.addLayer(style)
          }
        }
      })
    }
  }
}

GL.addEvents = function () {
  GL.layers.map(function (item) {
    var name = item.name
    var layerId = item.id
    GL.map.on('mousemove', layerId, function (e) {
      GL.map.getCanvas().style.cursor = 'pointer'
      if (e.features.length) {
        var html = '<b>' + name + '</b>'
        GL.map.getCanvas().style.cursor = 'pointer'
        GL.popup.setHTML(html)
        GL.popup.setLngLat(e.lngLat)
        GL.popup.addTo(GL.map)
      }
    })

    GL.map.on('mouseleave', layerId, function () {
      GL.map.getCanvas().style.cursor = ''
      GL.popup.remove()
    })

    GL.map.on('click', layerId, function () {
      GL.setColor(layerId)
    })
  })
}

export default GL
