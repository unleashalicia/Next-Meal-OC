$(document).ready(initializeApp);

var model = {
    meal_array: [],
    day: '',
    meal: '',
    now: {},
    today: null,
    dayObject: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
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

    if (minutes < 10){
        minutes = "0" + minutes;
    }

    var timeString = hours + ":" + minutes + " " + meridianIndicator;

    return timeString;
}

function retrieveTodaysMeals(){
    model.now = new Date($.now());
    model.today = model.now.getDay();
    model.meal_array = [];
    var ajaxOptions = {
        method: 'get',
        dataType: 'json',
        url: './index.php',
        success: functionToRunOnSuccess,
        error: functionToRunOnError
    };

    function functionToRunOnError(error){
        alert('There was an error retrieving your data', error);
    }

    function functionToRunOnSuccess(data){
        $('.loader').hide();

        for (var i=0; i < data.data.length; i++){

            if(data.data[i].day == model.today){
                model.meal_array.push(data.data[i]);
                updateMealList(model.meal_array);
            }
        }
    }

    $.ajax( ajaxOptions );
    $('button').removeClass('waiting');
}

function retrieveRequestedMeals(){
    $('tbody').empty();
    model.meal_array = [];
    model.day = $('#day option:selected').text();
    model.meal = $('#meal option:selected').text();
    updateMealList(model.meal_array);
}

function updateMealList(meals){
    if (!meals[0]){
        $('.default-text').show();
        return;
    }

    renderMealsToDom(meals[meals.length-1]);
}

function renderMealsToDom(locationObj){
    console.log("inside render meals2: ", locationObj);
    $('.default-text').hide();
    var newTableRow = $('<tr>');
    $('tbody').append(newTableRow);
    var newProgram = $('<td>').text(locationObj.agency + " : " + locationObj.program);
    var newTime = $('<td>').text(formatTime(locationObj.time));
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