import express from "express";
import Auth from "../routes/auth/R_auth.js";
import config from "../config/index.js";
import sequelize from "../config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import bodyParser from "body-parser";
var path = require("path");

var fs = require("fs");

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/auth", Auth);

const swaggerDocs = require("../swagger/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", swaggerUi.serve);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection Sucessful. Starting Server.....");
    app.listen(config.PORT, () => {
      console.log(`server is running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app; // for testing
