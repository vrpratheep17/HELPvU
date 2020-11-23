import express from "express";
import Auth from "../routes/auth/auth.js";
import config from "../config/index.js";
import sequelize from "../config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
    },
  },
  apis: ["__filename/../routes/auth/auth.js"],
};

const swaggerSpec = swaggerJSDoc(options);

sequelize
  .authenticate()
  .then(() => {
    console.log("Db is connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/auth", Auth);
app.use("/", swaggerUi.serve);

app.get(
  "/",
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  })
);

app.listen(config.PORT, () => {
  console.log(`port is running on server ${config.PORT}`);
});

export default app; // for testing
