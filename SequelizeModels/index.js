const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize("testRun","root","12345678",
  {
    host: "localHost",
    dialect: "mysql",
    port: 3301,
    pool: {
      max: 400,
      min: 1,
    },
});

const db = {}

db.DataTypes = DataTypes;
db.sequelize = sequelize;
db.User = require("./User")(sequelize, DataTypes);
db.Todo = require("./Todo")(sequelize, DataTypes);
module.exports = db;