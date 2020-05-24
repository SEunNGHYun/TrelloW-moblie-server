module.exports = function (sequelize, DataTypes) {
  const container = sequelize.define('container', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  container.associate = function (models) {
    container.belongsTo(models.board, {
      foreignKey: 'boardId',
      targetKey: 'id',
      onDelete: 'cascade'
    });
    container.hasMany(models.card, {
      foreignKey: 'containerId',
      sourceKey: 'id'
    });
  };
  return container;
};