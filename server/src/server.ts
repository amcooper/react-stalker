import express from "express";
const app = express();
import morgan from "morgan";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import errorHandler from "errorhandler";
import knex from "./config/database";
// import routes from "./app/routes/sightings";

interface Sighting {
  id: number,
  celebrity: string,
  stalker: string,
  location: string,
  date: Date,
  comment?: string
};

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "client", "public")));

// app.use("/api/v1", routes);
app.get("/api/v1/sightings", (request, response, next) => {
  return knex("sightings").orderBy("created_at", "desc")
  // .then((res: Sighting[]) => { return response.json(res); })
  .then((res: Sighting[]) => { 
    // console.log("What's happening here?", res);
    return response.json(res);
  })
  .catch((e: any) => next(e));
});

app.get("/api/v1/sightings/:id", (request, response, next) => {
  return knex("sightings")
  .returning("*")
  .where("id", request.params.id)
  .then((res: Sighting[]) => response.json(res[0]))
  .catch((e: any) => next(e));
});

app.post("/api/v1/sightings", (request, response, next) => {
  const data = request.body;
  if (!data.celebrity || !data.stalker || !data.location) {
    return response.status(422).json({msg: "The celebrity, stalker, and location fields may not be blank. The record was not saved."});
  } else {
    return knex("sightings")
      .returning("*")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .then((res: Sighting[]) => response.json(res[0]))
      .catch((e: any) => next(e));
  }  
});

app.put("/api/v1/sightings/:id", (request, response, next) => {
  const data = request.body;
  const dataValuesArray = Object.values(data);
  if (dataValuesArray.map(value => Boolean(value)).includes(false)) {
    return response.status(422).json({msg: "The celebrity, stalker, location, and date fields may not be blank. The record was not updated."});
  } else if (data.id) {
    return response.status(422).json({msg: "Database record id's are unique and cannot be changed. The record was not updated."});
  } else {
    return knex("sightings")
      .returning("*")
      .where("id", request.params.id)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .then((res: Sighting[]) => response.json(res[0]))
      .catch((e: any) => next(e));
  }
});

app.delete("/api/v1/sightings/:id", (request, response, next) => {
  return knex("sightings")
  .returning("*")
  .where("id", request.params.id)
  .del()
  .then((res: Sighting[]) => response.json(res[0]))
  .catch((e: any) => next(e));
});

app.get("*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "client", "public", "index.html")
  );
});

app.use(errorHandler());

export default app;