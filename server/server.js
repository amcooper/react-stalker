require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT; // || 3033;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const path = require("path");
const routes = require("./app/routes/sightings");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "client", "public")));

app.use("/api/v1", routes);

app.get("*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "client", "public", "index.html")
  );
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message,
    error: process.env.NODE_ENV === "development" ? error : {}
  });
  next();
});

app.use((request, response, next) => {
  if (!response.headersSent) {
    response.status(404).send("The requested resource was not found.");
  }
});

module.exports = app;
