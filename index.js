var my_layers = ['veg_Hidrofila', 'Edif_Depor_y_Esparcimiento', 'Complejo_de_Energia_Ene', 'Salvado_de_Obstaculo', 'Pais_Lim', 'Sue_congelado', 'Actividades_Agropecuarias', 'Líneas_de_Conducción_Ene', 'Edificio_de_Seguridad_IPS', 'Puntos_de_Alturas_Topograficas', 'Sue_consolidado', 'Limite_Politico_Administrativo_Lim', 'Isla', 'Otras_Edificaciones', 'Localidades', 'Espejo_de_Agua_Hid', 'Obra_Portuaria', 'Red_ferroviaria', 'Vias_Secundarias', 'Edif_Educacion', 'Curvas_de_Nivel', 'Red_Vial', 'Señalizaciones', 'Veg_Arborea', 'Edificios_Ferroviarios', 'Sue_Costero', 'Sue_Hidromorfologico', 'Infraestructura_Hidro', 'Marcas_y_Señales', 'Veg_Arbustiva', 'Edificio_de_Salud_IPS', 'Provincias', 'Obra_de_Comunicación', 'Edif_Construcciones_Turisticas', 'Puente_Red_Vial_Puntos', 'Curso_de_Agua_Hid', 'Edificio_Publico_IPS', 'Muro_Embalse', 'Sue_No_Consolidado', 'Infraestructura_Aeroportuaria_Punto', 'Estructuras_portuarias', 'Edif_Religiosos', 'Actividades_Economicas', 'Veg_Suelo_Desnudo', 'Ejido', 'Puntos_del_Terreno', 'Veg_Cultivos'];

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({ //objeto capa de tipo Tile (Mosaico de Imagenes)
            title: "Natural Earth Base Map", //titulo de la capa
            source: new ol.source.TileWMS({ //fuente de datos de la capa (TileWMS)
            url: 'http://wms.ign.gob.ar/geoserver/wms', //url del servicio WMS
            params: { //parametros del servicio WMS
                LAYERS: 'capabaseargenmap', //capa(s) del servicio WMS
                VERSION: '1.1.1' //version del estandar WMS
        }
    })
    }),
        new ol.layer.Image({
            title: "Provincias",
            source: new ol.source.ImageWMS({
            url: URL_OGC,
            params: {
                LAYERS: "provincias"
                }
            })
        })
    ],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [-59, -27.5],
        zoom: 4})
    });


my_layers.forEach(
    function(value, index){
        var checkbox = document.createElement("input");
        var label_for_input = document.createElement("label");
        var check_layer_id = "check_layer_" + index;
        var labels = document.getElementsByTagName("label");
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", check_layer_id)
        label_for_input.setAttribute("for", check_layer_id);
        document.getElementById("panel").insertAdjacentElement("beforeend", checkbox);
        document.getElementById(check_layer_id).insertAdjacentElement("afterend", label_for_input);
        labels[labels.length - 1].innerHTML = value;
        document.getElementById("panel").appendChild(document.createElement("br"));
    }
);
