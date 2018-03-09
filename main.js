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
    $('.default-text').hide();
    $('.end-of-day').hide();
    setClickHandlers();
    populateDOMWithTodaysRemainingMeals();
}

function setClickHandlers(){
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

function populateDOMWithTodaysRemainingMeals(){
    model.meal_array = [];

    var date = new Date();
    var today = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var nowString = formatNowString(hours, minutes);

    $.ajax({
        method: 'get',
        dataType: 'json',
        data: {
            search_day: today,
            search_time: nowString
        },
        url: './php/read.php',
        success: function(info){
            if (!info.data.length){
                $('.loader-container').hide();
                return;
            }

            getCoordinates(info.data, "first");
            for (var i=0; i < info.data.length; i++){
                model.meal_array.push(info.data[i]);
                updateMealList(model.meal_array, "default");
            }
        },
        error: function(error){
            alert('There was an error retrieving your data', error);
        }
    });

}

function retrieveRequestedMeals(){
    $('.loader-container').show();
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

    $.ajax({
        method: 'get',
        dataType: 'json',
        data: {
            search_day: model.day,
            meal_time: model.meal
        },
        url: 'php/search.php',
        success: function(info){
            getCoordinates(info.data, "first");

            for (var i=0; i < info.data.length; i++){
                model.meal_array.push(info.data[i]);
                updateMealList(model.meal_array, "requested");
            }
        },
        error: function(error){
            alert('There was an error retrieving your data', error);
        }
    });

}

function updateMealList(meals, callName){

    if (!meals[0]){
        if (callName === "default") {
            $('.end-of-day').show();
        } else {
            $('.default-text').show();
        }
        return;
    }

    renderMealsToDom(meals[meals.length-1]);
}

function renderMealsToDom(locationObj){
    $('.default-text').hide();
    $('.end-of-day').hide();
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
            $('.loader-container').show();
            retrieveBasicModalInfo(locationObj.id);
            retrieveModalHours(locationObj.agency);

        });
    })();

    $(newTableRow).append(newProgram);
    $(newTableRow).append(newTime);
    $(newTableRow).append(newCity);
    $(newTableRow).append(newBtnTD);
    $(newBtnTD).append(newInfoBtn);
}

function retrieveBasicModalInfo(id){
    $.ajax({
        method: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        url: './php/modal.php',
        success: function(info){
            var result = info.data[0];

            getCoordinates(info.data, "modal");

            $('#agency').text(result.agency);
            $('#program').text(result.program);


            $('#address').text(result.address);

            var phone  = $('<a>').attr("href", "tel:"+result.phone).text(result.phone);
            $('#phone').empty();
            $('#phone').append(phone);

            var website = $('<a>').attr("href", result.website).text("Click Here For Website.");
            $('#website').empty();
            $('#website').append(website);
            $('#eligibility').text(result.eligibility);
            $('#docs').text(result.documentation);
            $('.loader-container').hide();
        },
        error: function(error){
            alert("There was an error retrieving this information. ", error);
            $('.loader-container').hide();
        }
    });

}

function retrieveModalHours(agency){
    $.ajax({
        method: 'get',
        dataType: 'json',
        data: {
            agency: agency
        },
        url: './php/meal_hours.php',
        success: function(info){
            var dataArr = info.data;
            var dayTrackerArr = [];
            var days_i, hours_i, day_ul, day_li, formatted_hours, hours_ul, hours_li, result;

            day_ul = $('<ul>');
            $('#hours').empty().append(day_ul);

            for (days_i=0; days_i<dataArr.length; days_i++){
                result = dataArr[days_i];
                if (dayTrackerArr.indexOf(result.day) < 0) {
                    dayTrackerArr.push(result.day);
                    day_li = $('<li>').addClass('modal-day').text(model.dayArr[parseInt(result.day)]);
                    hours_ul = $('<ul>').addClass(dayTrackerArr.indexOf(result.day)+'-day modal-hours');
                    $('#hours > ul').append(day_li).append(hours_ul);
                }
            }


            for (hours_i=0; hours_i<dataArr.length; hours_i++){
                result=dataArr[hours_i];
                if (result.end_time) {
                    formatted_hours = formatTime(result.time) + "-" + formatTime(result.end_time);
                } else {
                    formatted_hours = formatTime(result.time);
                }
                hours_li = $('<li>').text(formatted_hours);

                $('ul.'+dayTrackerArr.indexOf(result.day)+'-day').append(hours_li);

            }
        },
        error: function(error){
            alert("There was an error retrieving this information. ", error);
        }
    });
}


