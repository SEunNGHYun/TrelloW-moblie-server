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
      type: DataTypes.STRING,
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: true
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lable : { 
      type: DataTypes.STRING, 
      allowNull: true 
    }
  });
  card.associate = function (models) {
    card.belongsTo(models.container, {
      foreignKey: 'containerId',
      targetKey: 'id',
      onDelete: 'cascade'
    });
    card.hasMany(models.checklist, {
      foreignKey: 'cardId',
      sourceKey:  'id'
    });
  };
  return card;
};