module.exports = function (sequelize, DataTypes) {
  
    var tracker = sequelize.define("tracker", {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      calories: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      fat: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      cholesterol: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      sodium: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      carbs: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      sugar: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
      protein: {
        type:  DataTypes.INTEGER,
        allowNull: true,
      },
    });
    return tracker;
  };