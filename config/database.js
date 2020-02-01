var creds = require("../pass");

if (process.env.JAWSDB_URL) {
  module.exports = {
    connection: {
      host: "otmaa16c1i9nwrek.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      user: "abtnh66gjcndtnrs",
      password: "ynvbblsx6tesdaqn"
    },
    database: "v5v8pfxg8d42gz0h",
    users_table: "users"
  };
} else {
  module.exports = {
    connection: {
      host: "localhost",
      user: creds.user,
      password: creds.pass
    },
    database: "recipes_db",
    users_table: "users"
  };
}
