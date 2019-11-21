<?php
// conexion a la bbdd
$dbconn = pg_connect("host=localhost user=user password=user dbname=tpigis")
	or die ("No se ha podido conectar: " . pg_last_error());

$g = $_GET["g"];
$c1 = $_GET["c1"];
$c2 = $_GET["c2"];


$query="CREATE TABLE IF NOT EXISTS test (id SERIAL PRIMARY KEY, geom GEOMETRY, campo1 TEXT, campo2 INT)";

$result = pg_query($dbconn, $query) or die("ERROR AL CREAR: " . pg_last_error());

pg_free_result($result);

$query = "INSERT INTO test(geom, campo1, campo2) VALUES (ST_GeomFromGeoJSON('$g'), '$c1', '$c2')";

$result = pg_query($dbconn, $query) or die("ERROR AL INSERTAR: " . pg_last_error());
//pg_free_result($result);

pg_close($dbconn);

?>
