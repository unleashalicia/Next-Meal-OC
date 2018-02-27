
var lat = -25.363;
var lng = 131.044;
var zoom = 3;


function initMap() {
    var city = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: city
    });
    var marker = new google.maps.Marker({
        position: city,
        map: map
    });
}