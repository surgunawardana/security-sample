<?php 

require_once('db/db.con.php');

$db = new DbConnection();
$data = array();
$itemCode=$_REQUEST['itemCode'];
// $a="3M";

$sql = "SELECT * FROM item WHERE code LIKE '%".$itemCode."%' LIMIT 10";
$result = $db->connect()->query($sql);

$row_count=mysqli_num_rows($result);//$result->num_rows;

    if ($row_count > 0) {
        while($row = $result->fetch_assoc()) {
          $data[] = $row;
        }
    } else {
        echo json_encode("no data");
    }

echo json_encode($data);
mysqli_close($db->connect());

?>