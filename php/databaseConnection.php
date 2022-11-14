<?php
    $servername = "192.168.0.197";
    $username = "jayden";
    $password = "123456";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password);

    // Check connection
    if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";
?>