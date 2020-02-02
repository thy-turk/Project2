module.exports = function (sequelize, DataTypes) {
  
  var recipes = sequelize.define("recipes", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeName: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    recipeImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeurl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return recipes;
};