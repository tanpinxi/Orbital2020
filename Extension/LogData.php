<?php
$mysqli = new mysqli("servername", "username", "password", "focusDB");

if ($mysqli->connect_error) {
    exit('Could not connect');
}

$data = json_decode($HTTP_RAW_POST_DATA);
$site = $data["site"];
$time = $data["time"];

$sql = "UPDATE website_usage SET usage = usage + " . $time . " WHERE website = " . $site;

$stmt = $mysqli->prepare($sql);
$stmt->execute();
?>