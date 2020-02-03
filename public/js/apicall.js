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
        $(document).on("click", ".savebtn", function (event) {
            var foodstuffs = results[$(this).attr("id")].recipe;
            var recipeInfo = {
                recipeName: foodstuffs.label,
                recipeurl: foodstuffs.url,
                recipeImage: foodstuffs.label
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
            $(".savedRecipes").append("\nName: " + response[0].recipeName);
            $("")
            $("#savedRec").prop("href", response[0].recipeurl);
        });
    }
})



$("#trackerbtn").on("click", function () {
    $(document).ready(function () {
        if (window.location.pathname == "/profile") {
            $.ajax({
                url: "/api/tracker/",
                method: "GET"
            }).then(function (response) {
                if (response[0] == undefined) {
                    console.log("undefined");

                    var starter = {
                        calories: 0,
                        fat: 0,
                        cholesterol: 0,
                        sodium: 0,
                        carbs: 0,
                        sugar: 0,
                        protein: 0
                    }
                    $.ajax({
                        type: "POST",
                        url: "api/tracker",
                        data: starter
                    })
                } else {
                    console.log("defined")
                    console.log("cals" + response[0].calories);

                    switch ($("#trackerchoice").val()) {
                        case "Calories":
                            trackerUpdate = {
                                calories: parseInt(response[0].calories) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Fat":
                            trackerUpdate = {
                                fat: parseInt(response[0].fat) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Cholesterol":
                            trackerUpdate = {
                                cholesterol: parseInt(response[0].cholesterol) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Sodium":
                            trackerUpdate = {
                                sodium: parseInt(response[0].sodium) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Carbs":
                            trackerUpdate = {
                                carbs: parseInt(response[0].carbs) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Sugars":
                            trackerUpdate = {
                                sugars: parseInt(response[0].sugars) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                        case "Protein":
                            trackerUpdate = {
                                protein: parseInt(response[0].protein) + parseInt($("#trackeramount").val().trim())
                            }
                            break;
                    }


                    $.ajax({
                        type: "PUT",
                        url: "/api/tracker",
                        data: trackerUpdate
                    })
                }
            });
        }
    });
});

$(document).ready(function () {
    if (window.location.pathname == "/profile") {
        $.ajax({
            url: "api/tracker",
            method: "GET"
        }).then(function (response) {

            $(".calories").text(response[0].calories)
            $(".fat").text(response[0].fat)
            $(".cholesterol").text(response[0].cholesterol)
            $(".sodium").text(response[0].sodium)
            $(".carbs").text(response[0].carbs)
            $(".sugar").text(response[0].sugar)
            $(".protein").text(response[0].protein)
        });
    }
})




$("#newDay").on("click", function () {
    var newDay = {
        calories: 0,
        fat: 0,
        cholesterol: 0,
        sodium: 0,
        carbs: 0,
        sugar: 0,
        protein: 0
    }
    $.ajax({
        type: "PUT",
        url: "api/tracker",
        data: newDay
    })
})

