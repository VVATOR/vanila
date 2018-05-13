<?php
$ar[] = json_decode($_COOKIE['resultTable']);
array_push($ar,$_GET['query']);
$newTableJson = json_encode($ar);
//echo $_GET['query'];
setcookie("resultTable", $newTableJson);

echo $_COOKIE['resultTable'];

?>