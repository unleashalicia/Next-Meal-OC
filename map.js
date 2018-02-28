function getCoordinates(searchResults, map) {
    var onLast = false;
    var accumulatedGeolocations = [];

    for (var address_i = 0; address_i<searchResults.length; address_i++){
        if (address_i === searchResults.length-1){
            onLast = true;
        }

        var dataToSend = {
            address: searchResults[address_i].address,
            key: geo_api_key
        };

        var ajaxOptions = {
            method: 'get',
            dataType: 'json',
            data: dataToSend,
            async: false,
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            success: functionToRunOnSuccess,
            error: functionToRunOnError
        };

        function functionToRunOnError(error){
            console.log('There was an error retrieving your data', error);
        }

        function functionToRunOnSuccess(data){
                var geoObj = {};

                geoObj.latitude = data.results[0].geometry.location.lat;
                geoObj.longitude = data.results[0].geometry.location.lng;
                geoObj.name = searchResults[address_i]['agency'];

                accumulatedGeolocations.push(geoObj);

            if (map === "first" && onLast) {
                onLast = false;
                initFirstMap(accumulatedGeolocations);
            } else if (map === "modal") {
                initModalMap(accumulatedGeolocations[0].latitude, accumulatedGeolocations[0].longitude);
            }
        }

        $.ajax( ajaxOptions );
    }
}

function initModalMap(lat, lng) {
    var location = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initFirstMap(searchArr){
    var marker;
    var location = {lat: searchArr[0].latitude, lng: searchArr[0].longitude};
    var map = new google.maps.Map(document.getElementById('first-map'), {
        zoom: 10,
        center: location
    });
    for (var i=0; i<searchArr.length; i++){
        location = {lat: searchArr[i].latitude, lng: searchArr[i].longitude};
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
            // icon: "./assets/forkandknifemarker.png"
        });

        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent('<p>'+searchArr[i].name+'</p>');
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

