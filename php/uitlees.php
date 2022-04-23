<?php
require "config.php";

if(isset($_POST['Titel'])) {
    $title = $_POST['Titel'];
    $query = "SELECT * FROM boeken WHERE title LIKE '%{$title}%'";
}else {
    $query = "SELECT * FROM boeken";
}


$result = $conn->query($query);
if($result->num_rows > 0) {
    echo '<table id="table">';
        echo '<thead>';
            echo '<th>title</th>';
            echo '<th>author</th>';
            echo '<th>isbn</th>';
            echo '<th></th>';
            echo '<th></th>';
        echo '</thead>';
        echo '<tbody id="tbody">';
            while($row = $result->fetch_array()) {
                echo '<tr>';
                    echo '<td>'.$row[1].'</td>';
                    echo '<td>'.$row[2].'</td>';
                    echo '<td>'.$row[3].'</td>';
                    echo '<td><button id="verwijder" data-id="'.$row[0].'"><i class="fa-solid fa-trash-can"></i></button></td>';
                    echo '<td><button id="pasaan" data-id="'.$row[0].'"><i class="fa-solid fa-pen-to-square"></i></button></td>';
                echo '</tr>';
                
            }
        echo '</tbody>';
    echo '</table>';
}else {
    echo '<p>Er zijn geen boeken gevonden</p>';
}







