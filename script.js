var searchBar = $("#search-bar");
var searchButton = $("#search-btn");
var searchHistory = $("#search-history");
var weatherCol = $("#weather-col");

var apiKey = "4108a6c32359fff2574ba233a1ecfc25";
var currentWeatherUrl;
var forecastUrl;


function populateCurrentWeather() {
    $.ajax({
        url: currentWeatherUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    });
}

function populateWeatherForecast() {
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

searchButton.on("click", function () {

    currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;
    forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;

    populateCurrentWeather();
    populateWeatherForecast();
});