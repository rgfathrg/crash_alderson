$(document).ready(function () {

    // Refresh Page
    $("#brand").click(function () {
        document.location.reload(true);
    });

    // GO Button
    $("#goBtn").on("click", function () {

        // Variables
        var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa", "chicago", "buffalo", "baltimore", "columbus", "cleveland"];
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
        var banner = $("<div>").html("<p>" + city + "!</p>");
        banner.addClass("card bg-light text-dark banner-glow-dark").attr("id", "bannerMargin");
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
            }
        }).then(function (response) {

            $("#events").empty();
            // console.log(response)
            // console.log(response._embedded.events);
            // console.log(response._embedded.events[0].images);

            var events = response._embedded.events;

            // Adds initial event row
            var tr = $("<div>").addClass("row");
            tr.addClass("cardRow");
            $("#events").append(tr);

            // Loops through the events and adds them to the event rows
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

                // Conditional for dynamically creating rows
                // If a 5th card tries to enter an event row
                // it is pushed to the next row
                if ((i + 1) % 4 === 0 && (i + 1) !== events.length) {
                    tr = $("<div>").addClass("row");
                    tr.addClass("cardRow");
                    $("#events").append(tr);
                };
            };

        });
    });
});

// Smooth Scroll
$(function() {
    $('#goBtn').click(function() {
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