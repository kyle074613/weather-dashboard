var searchBar = $("#search-bar");
var searchButton = $("#search-btn");
var searchHistory = $("#search-history");
var weatherCol = $("#weather-col");

var apiKey = "4108a6c32359fff2574ba233a1ecfc25";


searchButton.on("click", function () {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
});