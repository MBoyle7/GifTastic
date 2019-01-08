$(document).ready(function() {
    var actors = ["Christian Bale", "Heath Ledger", "Gary Oldman"];
    var stillGifUrl = "";
    var animatedGifUrl = "";
    var gifStatus = "";
    var stillGif = "";
    var animatedGif = "";

    var renderBtn = function() {
        $(".btnWindow").empty();
        for(var i = 0; i < actors.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("gif");
            newBtn.attr("nameData", actors[i]);
            newBtn.text(actors[i]);
            $(".btnWindow").append(newBtn);
        }
    }

    var submit = function() {
        event.preventDefault();
        var userInput = $(".searchBar").val();
        actors.push(userInput);
        renderBtn();
        console.log(userInput);
        console.log(actors);
    }

    $(".searchBtn").on("click", function(event) {
        submit();
    });

    var populateGifWindow = function() {
        var btnValue = $(this).attr("nameData");
        console.log(btnValue);

        var apiKey = "D6lKlFgLdt4A5f43WY0R6k5b39EFULcI";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&api_key=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(queryUrl);
            console.log(response);
            var results = response.data;

            for(var i = 0; i < 10; i++) {
                var movieDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var movieImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            movieImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the movieDiv
            movieDiv.append(p);
            movieDiv.append(movieImage);

            // Prependng the movieDiv to the HTML page in the ".gifWindow" div
            $(".gifWindow").prepend(movieDiv);

            }
        })
    }

    var animateGifs = function() {
        gifStatus = $(this).data("type");
        stillGif = $(this).data("still");
        animatedGif = $(this).data("animate");
        if (gifStatus === "still") {
            $(this).attr("src", animatedGif);
            $(this).data("type", "animate");
        } else if (gifStatus === "animate") {
            $(this).attr("src", stillGif);
            $(this).data("type", "still")
        }
    }

    renderBtn();
    $(document).on("click", ".gif", populateGifWindow);
    $(document).on("click", ".gifImage", animateGifs);
})
