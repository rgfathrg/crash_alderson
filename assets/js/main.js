$(document).ready(function () {

    //Array to receive associative array to make sure only unique events populate
    var uniCity = [];
    //Array to choose random city
    var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa", "chicago", "buffalo", "baltimore", "columbus", "london", "moscow", "dublin", "rome", "cleveland"];

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";

    var city;
    var limit = 20;
    var startDate = "2018-09-01T01:00:00Z";
    var endDate = "2019-01-31T21:59:00Z";
    var limitation = 0;

    //click event listener
    $("#go").on("click", function () {

        event.preventDefault();

        var geocoder = new google.maps.Geocoder();

        var randomCity = Math.floor(Math.random() * cities.length);
        city = cities[randomCity].toUpperCase();
        console.log(city);

        var cityhead = $("<div>").html("<p>Your city: " + city + "!</p>");
        cityhead.addClass("card my-3 bg-dark text-light heading banner");
        $("#cityName").html(cityhead);

        geocoder.geocode({ address: city }, function (results) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);
            search();
        });

        // $(function() {
        //     $.scrollify({
        //         section: "section",
        //         interstitialSection: "footer"
        //     });
        // });

        //ticketmaster API call
        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
                size: limit
            }
        }).then(function (response) {
            $("#events").empty();
            console.log(response._embedded.events);
            var events = response._embedded.events;

            for (var i = 0; i < events.length; i++) {

                var eventTitle = events[i].name;
                var id = events[i].id;
                uniCity[eventTitle] = id;
            }

            console.log(uniCity);

            $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    city: city,
                    startDateTime: startDate,
                    endDateTime: endDate,
                    size: limit
                }

            }).then(function (response) {
                console.log(response);
                for (var key in uniCity) {
                    uniqueId = uniCity[key];
                    for (i = 0; i < limit; i++) {
                        if (response._embedded.events[i].id === uniqueId) {
                            var card = $("<div>").attr("style", "width: 18rem;").addClass("border float-left");
                            var cardBody = $("<div>").attr("class", "card-body");
                            var eventDates = response._embedded.events[i].dates.start.localDate;
                            var eventTime = response._embedded.events[i].dates.start.localTime;
                            var eventPics = response._embedded.events[i].images[0].url;
                            var eventTitle = response._embedded.events[i].name;
                            var p = $("<p>");

                            p.html(eventTitle + "<br>" + eventDates + "<br>" + eventTime);
                            var img = $("<img>").attr("class", "card-img-top");
                            img.attr("src", eventPics);
                            cardBody.append(p);
                            card.append(img);
                            card.append(cardBody);

                            $("#events").append(card);
                        }
                    }
                }
            });
        });
    });
});











// $("#autocomplete").val("Charlotte, NC, USA")
    // console.log($('#autocomplete').val());
