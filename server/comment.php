<?php 

require_once('db/db.con.php');

$db = new DbConnection();
$data = array();
$mode=$_REQUEST['mode'];

if($mode=='read'){
    viewData($db, $data);
}else if($mode=='save'){
    $comment = $_POST['comment'];
    $user = $_POST['user'];

    $sql = "INSERT INTO comment (post_id, comment, user)
            VALUES ('1', '".$comment."', '".$user."')";
    if ($db->connect()->query($sql) == TRUE) {
        // echo "New record created successfully";
        viewData($db, $data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


function viewData($db, $data){
    $sql = "SELECT * FROM comment LIMIT 10";
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
}
?>