<?php
require "config.php";


$titel = $_POST['titel'];
$schrijver = $_POST['schrijver'];
$isbn = $_POST['isbn'];

$query = "INSERT INTO `boeken`(`title`, `author`, `isbn`) VALUES ('{$titel}', '{$schrijver}', {$isbn})";
$result = $conn->query($query);

if($result) {
    echo $titel.' is toegevoegd';
}
else {
    echo 'Boek is niet toegevoegd';
}