function initMap() {
    // var dataToSend = {
    //     api_key: maps_api_key
    // };

    var ajaxOptions = {
        method: 'get',
        dataType: 'json',
        // data: dataToSend,
        url: 'https://maps.googleapis.com/maps/api/js?key='+maps_api_key+'&callback=initMap',
        success: functionToRunOnSuccess,
        error: functionToRunOnError
    };

    function functionToRunOnError(error){
        alert("Map Error: ", error);
        // alert("There was an error retrieving this information. ", error);
    }

    function functionToRunOnSuccess(data) {
        console.log("Map Success: ", data);
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

}