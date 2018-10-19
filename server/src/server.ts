import express from "express";
const app = express();
import morgan from "morgan";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import errorHandler from "errorhandler";
import routes from "./app/routes/sightings";

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

app.use(errorHandler());

export default app;