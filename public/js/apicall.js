$(function() {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var recipeSave = $("#recipeSearch").val().trim();
        var queryurl1 = "https://api.edamam.com/api/nutrition-data?app_id=7e1b6072&app_key=b2f9db58b673c1dbdf0bbc30928a9d81&ingr=" + recipeSave.split(" ").join("%20");
        
        $.ajax({
            url: queryurl1,
            method: "GET"
        }).then(function (event) {
            console.log(event);
        });
    });
});