import fs from "fs";
import path from "path";
import sequelize from "../config/Database/Postgresql/PGsql";

var basename = path.basename(__filename);

// models export contains all models
var models = {};

// Sequelize models
var dirname = __dirname + "/sequelize";
fs.readdirSync(dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 &&
      (file !== basename) & (file.slice(-3) === ".js")
    );
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(dirname, file));
    models[model.name] = model;
  });
Object.keys(models).forEach(function (modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.users.hasMany(models.user_booking_history)
models.user_booking_history.belongsTo(models.users)

export default models;
