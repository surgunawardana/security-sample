<?php
$servername = "localhost";
$username = "root";
$password = "tiger";

class DbConnection{
    function connect(){
        $conn = mysqli_connect("localhost","root","tiger","security_sample") or die("Couldn't connect");
        return $conn;
    }
}

?>