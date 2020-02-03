

$("#cookies").on("click", function() {
    function createCookie(key, value) {
        let cookie = escape(key) + "=" + escape(value) + ";";
        document.cookie = cookie;
        console.log(cookie);
        console.log("Creating new cookie with key: " + key + " value: " + value);
    }
    var cookiecal = $("#cookcal").val().trim();
    console.log(cookiecal)
    createCookie("calories", parseInt(cookiecal) + parseInt(readCookie("calories")));
    createCookie("protein", "vanilla");
    // createCookie("calories", );
    
    function readCookie(name) {
    	let key = name + "=";
    	let cookies = document.cookie.split(';');
    	for (let i = 0; i < cookies.length; i++) {
    		let cookie = cookies[i];
    		while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
    		if (cookie.indexOf(key) === 0) {
                return cookie.substring(key.length, cookie.length);
            }
    	}
    	return null;
    };

    console.log(readCookie("calories"))
})