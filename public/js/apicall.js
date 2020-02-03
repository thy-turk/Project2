$("#submit").on("click", function () {
    event.preventDefault();
    $("#searchResults").empty();

    var search = $("#recipeSearch").val().trim().split(" ").join("%20");
    $("#recipeSearch").val(" ");

    var queryurl = "https://api.edamam.com/search?q=" + search + "&app_id=5523611c&app_key=b5d9d084b57902b4517c0ce63e217e18&from=0&to=10"

    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function (response) {
        var results = response.hits;
        for (let i = 0; i < results.length; i++) {
            var recipe = results[i].recipe;
            $("#searchResults").append(
                "<div class = 'resultbox w-full xl:w-3/4'>" +
                    "\n<div class = 'flex flex-row justify-between'>" +
                        "\n<h1 class = 'bg-gray-900 text-white p-5 px-10 text-xl flex-1 shadow'>" + recipe.label + "</h1>" +
                        "\n<div class = 'flex flex-row'>" +
                            "\n<a href = '" + recipe.url + "' target = '_blank' class = 'bg-teal-300 text-white p-5 text-lg shadow'>Cooking Instructions</a>" +
                            "\n<a href = '#' type = 'submit' id='" + i + "' class = 'savebtn bg-teal-300 text-white p-5 text-lg shadow'>Save for Later</a>" +
                        "\n</div>" +
                    "\n</div>" +
                    "\n<div class = 'flex flex-row bg-white shadow'>" +
                        "\n<img src = '" + recipe.image + "' alt = '" + recipe.label + "' class = 'apimage'>" +
                        "\n<div class = 'nutrition-box'>" +
                        "\n</div>" +
                    "\n</div>" +
                "\n</div>"
            );
            
        }
        console.log("TEST" + $(this).attr("id"));
        $(document).on("click", ".savebtn", function(event) {
            var foodstuffs = results[$(this).attr("id")].recipe;
            if(dietLabels.length > 0){var diet = foodstuffs.dietLabels.join("~688")}else{var diet = "none"};
            if(healthLabels.length > 0){var health = foodstuffs.healthLabels.join("~688")}else{var health = "none"};
            if(cautions.length > 0){var warning = foodstuffs.cautions.join("~688")}else{var warning = "none"};
            if(ingredientLines.length > 0){var ingredient = foodstuffs.ingredientLines.join("~688")}else{var ingredient = "none"};
            var recipeInfo = {
                recipeName: foodstuffs.label,
                recipeImage: foodstuffs.image,
                recipeurl: foodstuffs.url,
                calories: foodstuffs.calories,
                dietLabels: diet,
                healthLabels: health,
                warningLabels: warning,
                ingredientLines: ingredient,
                yield: foodstuffs.yield
            }
            console.log(recipeInfo)
            $.ajax({
                type: "POST",
                url: "api/addRecipe",
                data: recipeInfo
            })
        });
        console.log(results[1].recipe);
    });
    
});

$(document).ready(function () {
    if (window.location.pathname == "/profile") {
        $.ajax({
            url: "api/addRecipe",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                var recipe = response[i];
                $("#savedRecipes").append(
                    "<div class = 'resultbox w-full xl:w-3/4'>" +
                        "\n<div class = 'flex flex-row justify-between'>" +
                            "\n<h1 class = 'bg-gray-900 text-white p-5 px-10 text-xl flex-1 shadow'>" + recipe.recipeName + "</h1>" +
                            "\n<div class = 'flex flex-row'>" +
                                "\n<a href = '" + recipe.recipeurl + "' target = '_blank' class = 'bg-teal-300 text-white p-5 text-lg shadow'>Cooking Instructions</a>" +
                                "\n<a href = '#' type = 'submit' id='" + i + "' class = 'savebtn bg-teal-300 text-white p-5 text-lg shadow'>Save for Later</a>" +
                            "\n</div>" +
                        "\n</div>" +
                        "\n<div class = 'flex flex-row bg-white shadow'>" +
                            "\n<img src = '" + recipe.recipeImage + "' alt = '" + recipe.recipeName + "' class = 'apimage'>" +
                            "\n<div class = 'nutrition-box'>" +
                            "\n</div>" +
                        "\n</div>" +
                    "\n</div>"
                );
            }
        });
    }
})



// var queryurl1 = "https://api.edamam.com/api/nutrition-data?app_id=7e1b6072&app_key=b2f9db58b673c1dbdf0bbc30928a9d81&ingr=" 
// + response.hits[1].recipe.ingredientLines[0].split(" ").join("%20");

// $.ajax({
//     url: queryurl1,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
//     $(".card-body0").append("\nCalories" + response.calories);
//     $(".card-body1").append("\nCalories" + response.calories);

// });

