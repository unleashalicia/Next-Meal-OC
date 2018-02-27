function getCoordinates(searchResults, map) {

    for (var address_i = 0; address_i<searchResults.length; address_i++){

        var dataToSend = {
            address: searchResults[address_i].address,
            key: geo_api_key
        };
        console.log("Data to send " + address_i + ": ", dataToSend);

        var ajaxOptions = {
            method: 'get',
            dataType: 'json',
            data: dataToSend,
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            success: functionToRunOnSuccess,
            error: functionToRunOnError
        };

        function functionToRunOnError(error){
            alert('There was an error retrieving your data', error);
        }

        function functionToRunOnSuccess(data){
            console.log("Data in geo function: ", data);
            var accumulatedGeolocations = [];
            for (var geoLocation = 0; geoLocation < data.results.length; geoLocation++) {
                var geoObj = {};
                geoObj.latitude = data.results[geoLocation].geometry.location.lat;
                geoObj.longitude = data.results[geoLocation].geometry.location.lng;
                accumulatedGeolocations.push(geoObj);
            }
            console.log("Geolocation Array: ", accumulatedGeolocations);

            if (map === "first") {
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
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function initFirstMap(searchArr){
    console.log("This is the one you're looking for: ", searchArr);
    var map = new google.maps.Map(document.getElementById('first-map'), {
        zoom: 13
    });
    var location;
    for (var i=0; i<searchArr.length; i++){
        location = {lat: searchArr[0].latitude, lng: searchArr[0].longitude};
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

