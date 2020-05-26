module.exports = function (sequelize, DataTypes) {
    const checklist = sequelize.define('checklist', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      check: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    });
    checklist.associate = function (models) {
        checklist.belongsTo(models.card, {
            foreignKey: 'cardId',
            targetKey: 'id',
            onDelete: 'cascade'
        });
    };
    return checklist;
  };