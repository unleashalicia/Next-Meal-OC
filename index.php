<?php

    require_once('connection.php');

    $query = "SELECT * FROM next_meal_oc";
    $result = mysqli_query($conn, $query);
    $output = [
        'data' => []
    ];


    if(!empty($result)){
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                $output['data'][] = $row;
            }
        }
    }


    $json_output = json_encode($output);
    print $json_output;

?>