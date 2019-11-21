import set_layout from "./layout.js";

var layers, layers_to_show, view, map, wmsSource, mousePositionControl, src_measure, layer_measure, consulta_num_capa;
var new_feature, pol_gjson, gjson, edit_btn, measure_btn, delete_btn, listener, draw, draw_edit, formatLength, sketch, helpTooltipElement, helpTooltip, measureTooltipElement, measureTooltip, src_measure, layer_measure, layer_edit, src_edit; 
set_layout();

layers = ['Actividades agropecuarias', 'Actividades económicas', 'Complejos de energía', 'Construcciones turísticas', 'Edificios de salud',
'Edificios de seguridad', 'Edificios de deporte y esparcimiento', 'Edificios de educación', 'Edificios ferroviarios', 'Edificios públicos',
'Edificios religiosos', 'Estructuras portuarias', 'Infraestructura aeroportuaria', 'Infraestructura hidrográfica', 'Localidades', 'Marcas y señales',
'Obra portuaria', 'Obra de comunicación', 'Otras edificaciones', 'Puente red vial', 'Puntos de alturas topográficas', 'Puntos del terreno',
'Salvado de obstáculo', 'Señalizaciones', 'Curso de agua', 'Curvas de nivel', 'Líneas de conducción', 'Límite político administrativo', 'Muro embalse', 
'Red ferroviaria', 'Red vial', 'Vías secundarias', 'Ejido', 'Espejo de agua', 'Isla', 'País límites', 'Provincias', 'Suelo congelado',  'Suelo consolidado',
'Suelo costero', 'Suelo hidromorfológico', 'Suelo no consolidado', 'Vegetación arbórea', 'Vegetación arbustiva', 'Vegetación cultivos', 'Vegetación hidrófila',
'Vegetación suelo desnudo', 'Nueva capa'];

layers_to_show =[
  new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://wms.ign.gob.ar/geoserver/wms",
      params: {
        LAYERS: "ign:provincia",
        VERSION: "1.1.1"
      }
    })
  })
];

layers.forEach(function(value) {
  let layer = new ol.layer.Image({
    title: value,
    visible: false,
    source: new ol.source.ImageWMS({
        url: URL_OGC,
        params: {
            LAYERS: value,
        }
    })
  });
  layers_to_show.push(layer);
});

// Capa y su fuente donde se dibuja la linea para medir
src_measure = new ol.source.Vector();

layer_measure = new ol.layer.Vector({
  source: src_measure,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
      }),
    stroke: new ol.style.Stroke({
      color: '#000000',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#000000'
        })
      })
    })
});

// Capa, y su fuente, donde se van a agregar nuevos eltos
src_edit = new ol.source.Vector({wrapX: false});
layer_edit = new ol.layer.Vector({
  source: src_edit
});

var pointerMoveHandler = function(evt) {
  if (evt.dragging) {
    return;
  }
  var helpMsg = 'Click para empezar a medir';
  if (sketch)
    {helpMsg = "Click para continuar trazando la linea"}

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: "EPSG:4326",
  undefinedHTML: "&nbsp;"
})



view = new ol.View({
  projection: 'EPSG:4326',
  center: [-60, -38.5],
  zoom: 5
});

var home_icon = document.createElement("i");
home_icon.setAttribute("class", "fas fa-home");

map = new ol.Map({
  controls: ol.control.defaults().extend([
    mousePositionControl,
    new ol.control.ScaleLine(),
    new ol.control.ZoomToExtent({label: home_icon, extent: [-74, -56, -53, -21]})
  ]),
  target: 'map',
  layers: layers_to_show,
  view: view
});

map.addLayer(layer_measure);

map.addLayer(layer_edit);

