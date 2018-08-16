$(document).ready(function () {
    var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa", "chicago", "buffalo", "baltimore", "columbus", "london", "moscow", "dublin", "rome", "cleveland"];

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";
    
    var city;
    var startDate = "2018-09-01T01:00:00Z";
    var endDate = "2018-10-30T21:59:00Z";

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


        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
            }
        }).then(function (response) {
            $("#events").empty();
            console.log(response)
            console.log(response._embedded.events);
            console.log(response._embedded.events[0].images);
            var events = response._embedded.events;

            var tr = $("<div>").addClass("row");
            tr.addClass("cardRow");
            $("#events").append(tr);

            for (var i = 0; i < events.length; i++) {
                var card = $("<div>").addClass("card float-left border cards col-2");
                var cardBody = $("<div>").attr("class", "card-body");
                var eventDates = events[i].dates.start.localDate;
                var eventTime = events[i].dates.start.localTime;
                var eventPics = events[i].images[0].url;
                var eventTitle = events[i].name;
                var p = $("<p>");
                p.html(eventTitle + "<br>" + eventDates + "<br>" + eventTime);
                var img = $("<img>").attr("class", "card-img-top");
                img.attr("src", eventPics);
                cardBody.append(p);
                card.append(img);
                card.append(cardBody);
                tr.append(card);

                if ((i + 1) % 4 === 0 && (i + 1) !== events.length) {
                    tr = $("<div>").addClass("row");
                    tr.addClass("cardRow");
                    $("#events").append(tr);
                };
            }
        });
    });
});