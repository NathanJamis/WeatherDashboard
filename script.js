

$(document).ready(function() {

    var apiKey = "13a80175fbe3aedef498bcdf08bd27a4";

    function searchCity(searchValue) {
        var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey
        fetch(currentUrl).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data)
        })
    };

    function get5Day(searchValue) {
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey
        fetch(forecastUrl).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data)
        })
    };

    function getUV(searchValue) {
        var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
        fetch(uvUrl).then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log(data)
        })
    };

    $('#searchButton').on("click", function() {
        var userInput = $('#searchInput').val();
        searchCity(userInput);
        get5Day(userInput);
    })
});