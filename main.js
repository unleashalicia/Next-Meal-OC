$(document).ready(initializeApp);

var meal_array = [];
// var day = setDay();
// var meal = setMeal();

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

    if (hours > 12){
        hours = hours - 12;
        meridianIndicator = "PM";
    } else {
        meridianIndicator = "AM";
    }

    if (minutes < 10){
        minutes = "0" + minutes;
    }

    var timeString = hours + ":" + minutes + " " + meridianIndicator;

    return timeString;
}

function retrieveTodaysMeals(){
    meal_array = [];
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
            meal_array.push(data.data[i]);
            updateMealList(meal_array);
        }

    }

    $.ajax( ajaxOptions );
    $('button').removeClass('waiting');
}

function retrieveRequestedMeals(){
    meal_array = [];
    $('tbody').empty();
    updateMealList(meal_array);
    console.log("Meals Requested.");
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
    var newCity = $('<td>').text(locationObj.city);
    var newTime = $('<td>').text(formatTime(locationObj.time));
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
    $(newTableRow).append(newCity);
    $(newTableRow).append(newTime);
    $(newTableRow).append(newBtnTD);
    $(newBtnTD).append(newInfoBtn);
}