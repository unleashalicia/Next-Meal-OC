<?php
    include_once('./php/keys.php');
?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="author" content="Alicia Evans">
        <title>Next Meal OC</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="icon" href="./assets/forkandknifemarker.png">
        <link rel="stylesheet" href="reset.css">
        <link rel="stylesheet" href="style.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="keys.js"></script>
        <script defer src="map.js"></script>
        <script defer src="main.js"></script>
    </head>
    <body class="white-bg">
        <div id="header" class="black-bg teal-text row page-header">

            <div class="hidden-xs logo">
                <img class="spin invert" src="./assets/forkandknife.png" alt="knife and fork"/>
            </div>
            <div class="logo col-xs-12 hidden-sm hidden-md hidden-lg hidden-xl">
                <img id="small" class="spin invert" src="./assets/forkandknife.png" alt="knife and fork"/>
            </div>

            <h1 class="text-center hidden-xs">Next Meal OC</h1>
            <h2 class="text-center col-xs-12 hidden-sm hidden-md hidden-lg hidden-xl">Next Meal OC</h2>

        </div>
        <div class="container">
            <div class="find-meal-form form-group col-xs-12 col-sm-12 col-md-4 col-md-push-8 col-lg-3 col-lg-push-9">
                <h4>Find Free Meals</h4>
                    <div class="form-group">
                        <select id="day" class="form-control input-group form-group">
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                        </select>
                        <select id="meal" class="form-control input-group form-group">
                            <option value="all">All Day</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                    <button type="button" class="btn teal-bg find-food-btn">Search</button>
                <div id="map-load-container">
                    <div id="first-map" class="locations-map"></div>
                    <div class="loader-container">
                        <div class="loader-div">
                            <div class="loader"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="meal-list-container col-xs-12 col-sm-12 col-md-8 col-md-pull-4 col-lg-9 col-lg-pull-3">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Agency &amp; Program</th>
                        <th>Time</th>
                        <th>City</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <h3 class="default-text">There are no meals available.  Click <a href="https://www.211oc.org/re-entry/physical-health-services/food-pantries.html" target="_blank">HERE</a> to find food pantries in your area.</h3>
                <h3 class="end-of-day">The kitchens are closed for today.  Try searching for tomorrow's meals.</h3>
            </div>

        </div>

        <div id="info-modal" class="modal fade" role="dialog" style="font-size: 16px;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close blue-text" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title text-center blue-text">Information</h2>
                    </div>
                    <div class="modal-body row">
                        <div class="col-12 col-sm-6 container map">
                            <div id="modal-map-load-container">
                                <div id="map" class="locations-map"></div>
                                <div class="loader-container">
                                    <div class="loader-div">
                                        <div class="loader"></div>
                                    </div>
                                </div>
                            </div>
                            <label>Address: </label>
                            <div id="address"></div>
                        </div>
                        <div class="col-12 col-sm-6 container">
                            <div class="info-div">
                                <label>Agency: </label>
                                <div id="agency"></div>
                            </div>
                            <div class="info-div">
                                <label>Program: </label>
                                <div id="program"></div>
                            </div>
                            <div class="info-div">
                                <label>Hours: </label>
                                <div id="hours"></div>
                            </div>
                            <div class="info-div">
                                <label>Phone: </label>
                                <div id="phone"></div>
                            </div>
                            <div class="info-div">
                                <label>Website: </label>
                                <div id="website"></div>
                            </div>
                            <div class="info-div">
                                <label>Who's Eligible?</label>
                                <div id="eligibility"></div>
                            </div>
                            <div class="info-div">
                                <label>What Should I Bring?</label>
                                <div id="docs"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default blue-bg white-text" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <script defer src=<?php print "https://maps.googleapis.com/maps/api/js?key=".$map_api_key."&callback=initMap"?>></script>
    </body>
</html>