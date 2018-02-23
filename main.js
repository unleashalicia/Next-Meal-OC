$(document).ready(initializeApp);

var model = {
    meal_array: [],
    day: '',
    meal: '',
    dayObj: {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6
    },
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
    model.day = model.dayObj[day];
    console.log(model.day);
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
        'text': 'See Info'
    });
    var newBtnTD = $('<td>');

    (function(){
        newInfoBtn.click(function(){
            console.log("Button clicked.");
        });
    })();

    $(newTableRow).append(newProgram);
    $(newTableRow).append(newTime);
    $(newTableRow).append(newCity);
    $(newTableRow).append(newBtnTD);
    $(newBtnTD).append(newInfoBtn);
}