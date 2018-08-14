$(document).ready(function() {

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";
    
    
    $.ajax({
        url: queryURL,
        method: "GET",
        // async:true,
        // dataType: "json",
        }).then(function(response) {;
            console.log(response)
            console.log(response._embedded.events);
            
        });
    });
    
    $("#go").on("click", function() {
        $("#autocomplete").val("Charlotte, NC, USA")
        console.log($('#autocomplete').val());
    });