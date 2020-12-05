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
  Access_token_secret: process.env.Access_token_secret,
  Refresh_token_secret: process.env.Refresh_token_secret,
  redis_port:process.env.redis_port,
  redis_host:process.env.redis_host,
  redis_password:process.env.redis_password
};

export default setting;