// Listado de capas y sus leyendas
layers.forEach(
    function(value, index){
        var a_layer = layers_to_show[index+1];
        wmsSource = new ol.source.ImageWMS({
          url: URL_OGC,
          params: {"LAYERS": value},
          ratio: 1,
          serverType: "geoserver"
        });

        //Checkbox
        var checkbox = document.createElement("input");
        var check_layer_id = "check_layer_" + index;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", check_layer_id);
        document.getElementById("layerspanel").insertAdjacentElement("beforeend", checkbox);

        //Nombre de la capa
        var label = document.createElement("label");
        label.setAttribute("for", check_layer_id);
        label.setAttribute("style", "margin-left:3px;");
        label.setAttribute("class", "layers_label")
        label.innerHTML = layers[index];
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label);

        //Leyenda
        document.getElementById("layerspanel").insertAdjacentHTML("beforeend", `
        <button class="btn btn-light" type="button" data-toggle="collapse" data-target=${"#legend_"+index} style="margin:5px; padding:0px 5px;">
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="collapse" id=${"legend_"+index}>
          <img src=${wmsSource.getLegendUrl(map.getView().getResolution())}>
        </div>
        <br>
        `);

        //Visibilidad de las capas
        checkbox.addEventListener("change",
          function () {
            let checked = this.checked;
            if (checked !== a_layer.getVisible()) {
                a_layer.setVisible(checked);

                // A la última capa puesta como visible se la toma como fuente de las próximas consultas
                if (checked) {
                  Array.from(document.getElementsByClassName("layers_label")).forEach(layers_label => layers_label.setAttribute("style", "margin-left:3px;"))
                  label.setAttribute("style", "margin-left:3px; font-weight:bold; text-decoration:underline;");
                  wmsSource = new ol.source.ImageWMS({
                    url: URL_OGC,
                    params: {'LAYERS': value},
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                  });
                  consulta_num_capa = index;
                }
                else {
                  wmsSource=null;
                  label.setAttribute("style", "margin-left:3px;");
                }
            }
          }
        );
        a_layer.on("change:visible",
          function() {
              var visible = this.getVisible();
              if (visible !== checkbox.checked){
                  checkbox.checked=visible;
              }
          }
        );
    }

);
//Quitar la última capa como fuente de consulta
wmsSource = null;


//CONSULTAS
map.on('singleclick', function(evt) {
  consultar(evt.coordinate, view.getResolution());
});

var dragBox = new ol.interaction.DragBox();
dragBox.on('boxend', function() {
  consultar(dragBox.getGeometry().getCoordinates());
});
document.getElementById("infomode_btn").addEventListener("click", function() {
  if (modo_consulta) {
    map.addInteraction(dragBox);
  } else {
    map.removeInteraction(dragBox);
  }
})

function consultar (coordinate, resolution) {
  if (modo_consulta && wmsSource) { 
    if (coordinate.length == 2) {
        //es un punto [lon,lat]
        var wkt = 'POINT(' + coordinate[0] + ' ' + coordinate[1] + ')';
    } else {
        //es un poligono en la forma [ [ [lon,lat],[lon,lat],....] ]
        var wkt = 'POLYGON((';
        for (var i = 0; i < coordinate[0].length - 1; i++) {
            wkt += coordinate[0][i][0] + ' ' + coordinate[0][i][1] + ',';
        }
        wkt += coordinate[0][0][0] + ' ' + coordinate[0][0][1] + '))'
    }

    $.ajax({
      type: "GET",
      url: "consulta.php",
      data: {
        capa: consulta_num_capa,
        wkt: wkt,
        resolution: resolution
      },
      success: function(data){
        document.getElementById('infopanel').innerHTML = data;
      }
    })

    // Si se seleccionó una capa, al hacer click se muestra el infopanel
    w2ui['inner_layout'].show('bottom', false);
    document.getElementById('infopanel_btn').setAttribute('class','btn btn-dark mt-3 checked');
  }else {
    // Si no hay una fuente se oculta el infopanel
    w2ui['inner_layout'].hide('bottom', false);
    document.getElementById('infopanel_btn').setAttribute('class','btn btn-light mt-3 unchecked');
  }
};

