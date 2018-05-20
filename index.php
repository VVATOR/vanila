<?php
$cookie = $_COOKIE['resultTable'];

if($cookie==null){
   $ar=array();
}else{
     $ar= json_decode($_COOKIE['resultTable']);
}
array_push($ar,json_decode($_GET['query']));

$newTableJson = json_encode($ar);
//echo $_GET['query'];
setcookie("resultTable", $newTableJson);

echo $newTableJson;

?>

<?php/*
$ar1 = array(json_decode($_COOKIE['resultTable']));
$ar2 = array($_GET['query']);
//array_push($ar,$_GET['query']);
$result = array_merge($ar1, $ar2); 
echo $result;
$newTableJson =  json_encode($result);
echo $newTableJson;
///echo $_GET['query'];
setcookie("resultTable", $newTableJson);

echo $newTableJson;
*/
?>