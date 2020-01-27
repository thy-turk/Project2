module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    username: Sequelize.STRING,
    bmr: Sequelize.INTEGER,
    user_weight: Sequelize.INTEGER,
    user_height: Sequelize.INTEGER,
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Profile;
};

module.exports = Profile;
