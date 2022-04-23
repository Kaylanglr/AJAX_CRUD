<?php 
require "config.php";

if(isset($_GET["id"])) {
    $id = $_GET["id"];
    $query = "SELECT * FROM `boeken` WHERE `id` = {$id}";
    $result = $conn->query($query);
    if($result) {
        $row = $result->fetch_array();
        $jsonarray =  json_encode($row);
        echo $jsonarray;
    }else {
        echo "ERROR";
    }
}


if(isset($_POST["id"])) {
    $id = $_POST['id'];
    $titel = $_POST['titel'];
    $schrijver = $_POST['schrijver'];
    $isbn = $_POST['isbn'];

    $query = "UPDATE `boeken` SET `title`='{$titel}',`author`='{$schrijver}',`isbn`={$isbn} WHERE `id` = {$id}";
    $result = $conn->query($query);
    if($result) {
        echo $titel ." is aangepast";
    }
}