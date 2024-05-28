// server.js

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/Routers/Router");

const app = express();

app.use(bodyParser.json());

app.use("/", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
