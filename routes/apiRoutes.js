var db = require("../models");
var mysql = require("mysql2");
var dbconfig = require("../config/database");
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function (app) {
  // // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Profile.findAll({}).then(function(event) {
  //     res.json(event);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   console.log(req.user)
  //   db.Profile.create({
  //     ...req.body,
  //     userID: req.user.id
  //   })
  //   .then(function(event) {
  //     res.json(event);
  //   });
  // });

  app.post("/api/addRecipe", function (req, res) {
    if (req.user === undefined) {
      console.log("Not signed in")
    } else {
      console.log("info recieved")
      db.recipes.create({
        ...req.body,
        userID: req.user
      }).then(function (event) {
        res.json(event);
      });
    }
  });

  app.get("/api/addRecipe", function (req, res) {
    db.recipes.findAll({
      where: {
        userID: req.user
      }
    }).then(function (event) {
      res.json(event);
    });
  });

  
  app.post("/api/tracker", function (req, res) {
    if (req.user === undefined) {
      console.log("Not signed in")
    } else {
      console.log("POST INFO TRACKER REC")
      db.tracker.create({
        ...req.body,
        userID: req.user
      }).then(function (event) {
        res.json(event);
      });
    }
  });
  
  app.put("/api/tracker", function (req, res) {
    console.log("Tracker info recieved");
    db.tracker.update(req.body,
      {
        where: {
          userID: req.user
        }
      }).then(function (event) {
        res.json(event);
      });
  });

  app.get("/api/tracker", function (req, res) {
    db.tracker.findAll({
      where: {
        userID: req.user
      }
    }).then(function (event) {
      res.json(event);
    })
  })




  // db.recipes.create(req.body).then(function(event) {
  //   res.json(event);
  // })
  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Profile.destroy({ where: { id: req.params.id } }).then(function (event) {
      res.json(event);
    });
  });
};
