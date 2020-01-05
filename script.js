var searchBar = $("#search-bar");
var searchButton = $("#search-btn");
var searchHistory = $("#search-history");
var weatherCol = $("#weather-col");

var apiKey = "4108a6c32359fff2574ba233a1ecfc25";
var currentWeatherUrl;
var forecastUrl;
var currentWeatherObj;
var fiveDayForecastArray = [];

//Creates current date variable
var today = new Date();
var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


function populateCurrentWeather() {
    $.ajax({
        url: currentWeatherUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //Object to store current weather data
        currentWeatherObj = {
            date: currentDate,
            weatherIcon: response.weather[0].icon,
            temperature: Math.round(response.main.temp),
            wind: response.wind.speed,
            uvIndex: 0
        };

        //Call to get UV index 
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var currentUvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

        $.ajax({
            url: currentUvUrl,
            method: "GET"
        }).then(function (response2) {
            console.log(response2);
            currentWeatherObj.uvIndex = response2.value;
        });

        console.log(currentWeatherObj);
    });
}

function populateWeatherForecast() {
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var temporaryForecastObj;

        for (var i = 0; i < response.list.length; i += 8) {
            temporaryForecastObj = {
                date: response.list[i].dt_txt.split(" ")[0],
                weatherIcon: response.list[i].weather[0].icon,
                temperature: Math.round(response.list[i].main.temp),
                humidity: response.list[i].main.humidity
            };
            fiveDayForecastArray.push(temporaryForecastObj);
        }




    });
}

searchButton.on("click", function () {

    currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;

    forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;

    populateCurrentWeather();
    populateWeatherForecast();

    console.log(fiveDayForecastArray);
});