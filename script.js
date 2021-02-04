$(document).ready(function() {
 
    $("#5day").hide();

    $('#searchButton').on("click", function() {
        
        var searchValue = $('#searchInput').val();

        $('#searchInput').val(" ");

        searchCity(searchValue);
        get5Day(searchValue);
    });

    $(".history").on("click", "li", function(){
        searchCity($(this).text());
    });

    var apiKey = "13a80175fbe3aedef498bcdf08bd27a4";

    function makeRow(text) {
        var li = $("<li>").addClass("data.list-group-item data.list-group-item-action").text(text);
        $(".history").append(li);
    };

    function searchCity(searchValue) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                // create history link for this search 
                // if (history.indexOf(searchValue) === -1) {
                //     history.push(searchValue);
                //     window.localStorage.setItem("history", JSON.stringify(history));

                //     makeRow(searchValue)
                // };

                $("#current").empty();

                var title = $("<h2>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ") ");
                var cardBody = $("<div>").addClass("card-body");
                var card = $("<div>").addClass("card");

                var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F");
                var img  = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

                title.append(img);
                cardBody.append(title, temp, humid, wind)
                card.append(cardBody);
                $('#current').append(card);

                var lat = data.coord.lat;
                var lon = data.coord.lon

                function getUV(lat, lon) {
                    $.ajax({
                        type: "GET",
                        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
                        dataType: "json",
                        success: function(data) {
                            var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + data.value);

                            cardBody.append(uvIndex)
                        }
                    })
                };

                // call follow-up api endpoints
                
                get5Day(searchValue);
                getUV(data.coord.lat, data.coord.lon);
            } 
        });
    };
    
    function get5Day(searchValue) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                console.log(data);
                $("#5day").show();

                var day1 = $(".day1").text(data.list[0].dt_txt);
                $(".day1").append(day1);

                var temp1 = $(".temp1").text("Temp: " + data.list[0].main.temp + " F");
                $(".temp1").append(temp1);

                var humidity1 = $(".humidity1").text("Humidity: " + data.list[0].main.humidity + "%");
                $(".humidity1").append(humidity1);

                var day2 = $(".day2").text(data.list[9].dt_txt);
                $(".day2").append(day1);

                var temp2 = $(".temp2").text("Temp: " + data.list[9].main.temp + " F");
                $(".temp2").append(temp1);

                var humidity2 = $(".humidity2").text("Humidity: " + data.list[9].main.humidity + "%");
                $(".humidity2").append(humidity1);

                var day3 = $(".day3").text(data.list[17].dt_txt);
                $(".day3").append(day1);

                var temp3 = $(".temp3").text("Temp: " + data.list[17].main.temp + " F");
                $(".temp3").append(temp1);

                var humidity3 = $(".humidity3").text("Humidity: " + data.list[17].main.humidity + "%");
                $(".humidity3").append(humidity1);

                var day4 = $(".day4").text(data.list[25].dt_txt);
                $(".day4").append(day1);

                var temp4 = $(".temp4").text("Temp: " + data.list[25].main.temp + " F");
                $(".temp4").append(temp1);

                var humidity4 = $(".humidity4").text("Humidity: " + data.list[25].main.humidity + "%");
                $(".humidity4").append(humidity1);

                var day5 = $(".day5").text(data.list[33].dt_txt);
                $(".day5").append(day1);

                var temp5 = $(".temp5").text("Temp: " + data.list[33].main.temp + " F");
                $(".temp5").append(temp1);

                var humidity5 = $(".humidity5").text("Humidity: " + data.list[33].main.humidity + "%");
                $(".humidity5").append(humidity1);
            }
        })
    };

    




    //     var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey
    //     fetch(currentUrl).then(function(data) {
    //         return data.json()
    //     }).then(function(data) {
    //         console.log(data)
    //     })
    // };

    // function get5Day(searchValue) {
    //     var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + apiKey
    //     fetch(forecastUrl).then(function(data) {
    //         return data.json()
    //     }).then(function(data) {
    //         console.log(data)
    //     })
    // };

    // function getUV(searchValue) {
    //     var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    //     fetch(uvUrl).then(function(data) {
    //         return data.json()
    //     }).then(function(data) {
    //         console.log(data)
    //     })
    // };


});