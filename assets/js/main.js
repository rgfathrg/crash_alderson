$(document).ready(function () {
    var cities = ["charlotte", "houston", "san+diego", "new+york", "san+francisco", "orlando", "charleston", "boston", "miami", "tampa"];
    var uniCity = [];
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";
    var city;
    var limit = 20;
    var startDate = "2018-09-01T01:00:00Z";
    var endDate = "2019-01-31T21:59:00Z";
    var limitation = 0;



    $("#go").on("click", function () {
        var randomCity = Math.floor(Math.random() * cities.length);
        city = cities[randomCity];
        console.log(city);


        $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                city: city,
                startDateTime: startDate,
                endDateTime: endDate,
                size: limit
            }
            // async:true,
            // dataType: "json",
        }).then(function (response) {
            $("#events").empty();
            // console.log(response)
            console.log(response._embedded.events);
            // console.log(response._embedded.events[0].images);
            var events = response._embedded.events;

            for (var i = 0; i < events.length; i++) {

                var eventTitle = events[i].name;

                var id = events[i].id;

                // console.log(events);
 
                uniCity[eventTitle] = id;



                //console.log(response._embedded.events.dates.localDate);
            }

            console.log(uniCity);



            // for (var key in uniCity) {
            //     var getId = uniCity[key];
            //     console.log(uniCity[key]);


            $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    city: city,
                    startDateTime: startDate,
                    endDateTime: endDate,
                    size: limit
                }
                // async:true,
                // dataType: "json",
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