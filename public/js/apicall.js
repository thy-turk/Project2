$("#submit").on("click", function (event) {
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
                        "\n<div class = 'nutrition-box flex flex-col'>" +
                            "\n<div class = 'flex flex-row' id = 'health" + i + "'>" +
                                "\n<h2>Health Tags:&nbsp</h2>" + 
                            "\n</div>" +
                            "\n<div class = 'flex flex-row' id = 'diet" + i + "'>" +
                                "\n<h2>Diet Tags:&nbsp</h2>" +
                            "\n</div>" +
                            "\n<div class = 'flex flex-row' id = 'warn" + i + "'>" +
                                "\n<h2>Health Cautions&nbsp</h2>" +
                            "\n</div>" +
                            "\n<h2>Calories per serving:&nbsp" + Math.floor(recipe.calories / recipe.yield) +
                            "\n<h2>Servings:&nbsp" + recipe.yield +
                            "\n<h2>Total Calories:&nbsp" + Math.floor(recipe.calories) +
                        "\n</div>" +
                        "\n<div class = 'ingredients-box'>" +
                            "\n<ul class = 'ml-5 mt-5' id = 'ingred" + i + "'><h3>Ingredients:</h3></ul>" +
                        "\n</div>" +
                    "\n</div>" +
                "\n</div>"
            );
            if(recipe.healthLabels.length > 0)
            {
                for(let h = 0; h < recipe.healthLabels.length; h++)
                {
                    if(h <= 4)
                    {
                        $("#health" + i).append(
                            "<div class = 'bg-green-400 rounded-sm mr-1'>" + recipe.healthLabels[h] + "</div>"
                        );
                    }
                }
            }
            else
            {
                $("#health" + i).append(
                    "<div class = 'bg-green-400 rounded-sm mr-1'>None</div>"
                );
            }
            if(recipe.dietLabels.length > 0)
            {
                for(let d = 0; d < recipe.dietLabels.length; d++)
                {
                    if(d <= 4)
                    {
                        $("#diet" + i).append(
                            "<div class = 'bg-blue-400 rounded-sm mr-1'>" + recipe.dietLabels[d] + "</div>"
                        );
                    }
                }
            }
            else
            {
                $("#diet" + i).append(
                    "<div class = 'bg-blue-400 rounded-sm mr-1'>None</div>"
                );
            }
            if(recipe.cautions.length > 0)
            {
                for(let c = 0; c < recipe.cautions.length; c++)
                {
                    if(c <= 4)
                    {
                        $("#warn" + i).append(
                            "<div class = 'bg-red-400 rounded-sm mr-1'>" + recipe.cautions[c] + "</div>"
                        );
                    }
                }
            }
            else
            {
                $("#warn" + i).append(
                    "<div class = 'bg-red-400 rounded-sm mr-1'>None</div>"
                );
            }
            for(let g = 0; g < recipe.ingredientLines.length; g++)
            {
                if(g <= 8)
                {
                    $("#ingred" + i).append(
                        "<li>" + recipe.ingredientLines[g] + "</li>"
                    );
                }
                else if(g = 9)
                {
                    $("#ingred" + i).append(
                        "<li>For the full ingredients list, please visit the website</li>" 
                    );
                }
            }
        }
        console.log("TEST" + $(this).attr("id"));
        $(document).on("click", ".savebtn", function(event) {
            event.preventDefault();
            alert("Recipe Saved");

            var diet; var health; var warning; var ingredient;

            var foodstuffs = results[$(this).attr("id")].recipe;
            if(foodstuffs.dietLabels.length > 0){diet = foodstuffs.dietLabels.join("~688")}else{diet = "none"}
            if(foodstuffs.healthLabels.length > 0){health = foodstuffs.healthLabels.join("~688")}else{health = "none"}
            if(foodstuffs.cautions.length > 0){warning = foodstuffs.cautions.join("~688")}else{warning = "none"}
            if(foodstuffs.ingredientLines.length > 0){ingredient = foodstuffs.ingredientLines.join("~688")}else{ingredient = "none"}

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
                console.log(recipe);
                $(".savedRecipes").append(
                    "<div class = 'resultbox w-full xl:w-3/4'>" +
                        "\n<div class = 'flex flex-row justify-between'>" +
                            "\n<h1 class = 'bg-gray-900 text-white p-5 px-10 text-xl flex-1 shadow'>" + recipe.recipeName + "</h1>" +
                            "\n<div class = 'flex flex-row'>" +
                                "\n<a href = '" + recipe.recipeurl + "' target = '_blank' class = 'bg-teal-300 text-white p-5 text-lg shadow'>Cooking Instructions</a>" +
                                "\n<a href = '#' type = 'submit' id='" + i + "' class = 'deletebtn bg-teal-300 text-white p-5 text-lg shadow'>Delete</a>" +
                            "\n</div>" +
                        "\n</div>" +
                        "\n<div class = 'flex flex-row bg-white shadow'>" +
                            "\n<img src = '" + recipe.recipeImage + "' alt = '" + recipe.recipeName + "' class = 'apimage'>" +
                            "\n<div class = 'nutrition-box flex flex-col'>" +
                                "\n<div class = 'flex flex-row' id = 'health" + i + "'>" +
                                    "\n<h2>Health Tags:&nbsp</h2>" + 
                                "\n</div>" +
                                "\n<div class = 'flex flex-row' id = 'diet" + i + "'>" +
                                    "\n<h2>Diet Tags:&nbsp</h2>" +
                                "\n</div>" +
                                "\n<div class = 'flex flex-row' id = 'warn" + i + "'>" +
                                    "\n<h2>Health Cautions&nbsp</h2>" +
                                "\n</div>" +
                                "\n<h2>Calories per serving:&nbsp" + Math.floor(recipe.calories / recipe.yield) +
                                "\n<h2>Servings:&nbsp" + recipe.yield +
                                "\n<h2>Total Calories:&nbsp" + Math.floor(recipe.calories) +
                            "\n</div>" +
                            "\n<div class = 'ingredients-box'>" +
                                "\n<ul class = 'ml-5 mt-5' id = 'ingred" + i + "'><h3>Ingredients:</h3></ul>" +
                            "\n</div>" +
                        "\n</div>" +
                    "\n</div>"
                );
                var healtharray = recipe.healthLabels.split("~688");
                if(healtharray.length > 0)
                {
                    for(let h = 0; h < healtharray.length; h++)
                    {
                        if(h <= 4)
                        {
                            $("#health" + i).append(
                                "<div class = 'bg-green-400 rounded-sm mr-1'>" + healtharray[h] + "</div>"
                            );
                        }
                    }
                }
                else
                {
                    $("#health" + i).append(
                        "<div class = 'bg-green-400 rounded-sm mr-1'>None</div>"
                    );
                }
                var dietarray = recipe.dietLabels.split("~688");
                if(dietarray.length > 0)
                {
                    for(let d = 0; d < dietarray.length; d++)
                    {
                        if(d <= 4)
                        {
                            $("#diet" + i).append(
                                "<div class = 'bg-blue-400 rounded-sm mr-1'>" + dietarray[d] + "</div>"
                            );
                        }
                    }
                }
                else
                {
                    $("#diet" + i).append(
                        "<div class = 'bg-blue-400 rounded-sm mr-1'>None</div>"
                    );
                }
                var cautionsarray = recipe.warningLabels.split("~688");
                if(cautionsarray.length > 0)
                {
                    for(let c = 0; c < cautionsarray.length; c++)
                    {
                        if(c <= 4)
                        {
                            $("#warn" + i).append(
                                "<div class = 'bg-red-400 rounded-sm mr-1'>" + cautionsarray[c] + "</div>"
                            );
                        }
                    }
                }
                else
                {
                    $("#warn" + i).append(
                        "<div class = 'bg-red-400 rounded-sm mr-1'>None</div>"
                    );
                }
                var ingredarray = recipe.ingredientLines.split("~688");
                for(let g = 0; g < ingredarray.length; g++)
                {
                    if(g <= 8)
                    {
                        $("#ingred" + i).append(
                            "<li>" + ingredarray[g] + "</li>"
                        );
                    }
                    else if(g = 9)
                    {
                        $("#ingred" + i).append(
                            "<li>For the full ingredients list, please visit the website</li>" 
                        );
                    }
                }
            }
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
    window.location.reload();
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
    });
    window.location.reload();
});

