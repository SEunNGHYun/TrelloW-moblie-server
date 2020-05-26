module.exports = function (sequelize, DataTypes) {
  const board = sequelize.define('board', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visibility : {
      type : DataTypes.STRING,
      allowNull: false
    }
  });
  board.associate = function (models) {
    board.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'cascade'
    });
    board.hasMany(models.container, {
      foreignKey: 'boardId',
      sourceKey: 'id'
    });
  };
  return board;
};