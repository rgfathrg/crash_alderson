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
}