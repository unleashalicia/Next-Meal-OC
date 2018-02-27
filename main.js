$(document).ready(initializeApp);

var model = {
    meal_array: [],
    day: '',
    meal: '',
    dayArr: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ],

    mealObj: {
        "All Day": "all",
        "Breakfast": "breakfast",
        "Lunch": "lunch",
        "Dinner": "dinner"
    }
};

function initializeApp(){
    addClickHandlersToElements();
    retrieveTodaysMeals();
}

function addClickHandlersToElements(){
    $('.find-food-btn').click(retrieveRequestedMeals);
}

function formatTime(time){
    if(!time){
        return;
    }
    var timeArray = time.split(":");
    var hours = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);

    if (hours >= 12){
        meridianIndicator = "PM";
    } else {
        meridianIndicator = "AM";
    }

    if (hours > 12) {
        hours = hours - 12;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var timeString = hours + ":" + minutes + " " + meridianIndicator;

    return timeString;
}

function formatNowString(hours, minutes){
    var nowString = "";
    if (hours < 10) {
        nowString = nowString + "0";
    }
    nowString = nowString + hours + ":";

    if (minutes < 10) {
        nowString = nowString + "0";
    }
    nowString = nowString + minutes + ":00";
    return nowString;
}

function retrieveTodaysMeals(){

    model.meal_array = [];

    var date = new Date();

    var today = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var nowString = formatNowString(hours, minutes);
    console.log(nowString);


    var dataToSend = {
        search_day: today,
        search_time: nowString
    };

    var ajaxOptions = {
        method: 'get',
        dataType: 'json',
        data: dataToSend,
        url: './php/read.php',
        success: functionToRunOnSuccess,
        error: functionToRunOnError
    };

    function functionToRunOnError(error){
        alert('There was an error retrieving your data', error);
    }

    function functionToRunOnSuccess(data){
        getCoordinates(data.data, "first");
        console.log("success: ", data);
        $('.loader').hide();

        for (var i=0; i < data.data.length; i++){
            model.meal_array.push(data.data[i]);
            updateMealList(model.meal_array);
        }
    }

    $.ajax( ajaxOptions );
    $('button').removeClass('waiting');
}

function retrieveRequestedMeals(){
    $('tbody').empty();
    model.meal_array = [];

    var day = $('#day option:selected').text();

    if (day === "Today"){
        var date = new Date();
        model.day = date.getDay();
    } else if (day === "Tomorrow"){
        var date = new Date();
        var day = date.getDay();
        if (day === 6){
            model.day = 0;
        } else {
            model.day = date.getDay() + 1;
        }
    } else {
        model.day = model.dayArr.indexOf(day);
    }


    var meal = $('#meal option:selected').text();
    model.meal = model.mealObj[meal];
    console.log(model.meal);

    var dataToSend = {
        search_day: model.day,
        meal_time: model.meal
    };

    var ajaxOptions = {
        method: 'get',
        dataType: 'json',
        data: dataToSend,
        url: './php/search.php',
        success: functionToRunOnSuccess,
        error: functionToRunOnError
    };

    function functionToRunOnError(error){
        alert('There was an error retrieving your data', error);
    }

    function functionToRunOnSuccess(data){
        console.log("Is this an array? ", data.data);
        getCoordinates(data.data);
        // console.log("success: ", data);
        $('.loader').hide();

        for (var i=0; i < data.data.length; i++){
            model.meal_array.push(data.data[i]);
            updateMealList(model.meal_array);
        }
    }

    $.ajax( ajaxOptions );
    $('button').removeClass('waiting');
}

function updateMealList(meals){
    if (!meals[0]){
        $('.default-text').show();
        return;
    }


    renderMealsToDom(meals[meals.length-1]);
}

function renderMealsToDom(locationObj){
    $('.default-text').hide();
    var newTableRow = $('<tr>');
    $('tbody').append(newTableRow);
    var newProgram = $('<td>').text(locationObj.agency + " : " + locationObj.program);
    var startTime = formatTime(locationObj.time);
    var endTime = formatTime(locationObj.end_time);
    var newTime = $('<td>').text((startTime) + (endTime ? ("-" + endTime) : ''));
    var newCity = $('<td>').text(locationObj.city);
    var newInfoBtn = $('<button>', {
        'class': 'btn btn-sm teal-bg',
        'text': 'See Info',
        'data-toggle': 'modal',
        'data-target': '#info-modal'
    });
    var newBtnTD = $('<td>');

    (function(){
        newInfoBtn.click(function(){
            console.log("ID: ", locationObj.id);

            var dataToSend = {
                id: locationObj.id
            };

            var ajaxOptions = {
                method: 'get',
                dataType: 'json',
                data: dataToSend,
                url: './php/modal.php',
                success: functionToRunOnSuccess,
                error: functionToRunOnError
            };

            function functionToRunOnError(error){
                alert("There was an error retrieving this information. ", error);
            }

            function functionToRunOnSuccess(data){ //make all this a lot more.
                var result = data.data[0];
                console.log("result: ", result);
                getCoordinates(data.data, "modal");
                // console.log("coordinates test", coordinates);
                $('#agency').text(result.agency);
                $('#program').text(result.program);
                $('#days').text(model.dayArr[parseInt(result.day)]);

                if (result.end_time) {
                    $('#hours').text(formatTime(result.time) + "-" + formatTime(result.end_time));
                } else {
                    $('#hours').text(formatTime(result.time));
                }

                $('#address').text(result.address);

                //make a tags:
                var phone  = $('<a>').attr("href", "tel:"+result.phone).text(result.phone);
                $('#phone').empty();
                $('#phone').append(phone);

                var website = $('<a>').attr("href", result.website).text("Click Here For Website.");
                $('#website').empty();
                $('#website').append(website);
                $('#eligibility').text(result.eligibility);
                $('#docs').text(result.documentation);



            }

            $.ajax( ajaxOptions );
            $('button').removeClass('waiting');

        });
    })();

    $(newTableRow).append(newProgram);
    $(newTableRow).append(newTime);
    $(newTableRow).append(newCity);
    $(newTableRow).append(newBtnTD);
    $(newBtnTD).append(newInfoBtn);
}


