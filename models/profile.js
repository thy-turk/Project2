module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    username: DataTypes.STRING,
    bmr: DataTypes.INTEGER,
    user_weight: DataTypes.INTEGER,
    user_height: DataTypes.INTEGER,
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Profile;
};

// module.exports = Profile;
