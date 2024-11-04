<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the portfolio table
$sql = "SELECT * FROM portfolio";
$result = $conn->query($sql);

$portfolioData = array();
if ($result->num_rows > 0) {
    // Fetch all rows as an associative array
    while ($row = $result->fetch_assoc()) {
        $portfolioData[] = $row;
    }
}

echo json_encode($portfolioData);

$conn->close();
?>
