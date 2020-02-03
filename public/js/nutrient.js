$("#submitNutrients").on("click", function (event) {
    event.preventDefault();
    var queryurl1 = "https://api.edamam.com/api/nutrition-data?app_id=7e1b6072&app_key=b2f9db58b673c1dbdf0bbc30928a9d81&ingr="
        + ($("#nutrientSearch").val().trim().split(" ").join("%20"));

    console.log(queryurl1);
    $.ajax({
        url: queryurl1,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".calories").text(response.calories);
        if (response.totalNutrients.FAT != undefined) {
            $(".fat").text(response.totalNutrients.FAT.quantity.toFixed(1) + "g");
            $(".fatper").text(response.totalDaily.FAT.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.FASAT != undefined) {
            $(".satfat").text(response.totalNutrients.FASAT.quantity.toFixed(1) + "g");
            $(".satfatper").text(response.totalDaily.FASAT.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.FATRN != undefined) {
            $(".tranfat").text(response.totalNutrients.FATRN.quantity.toFixed(1) + "g");
        }

        if (response.totalNutrients.CHOLE != undefined) {
            $(".chol").text(response.totalNutrients.CHOLE.quantity.toFixed(1) + "mg");
            $(".cholper").text(response.totalDaily.CHOLE.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.NA != undefined) {
            $(".sodium").text(response.totalNutrients.NA.quantity.toFixed(1) + "mg");
            $(".sodiumper").text(response.totalDaily.NA.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.CHOCDF != undefined) {
            $(".carbs").text(response.totalNutrients.CHOCDF.quantity.toFixed(1) + "g");
            $(".carbsper").text(response.totalDaily.CHOCDF.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.FIBTG != undefined) {
            $(".fiber").text(response.totalNutrients.FIBTG.quantity.toFixed(1) + "g");
            $(".fiberper").text(response.totalDaily.FIBTG.quantity.toFixed(1) + "%");
        }

        if (response.totalNutrients.SUGAR != undefined) {
            $(".sugars").text(response.totalNutrients.SUGAR.quantity.toFixed(1) + "g");
        }

        if (response.totalNutrients.PROCNT != undefined) {
            $(".protein").text(response.totalNutrients.PROCNT.quantity.toFixed(1) + "g");
        }
    });
})