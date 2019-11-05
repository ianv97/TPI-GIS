var wmsSource;
var my_layers = ['actividades_agropecuarias', 'actividades_economicas', 'complejo_de_energia_ene', 'edif_construcciones_turisticas', 'edificio_de_salud_ips', 'edificio_de_seguridad_ips', 
'edif_depor_y_esparcimiento', 'edif_educacion', 'edificios_ferroviarios', 'edificio_publico_ips', 'edif_religiosos', 'estructuras_portuarias', 'infraestructura_aeroportuaria_punto', 
'infraestructura_hidro', 'localidades', 'marcas_y_señales', 'otras_edificaciones', 'obra_portuaria', 'obra_de_comunicación', 'puente_red_vial_puntos', 'puntos_de_alturas_topograficas', 
'puntos_del_terreno', 'salvado_de_obstaculo', 'señalizaciones', 'curso_de_agua_hid', 'curvas_de_nivel', 'líneas_de_conducción_ene', 'limite_politico_administrativo_lim', 'muro_embalse', 
'red_ferroviaria', 'red_vial', 'vias_secundarias', 'ejido', 'espejo_de_agua_hid',  'isla', 'pais_lim', 'provincias', 'sue_congelado',  'sue_consolidado', 'sue_costero', 'sue_hidromorfologico', 
'sue_no_consolidado', 'veg_arborea', 'veg_arbustiva', 'veg_cultivos', 'veg_hidrofila', 'veg_suelo_desnudo'];

var layers_to_show =[
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

my_layers.forEach(function(value) {
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
  layers_to_show.push(layer)
})

var view = new ol.View({
  projection: 'EPSG:4326',
  center: [-60, -38.5],
  zoom: 5
});

var map = new ol.Map({
  target: 'map',
  layers: layers_to_show,
  view: view
});

my_layers.forEach(
    function(value, index){
        var checkbox = document.createElement("input");
        var label_for_input = document.createElement("label");
        var check_layer_id = "check_layer_" + index;
        var labels = document.getElementsByTagName("label");
        
        var a_layer = layers_to_show[index+1];

        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", check_layer_id)
        label_for_input.setAttribute("for", check_layer_id);
        document.getElementById("layerspanel").insertAdjacentElement("beforeend", checkbox);
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label_for_input);
        labels[labels.length - 1].innerHTML = value;
        document.getElementById("layerspanel").appendChild(document.createElement("br"));

        //Visibilidad de las capas
        checkbox.addEventListener("change",
            function () {
                var checked = this.checked;
                if (checked !== a_layer.getVisible()) {
                    a_layer.setVisible(checked)

                    // A la última capa puesta como visible se la toma como fuente de las próximas consultas
                    if (checked) {
                    wmsSource = new ol.source.ImageWMS({
                        url: URL_OGC,
                        params: {'LAYERS': value},
                        serverType: 'geoserver',
                        crossOrigin: 'anonymous'
                        });
                    }
                    else {wmsSource=null}
                }
            });
        a_layer.on("change:visible",
            function() {
                var visible = this.getVisible();
                if (visible !== checkbox.checked){
                    checkbox.checked=visible;
                }
            })
    }

);

map.on('singleclick', function(evt) {
  var viewResolution = (view.getResolution());
  if (wmsSource) {
    // Si se seleccionó una capa se achica el mapa y se muestra el panel
    document.getElementById('map').style.height = '80vh';
    document.getElementById('infopanel').style.display = 'block';

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
    // Si no hay una fuente se elimina el panel y se agranda el mapa
    document.getElementById('infopanel').innerHTML = null;
    document.getElementById('infopanel').style.display = 'none';
    document.getElementById('map').style.height = '100vh';
  }
});