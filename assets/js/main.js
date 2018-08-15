$(document).ready(function () {
    var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa"];

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";
    var city;
    var startDate = "2018-09-01T01:00:00Z";
    var endDate = "2018-10-30T21:59:00Z";



    $("#go").on("click", function () {
        //prevents page from scrolling to top
        event.preventDefault();
      
        var randomCity = Math.floor(Math.random() * cities.length);
        city = cities[randomCity];
        console.log(city);
      
        //finds random city and adds marker for hotels using 'geocoder'
        var geocoder = new google.maps.Geocoder();

        var randomCity = Math.floor(Math.random() * cities.length);
        city = cities[randomCity];
        console.log(city);
        
    
        geocoder.geocode({address:city},function(results){
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);
            search();

        })
    


        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
            }
            // async:true,
            // dataType: "json",
        }).then(function (response) {
            console.log('hello');
            $("#events").empty();
            console.log(response)
            console.log(response._embedded.events);
            console.log(response._embedded.events[0].images);
            var events = response._embedded.events;
            for (var i = 0; i < events.length; i++) {

                var card = $("<div>").attr("style", "width: 18rem;").addClass("border float-left");
                var cardBody = $("<div>").attr("class", "card-body");
                var eventDates = events[i].dates.start.localDate;
                var eventTime = events[i].dates.start.localTime;
                var eventPics = events[i].images[0].url;
                var eventTitle = events[i].name;
                var p = $("<p>");
                // var p1 = $("<p>")
                p.html(eventTitle + "<br>" + eventDates + "<br>" + eventTime);
                var img = $("<img>").attr("class", "card-img-top");
                img.attr("src", eventPics);
                cardBody.append(p);
                card.append(img);ter
                card.append(cardBody);
    

                $("#events").append(card);
                //console.log(response._embedded.events.dates.localDate);
            }
        });


    });
});











// $("#autocomplete").val("Charlotte, NC, USA")
    // console.log($('#autocomplete').val());