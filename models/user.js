module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  });
  user.associate = function (models) {
    user.hasMany(models.board, {
      foreignKey: 'userId',
      sourceKey: 'id' 
    });
  };
  return user;
};