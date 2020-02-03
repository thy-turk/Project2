var LocalStrategy = require("passport-local").Strategy;

var mysql = require("mysql2");
var bcrypt = require("bcrypt-nodejs");
var dbconfig = require("./database");

var connection = mysql.createConnection(dbconfig.connection);

connection.query("USE " + dbconfig.database);

module.exports = function (passport) {
    // passport session setup
    // required for persistent login sessions

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
        console.log(user.id)
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        // connection.connect();
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
            done(err, id);
        });
    });

    // LOCAL SIGNUP 

    passport.use(
        "local-signup",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            fullNameField: "fullName",
            passReqToCallback: true // allows for req.flash
        },
            function (req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash("signupMessage", "That username is already taken."));
                    } else {
                        // checks to see if the user exists.
                        // If username isn"t taken creates account
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null),
                            fullName: "fullName"
                        };

                        var insertQuery = "INSERT INTO users ( username, password, fullName ) values (?,?,?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.fullName], function (err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    // LOCAL LOGIN 
    passport.use(
        "local-login",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true // allows use of req.flash
        },
            // callback using info from form
            function (req, username, password, done) {
                connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash("loginMessage", "No user found.")); // req.flash is the way to set flashdata using connect-flash
                    }

                    // Displays message if user is found but password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));

                    // Runs if login successful
                    return done(null, rows[0]);
                });
            })
    );
};