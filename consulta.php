<?php

$layers = ['actividades_agropecuarias', 'actividades_economicas', 'complejo_de_energia_ene', 'edif_construcciones_turisticas', 'edificio_de_salud_ips',
'edificio_de_seguridad_ips', 'edif_depor_y_esparcimiento', 'edif_educacion', 'edificios_ferroviarios', 'edificio_publico_ips',
'edif_religiosos', 'estructuras_portuarias', 'infraestructura_aeroportuaria_punto', 'infraestructura_hidro', 'localidades', 'marcas_y_señales',
'obra_portuaria', 'obra_de_comunicación', 'otras_edificaciones', 'puente_red_vial_puntos', 'puntos_de_alturas_topograficas', 'puntos_del_terreno',
'salvado_de_obstaculo', 'señalizaciones', 'curso_de_agua_hid', 'curvas_de_nivel', 'líneas_de_conducción_ene', 'limite_politico_administrativo_lim', 'muro_embalse', 
'red_ferroviaria', 'red_vial', 'vias_secundarias', 'ejido', 'espejo_de_agua_hid',  'isla', 'pais_lim', 'provincias', 'sue_congelado',  'sue_consolidado',
'sue_costero', 'sue_hidromorfologico', 'sue_no_consolidado', 'veg_arborea', 'veg_arbustiva', 'veg_cultivos', 'veg_hidrofila', 'veg_suelo_desnudo', 'nueva_capa'];

$wkt =  $_GET['wkt'];
$capa = $layers[$_GET['capa']];
$tolerancia = $_GET['resolution'] * 4;

$link= pg_connect("host=localhost user=user password=user dbname=tpigis");

if (substr ($wkt, 0 , 5) == "POINT") {
	$query = "SELECT jsonb_build_object(
					'type', 'FeatureCollection',
					'features', jsonb_agg(feature)
					) as result
				from (
					select jsonb_build_object(
						'type', 'Feature',
						'id', gid,
						'geometry', st_astext(geom),
						'properties', to_jsonb(row) - 'gid' - 'geom') as feature
					from (select * from $capa where ST_DWithin(ST_geomfromtext('$wkt',4326),geom, $tolerancia)) row) features;";
} else {
		$query = "SELECT jsonb_build_object(
					'type', 'FeatureCollection',
					'features', jsonb_agg(feature)
					) as result
				from (
					select jsonb_build_object(
						'type', 'Feature',
						'id', gid,
						'geometry', st_astext(geom),
						'properties', to_jsonb(row) - 'gid' - 'geom') as feature
					from (select * from $capa where st_intersects(ST_geomfromtext('$wkt', 4326), geom)) row) features;";
		};

$result = pg_query($link, $query);
$json = pg_fetch_object($result);
echo $json->result;

/*$nro_campos = pg_num_fields($result);
$nro_registros = pg_num_rows($result);

$header = '<thead><tr style="text-transform:capitalize">';
while ($i < $nro_campos) { 
	$fieldName = pg_field_name($result, $i); 
	
	if($fieldName!='geom'){
		$header.= '<th>' . $fieldName .'</th>'; 
	}
	$i++; 
	
}
$header .= '</tr></thead>';

$body = '<tbody>';
while ($row = pg_fetch_row($result)) { 
	$body.= '<tr>'; 
	$count = count($row); 
	$i=0;
	while ($i < $nro_campos) { 
		 if(pg_field_name($result, $i)!='geom'){
			 $body.= '<td>' . $row[$i] . '</td>';
		}
		$i++;
	} 
	$body.= '</tr>'; 
}
$body.= '</tbody>';

echo("<table class='table table-dark'>" . $header . $body . "</table>");
*/

?>