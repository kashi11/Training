
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User",{
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  return User;
}