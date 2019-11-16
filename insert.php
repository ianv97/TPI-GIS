<?php
// conexion a la bbdd
$dbconn = pg_connect("host=localhost user=user password=user dbname=tpitest")
	or die ("No se ha podido conectar: " . pg_last_error());

$g = $_GET["g"];

$query = "INSERT INTO test VALUES (ST_GeomFromGeoJSON('$g'))";

$result = pg_query($dbconn, $query) or die("ERROR AL INSERTAR: " . pg_last_error());

/*
$cmdtuples = pg_affected_rows($result);
echo $cmdtuples . " datos registrados \n";

pg_free_result($result);
*/
//pg_close($dbconn);

?>
