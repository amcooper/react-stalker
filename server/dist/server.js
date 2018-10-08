"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT;
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes = __importStar(require("./app/routes/sightings"));
if (process.env.NODE_ENV !== "test") {
  app.use(morgan_1.default("combined"));
}
app.use(method_override_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(
  express_1.default.static(
    path_1.default.resolve(__dirname, "..", "client", "public")
  )
);
app.use("/api/v1", routes);
app.get("*", (request, response) => {
  response.sendFile(
    path_1.default.resolve(__dirname, "..", "client", "public", "index.html")
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
