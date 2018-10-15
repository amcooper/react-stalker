import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT;
import morgan from "morgan";
// import bodyParser from "body-parser";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import * as routes from "./app/routes/sightings";

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

export = app;
