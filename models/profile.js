module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    username: DataTypes.STRING,
    bmr: DataTypes.INTEGER,
    user_weight: DataTypes.INTEGER,
    user_height: DataTypes.INTEGER,
    user_age: DataTypes.INTEGER,
    user_sex: DataTypes.STRING,
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Profile;
};

function BMR() {
  var bmrCalculation = ((Profile.user_weight)*10 + (Profile.user_height)*6.25 - (Profile.user_age)*5);
    if (Profile.user_sex == "m") {
      var bmr = (bmrCalculation + 5);
      console.log (bmr);
    }if (Profile.user_sex = "f") {
      var bmr = (bmrCalculation - 161);
      console.log(bmr);

    }
}
BMR ();

// module.exports = Profile;
