$(document).ready(function () {

    // Refresh the page when clicking on brand in the navbar
    $("#brand").click(function () {
        document.location.reload(true);
    });

    var uniCity = [];
    var limit = 25;

    // GO Button
    $("#goBtn").on("click", function () {

        // Variables
        var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa", "chicago", "buffalo", "baltimore", "columbus", "cleveland", "dublin"];
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";
        var startDate = "2018-09-01T01:00:00Z";
        var endDate = "2018-10-30T21:59:00Z";
        var geocoder = new google.maps.Geocoder();
        var randomCity = Math.floor(Math.random() * cities.length);

        event.preventDefault();

        // Converts cities appended to screen to Uppercase
        var city;
        city = cities[randomCity].toUpperCase();

        // Adds the randomely selected city to the City Banner after user clicks GO!
        var banner = $("<div>").html("<p>Your city: " + city + "!</p>");
        banner.addClass("card bg-light text-dark banner-glow-dark").attr("id", "cityBanner");
        $("#cityBanner").html(banner);

        // Centers/zooms the map on the randomly selected city
        geocoder.geocode({ address: city }, function (results) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);
            // then places the markers on the map
            search();
        });

        // AJAX call to the ticketmaster API for our events
        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
                size: limit,
                locale: "en"
            }
        }).then(function (response) {

            $("#events").empty();
            // console.log(response);

            console.log(response._embedded.events);
            var events = response._embedded.events;

            // Loops through the events and adds them to the event rows
            for (var i = 0; i < events.length; i++) {

                var eventTitle = events[i].name;
                var id = events[i].id;
                uniCity[eventTitle] = id;
                
            };
        });

        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
                size: limit,
                locale: "en"
            }
        }).then(function (response) {
            console.log(response);

            // Adds initial event row
            var tr = $("<div>").addClass("row");
            tr.addClass("cardRow");
            $("#events").append(tr);


            for (var key in uniCity) {
                uniqueId = uniCity[key];

                for (i = 0; i < limit; i++) {
                    if (response._embedded.events[i].id === uniqueId) {

                        var card = $("<div>").addClass("card cards col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3");
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
                        tr.append(card);
                    }
                }
            }

        });

    });

    // Smooth Scrolling Functionality
    $(function () {
        $('#goBtn').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 800);
                    return false;
                }
            }
        });
    });

});