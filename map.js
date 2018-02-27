function getCoordinates(address){

    var dataToSend = {
        address: address,
        key: 'AIzaSyCAzW52ouhLK7zxHwpPb8Z6DIVnsnEzB8A'
    };

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
        var lattitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        initMap(lattitude, longitude);
    }

    $.ajax( ajaxOptions );
}


function initMap(lat, lng) {
    var location = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

