<?php
require "config.php";


if(isset($_GET['deleteId'])){
    $id = $_GET['deleteId'];
    $query = "DELETE FROM `boeken` WHERE `id` = {$id}";
    $result = $conn->query($query);
    if($result) {
        echo "Boek is verwijderd";
    }else {
        echo "Boek is niet verwijderd";
    }
}