import set_layout from "./layout.js";
var layers, layers_to_show, view, map, wmsSource;


set_layout();
layers = ['actividades_agropecuarias', 'actividades_economicas', 'complejo_de_energia_ene', 'edif_construcciones_turisticas', 'edificio_de_salud_ips', 'edificio_de_seguridad_ips', 
'edif_depor_y_esparcimiento', 'edif_educacion', 'edificios_ferroviarios', 'edificio_publico_ips', 'edif_religiosos', 'estructuras_portuarias', 'infraestructura_aeroportuaria_punto', 
'infraestructura_hidro', 'localidades', 'marcas_y_señales', 'otras_edificaciones', 'obra_portuaria', 'obra_de_comunicación', 'puente_red_vial_puntos', 'puntos_de_alturas_topograficas', 
'puntos_del_terreno', 'salvado_de_obstaculo', 'señalizaciones', 'curso_de_agua_hid', 'curvas_de_nivel', 'líneas_de_conducción_ene', 'limite_politico_administrativo_lim', 'muro_embalse', 
'red_ferroviaria', 'red_vial', 'vias_secundarias', 'ejido', 'espejo_de_agua_hid',  'isla', 'pais_lim', 'provincias', 'sue_congelado',  'sue_consolidado', 'sue_costero', 'sue_hidromorfologico', 
'sue_no_consolidado', 'veg_arborea', 'veg_arbustiva', 'veg_cultivos', 'veg_hidrofila', 'veg_suelo_desnudo'];

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

view = new ol.View({
  projection: 'EPSG:4326',
  center: [-60, -38.5],
  zoom: 5
});

map = new ol.Map({
  target: 'map',
  layers: layers_to_show,
  view: view
});


// Listado de capas
layers.forEach(
    function(value, index){
        var a_layer = layers_to_show[index+1];

        //Checkbox
        var checkbox = document.createElement("input");
        var check_layer_id = "check_layer_" + index;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", check_layer_id);
        document.getElementById("layerspanel").insertAdjacentElement("beforeend", checkbox);

        //Label
        var label = document.createElement("label");
        label.setAttribute("for", check_layer_id);
        label.setAttribute("style", "margin-left:3px; text-transform:capitalize;");
        label.innerHTML = value;
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label);
        document.getElementById("layerspanel").appendChild(document.createElement("br"));

        //Visibilidad de las capas
        checkbox.addEventListener("change",
          function () {
            let checked = this.checked;
            if (checked !== a_layer.getVisible()) {
                a_layer.setVisible(checked);

                // A la última capa puesta como visible se la toma como fuente de las próximas consultas
                if (checked) {
                  wmsSource = new ol.source.ImageWMS({
                    url: URL_OGC,
                    params: {'LAYERS': value},
                    serverType: 'geoserver',
                    crossOrigin: 'anonymous'
                  });
                }
                else {wmsSource=null;}
            }
          }
        );
        a_layer.on("change:visible",
            function() {
                var visible = this.getVisible();
                if (visible !== checkbox.checked){
                    checkbox.checked=visible;
                }
            })
    }

);


//Función de consultas
map.on('singleclick', function(evt) {
  var viewResolution = (view.getResolution());
  if (wmsSource) {
    // Si se seleccionó una capa, al hacer click se muestra el infopanel
    w2ui['inner_layout'].show('bottom', false)

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
    w2ui['inner_layout'].hide('bottom', false)
  }
});