require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3033;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require("./app/routes");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1", routes);

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message,
    error: process.env.NODE_ENV === "development" ? error : {}
  });
  next();
});

app.use((request, response, next) => {
  response.status(404).send("The requested resource was not found.");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`A quokka is listening on port ${port}.`);
    console.log(`${process.env.NODE_ENV} - ${process.env.PORT}`);
  });
}

module.exports = app;
