$(document).ready(function() {
    // create some sort of click event 
    $('#searchButton').on("click", function() {
        
        var searchValue = $('#searchInput').val();

        // clear input box
        $('#searchInput').val(" ");

        searchCity(searchValue);
        get5Day(searchValue);
    });

    $(".history").on("click", "li", function(){
        searchCity($(this).text());
    });

    // hide before deploying
    var apiKey = "13a80175fbe3aedef498bcdf08bd27a4";

    // to make a function to make seperate row for text 
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }

    // makeRow();

    function searchCity(searchValue) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                // create history link for this search 
                if (history.indexOf(searchValue) === -1) {
                    history.push(searchValue);
                    window.localStorage.setItem("history", JSON.stringify(history));

                    makeRow(searchValue)
                }
                // clear old content 
                $("#current").empty();

                // create html conent for current weather 
                var title = $("<h2>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ") ");
                var cardBody = $("<div>").addClass("card-body");
                var card = $("<div>").addClass("card");

                var wind = $("<p>").addClass("card-text").text(" Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F");
                var img  = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

                // merge and add to the page
                title.append(img);
                cardBody.append(title, temp, humid, wind)
                card.append(cardBody);
                $('#current').append(card);

                // call follow-up api endpoints
                get5Day(searchValue);
                getUV(data.coord.lat, data.coord.lon);

            } 

         });
        }





    //     var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey
    //     fetch(currentUrl).then(function(response) {
    //         return response.json()
    //     }).then(function(data) {
    //         console.log(data)
    //     })
    // };

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


});