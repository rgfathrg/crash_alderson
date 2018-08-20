var user;
var eventNum;
var eventidArray;
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=Fst7jzMSw05CNr3UdA1wrZAywnNi0A3j";

var config = {
    apiKey: "AIzaSyCu6A_hric7ZU5R8jCPYVK3iDWj-i_C2BI",
    authDomain: "firstproject-677f1.firebaseapp.com",
    databaseURL: "https://firstproject-677f1.firebaseio.com",
    projectId: "firstproject-677f1",
    storageBucket: "firstproject-677f1.appspot.com",
    messagingSenderId: "692825618956"
};
firebase.initializeApp(config);

var database = firebase.database();
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");

// connectedRef.on("value", function (snap) {
//     if (snap.val()) {
//         var con = connectionsRef.push(true);
//         con.onDisconnect().remove();
//         // database.ref("logstatus").set("off");
//     }
// });
// connectionsRef.on("value", function (snap) {
//     // console.log(snap.numChildren())

//     if (snap.numChildren() === 1) {
//         database.ref("logstatus").set("off");
//  };
// });
var email = "jgaghan@gmail.com"
var password = "tipper4582"
number = email.indexOf("@")
user = email.slice(0, number)
$(document).ready(function () {
    $("#signup").on("click", function () {
        event.preventDefault();
        // email = $('#createaccountemailinput').val();
        // password = $('#createaccountpasswordinput').val();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            window.location.href = '../crash_alderson/index.html';
            number = email.indexOf("@")
            user = email.slice(0, number)
            database.ref(user).set({
                events: "",
                eventCount: 0,
            })

            database.ref("logstatus").set("on");
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    });

    $('#signin').on("click", function () {
        // email = $('#signinemailinput').val();
        // password = $('#signinpasswordinput').val();
        
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.href = '../crash_alderson/index.html';
            number = email.indexOf("@")
            user = email.slice(0, number)
            database.ref("logstatus").set("on");

            if (eventidArray !== "") {

                for (i = 0; i < eventNum; i++) {

                    arr2 = Object.values(eventidArray);
                    eventString = arr2[i]
                    eventArray = eventString.split("~");
                    eventDates = eventArray[0]
                    eventTime = eventArray[1]
                    eventPics = eventArray[2]
                    eventTitle = eventArray[3]
                    eventTickets = eventArray[4]
                    
                    
                    var obiob = {
                        title: eventTitle,
                        date: eventDates,
                        time: eventTime,
                        image: eventPics,
                        link: eventTickets
                    };
                    localStorage.setItem('title' + [i], JSON.stringify(obiob));
                }

            }

        })
    })
    $("#gonzo").on("click", function () {
        var x = 0;
        var tr = $("<div>").addClass("row");
        tr.addClass("cardRow");
        $("#favEvents").append(tr);
        for (var i = 0; i < localStorage.length; i++) {

            if (localStorage.key(i).includes("title")) {

                var whatever = localStorage.getItem('title' + [x]);
                whatever = JSON.parse(whatever);

                var link = $("<a/>", {
                    html: "<br>" + "Ticketmaster Link",
                    href: whatever.link
                });

                var card = $("<div>").addClass("card cards col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3");
                var cardBody = $("<div>").attr("class", "card-body");

                var p = $("<p>");
                p.html(whatever.title + "<br>" + whatever.date + "<br>" + whatever.time);
                p.append(link);

                var img = $("<img>").attr("class", "card-img-top");
                img.attr("src", whatever.image);

                cardBody.append(p);
                card.append(img);
                card.append(cardBody);
                tr.append(card);
                console.log(tr);
                
                $("#favEvents").append(tr);
                x++;
            }
        }

    });
});



firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

$(document).on("click", ".favorite", function () {
    id = $(this).data('type');
    eventNum++;
    database.ref(user + "/eventCount").set(eventNum);
    database.ref(user + "/events").push(id);
    localStorage.setItem("title", id);
    // clickLocal = JSON.parse(clickLocal);
    
    // database.ref(user + "/events").child(eventNum).set({[eventNum] : id})
});

database.ref().on("value", function (snap) {
    if (snap.child(user).exists()) {
        eventidArray = snap.val()[user].events;
        eventNum = snap.val()[user].eventCount
    }
})


