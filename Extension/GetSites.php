<?php
$mysqli = new mysqli("servername", "username", "password", "focusDB");

if ($mysqli->connect_error) {
    exit('Could not connect');
}

$sql = "SELECT site FROM websites WHERE selected";

$result = $mysqli->query($sql);
$array = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($array);
$mysqli->close();
?>