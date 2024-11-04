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

// Check if POST data is set
if (isset($_POST['crypto_id']) && isset($_POST['crypto_name']) && isset($_POST['invested_amount']) && isset($_POST['purchase_price'])) {
    $cryptoId = $_POST['crypto_id'];
    $cryptoName = $_POST['crypto_name'];
    $investedAmount = $_POST['invested_amount'];
    $purchasePrice = $_POST['purchase_price'];

    // Validate input
    if (!empty($cryptoId) && !empty($cryptoName) && !empty($investedAmount) && !empty($purchasePrice)) {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO portfolio (cryptoId, cryptoName, investedAmount, cryptoPrice) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssd", $cryptoId, $cryptoName, $investedAmount, $purchasePrice);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Crypto coin was invested successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error saving data: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Missing data. Please make sure all fields are filled."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}

$conn->close();
?>