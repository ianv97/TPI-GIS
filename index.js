import set_layout from "./layout.js";
var l_names, layers, layers_to_show, view, map, wmsSource, mousePositionControl;


set_layout();
layers = ['actividades_agropecuarias', 'actividades_economicas', 'complejo_de_energia_ene', 'edif_construcciones_turisticas', 'edificio_de_salud_ips', 'edificio_de_seguridad_ips', 
'edif_depor_y_esparcimiento', 'edif_educacion', 'edificios_ferroviarios', 'edificio_publico_ips', 'edif_religiosos', 'estructuras_portuarias', 'infraestructura_aeroportuaria_punto', 
'infraestructura_hidro', 'localidades', 'marcas_y_señales', 'otras_edificaciones', 'obra_portuaria', 'obra_de_comunicación', 'puente_red_vial_puntos', 'puntos_de_alturas_topograficas', 
'puntos_del_terreno', 'salvado_de_obstaculo', 'señalizaciones', 'curso_de_agua_hid', 'curvas_de_nivel', 'líneas_de_conducción_ene', 'limite_politico_administrativo_lim', 'muro_embalse', 
'red_ferroviaria', 'red_vial', 'vias_secundarias', 'ejido', 'espejo_de_agua_hid',  'isla', 'pais_lim', 'provincias', 'sue_congelado',  'sue_consolidado', 'sue_costero', 'sue_hidromorfologico', 
'sue_no_consolidado', 'veg_arborea', 'veg_arbustiva', 'veg_cultivos', 'veg_hidrofila', 'veg_suelo_desnudo'];

l_names = ['Activ. agropecuarias', 'Activ. economicas', 'Complejos de energia', 'Construc. turisticas', 'Edif. de salud', 'Edif. de seguridad', 
'Edif deporte y esparc.', 'Edif educac.', 'Edif. ferroviarios', 'Edifi. publico', 'Edif. religiosos', 'Estruc. portuarias', 'Infr. aeroportuaria', 
'Infr._hidro', 'localidades', 'marcas y señales', 'otras edificac.', 'obra portuaria', 'obra de comunicación', 'Puente red vial', 'Ptos de alturas topogr.', 
'Ptos del terreno', 'Salvado de obstaculo', 'señalizaciones', 'curso de agua', 'curvas de nivel', 'lín. de conducción', 'lim politico adm', 'muro embalse', 
'red ferroviaria', 'red vial', 'vias secundarias', 'ejido', 'espejo de agua hid',  'isla', 'pais lim', 'provincias', 'suelo congelado',  'suelo consolidado', 'suelo costero', 'suelo hidromorfologico', 
'suelo no consolidado', 'veg. arborea', 'veg. arbustiva', 'veg. cultivos', 'veg. hidrofila', 'veg. suelo desnudo'];
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

        var legend_id = "legend_"+index;

        var lgnd = document.createElement("div");
        var lgnd_img = document.createElement("img");
        lgnd_img.setAttribute("id", legend_id);
        lgnd_img.setAttribute("src", wmsSource.getLegendUrl(map.getView().getResolution()));
        lgnd_img.setAttribute("width", 150);
        lgnd_img.setAttribute("heigth", 150)
        lgnd.appendChild(lgnd_img);
        document.getElementById("legendspanel").insertAdjacentElement("beforeend", lgnd);
        document.getElementById("legendspanel").appendChild(document.createElement("br"));

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
        label.innerHTML = l_names[index];
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