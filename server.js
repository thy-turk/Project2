var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");

// var db = require("./models");
require("./config/passport")(passport); // pass passport for configuration

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("config"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

app.use(express()); // read cookies (needed for auth)

// required for passport
app.use(
  session({
    secret: "keyboardcat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app, passport);

// Starting the server, syncing our models
// db.sequelize.sync(syncOptions).then(function() {
app.listen(PORT, function() {
  console.log("Listening on port %s. http://localhost:%s/", PORT, PORT);
});
// });

module.exports = app;
