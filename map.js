function getCoordinates(searchResults){
    console.log("Search results in getCoordinates: ", searchResults);

    var dataToSend = {
        address: '823 N. Minter St. Santa Ana, CA 92701',
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
        console.log("Data in function: ", data);
        // var accumulatedGeolocations = [];
        // for (var geoLocation = 0; geoLocation < data.results.length; geoLocation++) {
        //     var geoObj = {};
        //     geoObj.lattitude = data.results[geoLocation].geometry.location.lat;
        //     geoObj.longitude = data.results[geoLocation].geometry.location.lng;
        //     accumulatedGeolocations.push(geoObj);
        // }
        // console.log("Geolocation Array: ", accumulatedGeolocations);
    }

    $.ajax( ajaxOptions );
}

// function initModalMap(lat, lng) {
//     var location = {lat: lat, lng: lng};
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 17,
//         center: location
//     });
//     var marker = new google.maps.Marker({
//         position: location,
//         map: map
//     });
// }
//
// function initMap(searchArr){
//     var map = new google.maps.Map(document.getElementById('first-map'), {
//         zoom: 13
//     });
//     var location;
//     for (var i=0; i<searchArr.length; i++){
//         location = {
//             lat: searchArr[i].geometry.location.lat,
//             lng: searchArr[i].geometry.location.lng
//         }
//
//     }
// }

