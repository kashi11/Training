
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo",{
    todo: DataTypes.STRING,
    todoId: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    userId: DataTypes.STRING,
    isDeleted: {type:DataTypes.BOOLEAN},
  })
  return Todo;
}
