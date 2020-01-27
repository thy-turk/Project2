var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Profile.findAll({}).then(function(event) {
      res.render("index", {
        msg: "Welcome!",
        data: event
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Profile.findOne({ where: { id: req.params.id } }).then(function(event) {
      res.render("example", {
        data: event
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
