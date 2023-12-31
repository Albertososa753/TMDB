const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./config/db");
const routes = require("./routes");
const models = require("./model");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("Base de datos conectada.💻");
  app.listen(3001, () => {
    console.log("Escuchando en el puerto 3001 🚀");
  });
});
