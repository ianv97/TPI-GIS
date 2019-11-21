<?php
// conexion a la bbdd
$dbconn = pg_connect("host=localhost user=user password=user dbname=tpigis")
	or die ("No se ha podido conectar: " . pg_last_error());

$g = $_GET["g"];
$c1 = $_GET["c1"];
$c2 = $_GET["c2"];


$query="CREATE TABLE IF NOT EXISTS nueva_capa (id SERIAL PRIMARY KEY, geom GEOMETRY(Polygon), campo1 VARCHAR(10), campo2 SMALLINT)";

$result = pg_query($dbconn, $query) or die("ERROR AL CREAR: " . pg_last_error());

pg_free_result($result);

$query = "INSERT INTO nueva_capa(geom, campo1, campo2) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('$g'), 4326), '$c1', '$c2')";

$result = pg_query($dbconn, $query) or die("ERROR AL INSERTAR: " . pg_last_error());
//pg_free_result($result);

pg_close($dbconn);

?>
