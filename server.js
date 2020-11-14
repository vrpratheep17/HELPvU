import express from "express";
import Auth from "./routes/auth.js";
import config from "./config/index.js";
import sequelize from "./config/db.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Db is connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/auth", Auth);

app.listen(config.PORT, () => {
  console.log(`port is running on server ${config.PORT}`);
});
