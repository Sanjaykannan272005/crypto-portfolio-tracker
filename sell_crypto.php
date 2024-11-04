<?php
session_start();
include("connection.php"); // Ensure this file properly establishes the database connection

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the cryptoName and cryptoPrice from the POST request
    $cryptoName = $_POST['cryptoName'];  // Assuming 'cryptoName' is passed from the frontend
    $cryptoPrice = $_POST['cryptoPrice'];  // Assuming 'cryptoPrice' is passed from the frontend

    // Check if cryptoName and cryptoPrice are received
    if (!$cryptoName || !$cryptoPrice) {
        echo 'Missing cryptoName or cryptoPrice';
        exit();
    }

    // Prepare a statement to delete the record based on cryptoName and cryptoPrice
    $query = "DELETE FROM portfolio WHERE `portfolio`.`cryptoName` = ? AND `portfolio`.`cryptoPrice` = ?";
    $stmt = $con->prepare($query); // Ensure $conn is initialized

    // Check if the statement preparation was successful
    if (!$stmt) {
        echo 'Statement preparation failed: ' . $con->error;
        exit();
    }

    // Bind the parameters ('s' for string, 'd' for double/decimal values)
    $stmt->bind_param('sd', $cryptoName, $cryptoPrice);

    // Execute the query
    if ($stmt->execute()) {
        // Check if any row was actually affected (i.e., deleted)
        if ($stmt->affected_rows > 0) {
            echo 'success';
        } else {
            echo 'No row matched the given criteria';
        }
    } else {
        echo 'Query execution failed: ' . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} else {
    echo 'Invalid request method';
}

$con->close();
?>
