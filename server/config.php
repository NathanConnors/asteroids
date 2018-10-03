<?php
	class conn {
		private $server = 'localhost';
		private $username = 'root';
		private $password = '';
		private $db = 'finance_diary';
		private $conn;

		// Constructor - Establishes DB Connection
		function __construct () {
			$this->conn = new mysqli(
				$this->servername,
				$this->username,
				$this->password,
				$this->db);

			// Test if connection works
			if ($this->conn->connect_error) {
				die ("Connection failed: " . $conn->connect_error);
			}

			// echo "Connected successfully!";
		}

		// Returns connection
		function Connection () {
			return $this->conn;
		}
	}
?>