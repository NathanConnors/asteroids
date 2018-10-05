<?php
	// All Functions that communicate with the DB
	class dbFunctions {
		private $conn;

		// Connection
		function __construct ($connection) {
			$this->conn = $connection;
		}

		// Simple select all with table parameter
		function selectAll ($table) {
			$sql = "SELECT * FROM $table";
			$result = $this->conn->query($sql);

			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					echo $row['User_Id'] . "\n";
					echo $row['User_Name'] . "\n";
					echo $row['Password'] . "\n";
					echo $row['Create_Date'] . "\n";
					echo $row['Security_Question'] . "\n";
					echo $row['Security_Answer'] . "\n";
					echo $row['Email'] . "\n";
    			}
			} else {
				echo '0 results';
			}
		}

		// Generate New High Score (limit db to 10?)
		function newScore ($username, $password) {
			// Query
			$sql = "SELECT User_Name, Password FROM user WHERE User_Name = '$username'";
			$result = $this->conn->query($sql);

			// Return true if valid password
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					if ($row['User_Name'] == $username && $row['Password'] == $password) {
						echo true;
					} else {
						echo false;
					}
				}
			} else {
				echo false;
			}
		}

		// Pull all high scores from DB
		function getScores () {

		}
	}
?>