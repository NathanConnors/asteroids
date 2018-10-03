<?php
	include 'server.php';

	// Create Connection
	$config = new conn();
	$connection = $config->Connection();
	$obj = new dbFunctions($connection);

	$res = $obj->login('USERNAME', 'PASSWORD');

	// $res = $obj->selectAll('user');
	echo $res;
?>