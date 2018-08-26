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

$(document).ready(function () {
    $("#signup").on("click", function () {
        event.preventDefault();
        email = $("#createemail").val();
        password = $("#createpassword").val();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            window.location.href = '../crash_alderson/index.html';
            number = email.indexOf("@");
            user = email.slice(0, number);
            localStorage.setItem("user", user);
            database.ref(user).set({
                events: "",
                eventCount: 0,
            });

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
        email = $("#signinemail").val();
        password = $("#signinpassword").val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            window.location.href = '../crash_alderson/index.html';
            number = email.indexOf("@");
            user = email.slice(0, number);
            localStorage.setItem("user", user);
            database.ref("logstatus").set("on");
        })
            .catch(function (error) {
                // Handle Errors here.
                $("#error").text("Incorrect email or password")
                $("#error").css({ "color": "red" })
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    });
});

$(document).ready(function () {
    if ($(".spacer").length > 0) {
        var tr = $("<div>").addClass("row");
        tr.addClass("cardRow");
        $("#favEvents").append(tr);
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes("title")) {
                title = localStorage.key(i);
                if (title.length === 6) { 
                    x = title.slice(-1); 
                }
                if (title.length === 7) {
                    x = title.slice(-2)
                }
                var whatever = localStorage.getItem('title' + [x]);
                whatever = JSON.parse(whatever);
                var link = $("<a/>", {
                    html: "<br>" + "Ticketmaster Link",
                    href: whatever.link
                });
                link.attr("target", "_blank");
                var card = $("<div>").addClass("card cards col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 title" + [x]);
                var cardBody = $("<div>").attr("class", "card-body");
                var h = $("<h3>");
                h.addClass("favCity");
                h.html(whatever.city);
                var p = $("<p>");
                p.html(whatever.title + "<br>" + whatever.date + "<br>" + whatever.time);
                p.append(link);
                var img = $("<img>").attr("class", "card-img-top");
                img.attr("src", whatever.image);
                var removalButton = $("<button>Remove Event</button>");
                removalButton.addClass("removal mx-auto");
                removalButton.attr("data-type", "title" + [x]);
                cardBody.append(p);
                card.append(h);
                card.append(img);
                card.append(cardBody);
                card.append(removalButton);
                tr.append(card);
                console.log(tr);
                $("#favEvents").append(tr);
            }
        }

    };
});

firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});

$(document).on("click", ".removal", function () {
    removeElement = $(this).data('type');
    var getElement = localStorage.getItem(removeElement);
    getElement = JSON.parse(getElement);
    var elementKey = getElement.key;
    $("." + removeElement).remove();
    localStorage.removeItem(removeElement);
    database.ref(user + "/events" + "/" + elementKey).remove();
})

$(document).on("click", ".favorite", function () {
    id = $(this).data('type');
    user = localStorage.getItem("user");
    eventString = id;
    eventArray = eventString.split("~");
    eventDates = eventArray[0];
    eventTime = eventArray[1];
    eventPics = eventArray[2];
    eventTitle = eventArray[3];
    eventTickets = eventArray[4];
    eventCity = eventArray[5];
    eventNum++;
    database.ref(user + "/eventCount").set(eventNum);
    var push = database.ref(user + "/events").push(id);
    var getPush = push.key;
    eventArray.push(getPush);
    eventKey = eventArray[6];
    var obiob = {
        title: eventTitle,
        date: eventDates,
        time: eventTime,
        image: eventPics,
        link: eventTickets,
        city: eventCity,
        key: eventKey
    };
    localStorage.setItem('title' + [eventNum], JSON.stringify(obiob));
    // database.ref(user + "/events").child(eventNum).set({[eventNum] : id})
});

database.ref().on("value", function (snap) {
    user = localStorage.getItem("user");
    if (snap.child(user).exists()) {
        eventidArray = snap.val()[user].events;
        eventNum = snap.val()[user].eventCount;
        if (eventidArray !== "") {
            for (i = 0; i < eventNum; i++) {
                arr2 = Object.values(eventidArray);
                eventString = arr2[i];
                eventArray = eventString.split("~");
                eventDates = eventArray[0];
                eventTime = eventArray[1];
                eventPics = eventArray[2];
                eventTitle = eventArray[3];
                eventTickets = eventArray[4];
                eventCity = eventArray[5];
                var obiob = {
                    title: eventTitle,
                    date: eventDates,
                    time: eventTime,
                    image: eventPics,
                    link: eventTickets,
                    city: eventCity
                };
                localStorage.setItem('title' + [i], JSON.stringify(obiob));

            }

        }
    }
});

$(document).on("click", "#signout", function () {
    localStorage.clear();
});