// Medir distancias
/*map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
  helpTooltipElement.classList.add('hidden');
});*/

formatLength = function(line) {
  var output;
  var length = ol.sphere.getLength(line, {projection: "EPSG:4326"});
  if (length > 1000) {
    output = length/1000 + " km"
  }
  else {
    output = length + " m"
  };
  return output
}

function addInteraction() {
  map.on('pointermove', pointerMoveHandler);
  map.getViewport().addEventListener('mouseout', function() {
    helpTooltipElement.classList.add('hidden');
  });  

  draw = new ol.interaction.Draw({
    source: src_measure,
    type: "LineString",
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });
  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  var listener;
  draw.on('drawstart',
    function(evt) {
      // set sketch
      sketch = evt.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;
      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });

  draw.on('drawend',
    function() {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      ol.Observable.unByKey(listener);
    });
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

function toggle_button(btn) {
  if (btn.classList.contains('checked')){
    btn.setAttribute('class','btn btn-light mt-3 unchecked');
    return false;
  } else {
    btn.setAttribute('class','btn btn-dark mt-3 checked');
    return true;
  }};

measure_btn = document.getElementById("measure_btn");
measure_btn.onclick = function() {

  toggle_button(measure_btn);
  if (measure_btn.classList.contains('checked')) {
    //measure_btn.setAttribute("class", "btn btn-dark mt-3 checked")
    addInteraction()
  } else {
    map.removeInteraction(draw);
    measureTooltipElement.hidden = true;
    helpTooltipElement.hidden = true;
    draw = null;
    //measure_btn.setAttribute("class", "btn btn-light mt-3 unchecked")
}
};


delete_btn = document.getElementById("delete");
delete_btn.onclick = function() {
/*  if (layer_measure){
    
    map.removeLayer(layer_measure);
    src_measure = new ol.source.Vector();
    map.addLayer(layer_measure);
    $(".ol-tooltip-static").remove();
    }*/
    src_measure.clear();
    $(".ol-tooltip-static").remove()
  };

// Agregar nuevos elementos sobre una nueva capa
function addEditInteraction() {
  draw_edit = new ol.interaction.Draw({
    source: src_edit,
    type: "Polygon"
  });
  map.addInteraction(draw_edit);

  draw_edit.on('drawend', 
    function (evt) {
      new_feature = new ol.Feature({
        geometry: new ol.geom.Polygon(evt.feature.getGeometry().getCoordinates())
      });
      pol_gjson = new ol.format.GeoJSON({geometryName: "Polygon"});
      gjson = JSON.stringify(pol_gjson.writeFeatureObject(new_feature)["geometry"]);
      console.log(gjson);
      // ajax, enviar datos a un server php
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status==200) {
          console.log("ok")
        }
      };

      $("#popup").w2popup( {showClose : false, modal: true} );
      $("#form").w2form({
        name: "form",
        fields: [
          { name: "campo1", type:"text", required: true},
          { name: "campo2", type: "int", required: true}
        ],
        actions: {
          "cancel": function () {
            this.clear();
            $("#popup").w2popup().close();
            src_edit.clear();
          },
          "save": function () {
            let campos = $("#form").w2form().record;
            if (campos.campo1 && campos.campo2){
              xhttp.open("GET", "insert.php?g="+gjson+"&c1="+campos.campo1+"&c2="+campos.campo2, true);
              xhttp.send();
              $("#popup").w2popup().close();
              this.clear();
            };
            src_edit.clear();
          }
        }
      });

    });
};

edit_btn = document.getElementById("edit_btn");
edit_btn.onclick = function() {
  toggle_button(edit_btn);
  if (edit_btn.classList.contains("checked")) {
    addEditInteraction();
  }
  else {
    map.removeInteraction(draw_edit);
    src_edit.clear()
  }
};

