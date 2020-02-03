module.exports = function (sequelize, DataTypes) {
  
  var recipes = sequelize.define("recipes", {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeName: {
      type:  DataTypes.STRING,
      allowNull: false
    },
    recipeImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dietLabels: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthLabels: {
      type: DataTypes.STRING,
      allowNull: false
    },
    warningLabels: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredientLines: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yield: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return recipes;
};