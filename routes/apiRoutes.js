var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Profile.findAll({}).then(function(event) {
      res.json(event);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Profile.create(req.body).then(function(event) {
      res.json(event);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Profile.destroy({ where: { id: req.params.id } }).then(function(event) {
      res.json(event);
    });
  });
};
