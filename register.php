<?php
// Database connection (update credentials accordingly)
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "event_management";  // Replace with your actual database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Get the registration details from the input
$event_id = $data['event_id'];
$name = $data['name'];
$email = $data['email'];

// Prepare and execute the SQL statement to insert into the registrations table
$stmt = $conn->prepare("INSERT INTO registrations (event_id, name, email) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $event_id, $name, $email); // "i" for integer, "s" for string

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
