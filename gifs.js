// Global Variables
var topics = ["cat", "dog", "bird", "fish", "hamster"]
var limit = 10;
var apiKey = "dc6zaTOxFJmzC";

// Create buttons from the topics array
function generateButton() {
    $("#buttons").empty();
    for (i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("animal");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons").append(newButton);
    }
}

generateButton();

// Add a new topic when the submit button is pressed
$("#add-subject").on("click", function (event) {
    event.preventDefault();
    var newSearch = $("#search-input").val().trim();
    topics.push(newSearch);
    generateButton();
    console.log("that");
});

// Generates 10 gifs of a topic when the topic's button is pressed
$(document).on("click", ".animal", function () {
    console.log("this");
    $("#gifs").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        console.log(results.length);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.addClass("gif");

            gifDiv.prepend(gifImage);
            gifDiv.prepend(p);

            $("#gifs").prepend(gifDiv);
        }
    });
});

// Animates and stills gifs when clicked on
$(document).on("click", ".gif", function () {
    console.log("there");
    var state = $(this).attr("data-state");
    console.log(state);

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    else {
        console.log("error");
    }


});