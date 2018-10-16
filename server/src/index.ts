import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import express from "express";
const app = express();
// const port = process.env.PORT;
import morgan from "morgan";
// import bodyParser from "body-parser";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import errorHandler from "errorhandler";
// import knex from "./config/database";
// import routes from "./app/routes/sightings";

interface Sighting {
  id: number,
  celebrity: string,
  stalker: string,
  location: string,
  date: Date,
  comment?: string
};

const knexfileData: any = {
  development: {
    client: "pg",
    connection: "postgres://localhost:5432/react_stalker",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds", "development")
    }
  },

  test: {
    client: "pg",
    connection: "postgres://localhost:5432/react_stalker_test",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds", "test")
    }
  },

  staging: {
    client: "pg",
    connection:
      process.env.DATABASE_URL || "postgres://localhost:5432/react_stalker",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds", "production")
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds", "production")
    }
  }
};

const database = knexfileData[process.env.NODE_ENV];
console.log("*****\n* ", process.env.NODE_ENV, database);
const knex = require("knex")(database);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
app.use(methodOverride());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "client", "public")));

// app.use("/api/v1", routes);
app.get("/sightings", (request, response, next) => {
  return knex("sightings").orderBy("created_at", "desc")
  // .then((res: Sighting[]) => { return response.json(res); })
  .then((res: Sighting[]) => { 
    console.log("What's happening here?", res);
    return response.send(res);
  })
  .catch((e: any) => next(e));
});

app.get("/sightings/:id", (request, response, next) => {
  return knex("sightings")
  .returning("*")
  .where("id", request.params.id)
  .then((res: Sighting[]) => response.json(res[0]))
  .catch((e: any) => next(e));
});

app.post("/sightings", (request, response, next) => {
  const data = request.body;
  if (!data.celebrity || !data.stalker || !data.location || !data.date) {
    return Promise.reject(
      new Error(
        "The celebrity, stalker, location, and date fields may not be blank. The record was not saved."
      )
    );
  } else {
    return knex("sightings")
      .returning("*")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
  }  
});

app.put("/sightings/:id", (request, response, next) => {
  const data = request.body;
  const dataValuesArray = Object.values(data);
  if (dataValuesArray.map(value => Boolean(value)).includes(false)) {
    return Promise.reject(
      new Error(
        "The celebrity, stalker, location, and date fields may not be blank. The record was not updated."
      )
    );
  } else if (data.id) {
    return Promise.reject(
      new Error(
        "Database record id's are unique and cannot be changed. The record was not updated."
      )
    );
  } else {
    return knex("sightings")
      .returning("*")
      .where("id", request.params.id)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      });
  }
});

app.delete("/sightings/:id", (request, response, next) => {
  return knex("sightings")
  .returning("*")
  .where("id", request.params.id)
  .del();
});

app.get("*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "client", "public", "index.html")
  );
});

app.use(errorHandler());

app.listen(port, () => {
  console.log(`A quokka is listening on port ${port}.`);
  console.log(`${process.env.NODE_ENV} - ${process.env.PORT}`);
});
