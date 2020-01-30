module.exports = function(app, passport) {
  // Home page
  app.get("/", function(req, res) {
    res.render("index"); // load the index.ejs file
  });

  // Shows login form
  app.get("/login", function(req, res) {
    // If something is wrong with login it will flash message
    res.render("login", { message: req.flash("loginMessage") });
  });

  // Process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // if success redirect to profile
      failureRedirect: "/login", // if failure redirect to login again
      failureFlash: true // allow flash messages
    }),
    function(req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  // SIGNUP
  // Shows the signup form
  app.get("/signup", function(req, res) {
    // If something is wrong with signup it will flash message
    res.render("signup", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // if success redirect to profile
      failureRedirect: "/signup", // if failure redirect to signup again
      failureFlash: true // allow flash messages
    })
  );

  // PROFILE SECTION
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile", {
      user: req.user // gets user and passes to template
    });
  });

  // LOGOUT
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

function isLoggedIn(req, res, next) {
  // Will continue session if user is authed
  if (req.isAuthenticated()) return next();

  // Will redirect to homepage if not authed
  res.redirect("/");
}

// var db = require("../models");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Profile.findAll({}).then(function(event) {
//       res.render("index", {
//         msg: "Welcome!",
//         data: event
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Profile.findOne({ where: { id: req.params.id } }).then(function(event) {
//       res.render("example", {
//         data: event
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
