module.exports = (sequelize, DataType) => sequelize.define('Books', {
  id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
  description: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
});
