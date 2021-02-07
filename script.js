var searchHistory = JSON.parse(localStorage.getItem("history"));
if (!searchHistory) {
    searchHistory = [];
}

$(document).ready(function() {
    for (i = 0; i < searchHistory.length; i++) {
        makeRow(searchHistory[i]);
    }
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

    function makeRow(searchValue) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(searchValue);
        $(".history").append(li);
    };

    function searchCity(searchValue) {

        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                if (!searchHistory.includes(searchValue)) {
                    searchHistory.push(searchValue);
                    localStorage.setItem("history", JSON.stringify(searchHistory));
                    makeRow(searchValue);
                }
                
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
                            var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
                            var uvBtn = $("<button>").addClass("btn").text(data.value);
                            cardBody.append(uvIndex);
                            uvIndex.append(uvBtn);
                            if (data.value < 3) {
                                uvBtn.addClass("btn-success");
                            } else if (data.value > 7) {
                                uvBtn.addClass("btn-danger");
                            } else {
                                uvBtn.addClass("btn-warning");
                            }
                        }
                    })
                };

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

                $("#5day").show();

                var day1 = $(".day1").text(new Date(data.list[0].dt * 1000).toLocaleDateString("en-US"));
                $(".day1").append(day1);

                $(".icon1").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");

                var temp1 = $(".temp1").text("Temp: " + data.list[0].main.temp + " F");
                $(".temp1").append(temp1);

                var humidity1 = $(".humidity1").text("Humidity: " + data.list[0].main.humidity + "%");
                $(".humidity1").append(humidity1);

                var day2 = $(".day2").text(new Date(data.list[9].dt * 1000).toLocaleDateString("en-US"));
                $(".day2").append(day2);

                $(".icon2").attr("src", "http://openweathermap.org/img/w/" + data.list[9].weather[0].icon + ".png");

                var temp2 = $(".temp2").text("Temp: " + data.list[9].main.temp + " F");
                $(".temp2").append(temp2);

                var humidity2 = $(".humidity2").text("Humidity: " + data.list[9].main.humidity + "%");
                $(".humidity2").append(humidity2);

                var day3 = $(".day3").text(new Date(data.list[17].dt * 1000).toLocaleDateString("en-US"));
                $(".day3").append(day3);

                $(".icon3").attr("src", "http://openweathermap.org/img/w/" + data.list[17].weather[0].icon + ".png");

                var temp3 = $(".temp3").text("Temp: " + data.list[17].main.temp + " F");
                $(".temp3").append(temp3);

                var humidity3 = $(".humidity3").text("Humidity: " + data.list[17].main.humidity + "%");
                $(".humidity3").append(humidity3);

                var day4 = $(".day4").text(new Date(data.list[25].dt * 1000).toLocaleDateString("en-US"));
                $(".day4").append(day4);

                $(".icon4").attr("src", "http://openweathermap.org/img/w/" + data.list[25].weather[0].icon + ".png");

                var temp4 = $(".temp4").text("Temp: " + data.list[25].main.temp + " F");
                $(".temp4").append(temp4);

                var humidity4 = $(".humidity4").text("Humidity: " + data.list[25].main.humidity + "%");
                $(".humidity4").append(humidity4);

                var day5 = $(".day5").text(new Date(data.list[33].dt * 1000).toLocaleDateString("en-US"));
                $(".day5").append(day5);

                $(".icon5").attr("src", "http://openweathermap.org/img/w/" + data.list[33].weather[0].icon + ".png");

                var temp5 = $(".temp5").text("Temp: " + data.list[33].main.temp + " F");
                $(".temp5").append(temp5);

                var humidity5 = $(".humidity5").text("Humidity: " + data.list[33].main.humidity + "%");
                $(".humidity5").append(humidity5);
            }
        })
    };
});