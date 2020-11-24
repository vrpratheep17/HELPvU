const dotenv = require("dotenv");
dotenv.config();

let setting = {
  PORT: process.env.PORT,
  db: {
    host: process.env.host,
    dialect: process.env.DBType,
    database: process.env.DBName,
    username: process.env.DBUser,
    password: process.env.DBPass,
  },
};

export default setting;
