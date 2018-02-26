<?php

require_once('connection.php');
$query = "SELECT * 
              FROM next_meal_oc 
              WHERE id = {$_GET['id']}";
$result = mysqli_query($conn, $query);
$output = [
    'success' => false,
    'errors' => [],
    'data' => []
];


if(!empty($result)){
    if(mysqli_num_rows($result) > 0){
        $output['success'] = true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = "No data available.";
    }
} else {
    $output['errors'][] = mysqli_error($conn);
}


$json_output = json_encode($output);
print $json_output;

?>