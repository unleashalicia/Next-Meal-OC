<?php

    require_once('connection.php');
    $meal_time = $_GET['meal_time'];
    $query = "SELECT * 
              FROM next_meal_oc AS main
              WHERE main.day = {$_GET['search_day']}
              AND main.time > (SELECT DISTINCT min_time
              FROM meal_time AS mt
              WHERE mt.meal = '$meal_time')
              ORDER BY main.time, main.agency";
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