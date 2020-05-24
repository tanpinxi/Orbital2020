<?php
$mysqli = new mysqli("servername", "username", "password", "dbname");

if ($mysqli->connect_error) {
    exit('Could not connect');
}

$sql = "SELECT website FROM website_usage WHERE selected";

$result = $mysqli->query($sql);
$array = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($array);
$mysqli->close();
?>