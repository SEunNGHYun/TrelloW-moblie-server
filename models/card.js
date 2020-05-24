module.exports = function (sequelize, DataTypes) {
  const card = sequelize.define('card', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    containerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
    contents: {
      type: DataTypes.STRING
    },
    ranking: {
      type: DataTypes.STRING
    }
  });
  card.associate = function (models) {
    card.belongsTo(models.container, {
      foreignKey: 'containerId',
      targetKey: 'id',
      onDelete: 'cascade'
    });
  };
  return card;
};