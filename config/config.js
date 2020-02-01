var creds = require("../pass");

var config = {
  development: {
    username: creds.user,
    password: creds.pass,
    database: "recipes_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: creds.user,
    password: creds.pass,
    database: "recipes_db",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}

module.exports = config;