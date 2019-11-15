import set_layout from "./layout.js";

var layers, layers_to_show, view, map, wmsSource, mousePositionControl, src_measure, layer_measure;
var measure_btn, delete_btn, listener, draw, formatLength, sketch, helpTooltipElement, helpTooltip, measureTooltipElement, measureTooltip, src_measure, layer_measure;
set_layout();

layers = ['Actividades agropecuarias', 'Actividades económicas', 'Complejos de energía', 'Construcciones turísticas', 'Edificios de salud',
'Edificios de seguridad', 'Edificios de deporte y esparcimiento', 'Edificios de educación', 'Edificios ferroviarios', 'Edificios públicos',
'Edificios religiosos', 'Estructuras portuarias', 'Infraestructura aeroportuaria', 'Infraestructura hidrográfica', 'Localidades', 'Marcas y señales',
'Obra portuaria', 'Obra de comunicación', 'Otras edificaciones', 'Puente red vial', 'Puntos de alturas topográficas', 'Puntos del terreno',
'Salvado de obstáculo', 'Señalizaciones', 'Curso de agua', 'Curvas de nivel', 'Líneas de conducción', 'Límite político administrativo', 'Muro embalse', 
'Red ferroviaria', 'Red vial', 'Vías secundarias', 'Ejido', 'Espejo de agua', 'Isla', 'País límites', 'Provincias', 'Suelo congelado',  'Suelo consolidado',
'Suelo costero', 'Suelo hidromorfo', 'Suelo no consolidado', 'Vegetación arbórea', 'Vegetación arbustiva', 'Vegetación cultivos', 'Vegetación hidrófila',
'Vegetación suelo desnudo'];

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

map = new ol.Map({
  controls: ol.control.defaults().extend([mousePositionControl]),
  target: 'map',
  layers: layers_to_show,
  view: view
});

map.addLayer(layer_measure);
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


//Función de consultas
map.on('singleclick', function(evt) {
  if (modo_consulta && wmsSource) {
    var viewResolution = (view.getResolution());
    // Si se seleccionó una capa, al hacer click se muestra el infopanel
    w2ui['inner_layout'].show('bottom', false);
    document.getElementById('infopanel_btn').setAttribute('class','btn btn-dark mt-3 checked');

    // Consulta a la última capa seleccionada
    var url = wmsSource.getFeatureInfoUrl(
      evt.coordinate,
      viewResolution,
      'EPSG:4326',
      {'INFO_FORMAT': 'text/html'}
    );
    if (url) {
      fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (html) {
        document.getElementById('infopanel').innerHTML = html;
      });
    }
    
  }else {
    // Si no hay una fuente se oculta el infopanel
    w2ui['inner_layout'].hide('bottom', false);
    document.getElementById('infopanel_btn').setAttribute('class','btn btn-light mt-3 unchecked');
  }
});

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
  }

