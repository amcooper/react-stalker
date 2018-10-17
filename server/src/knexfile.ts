// require("dotenv").config();
import path from "path";
// import * as client from "knex";
import client = require("knex");

interface KnexFile {
  development: client,
  test: client,
  staging: client,
  production: client,
  [key: string]: client
}

export const knexObject: KnexFile = {
  development: client({
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
  }),

  test: client({
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
  }),

  staging: client({
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
  }),

  production: client({
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
  })
};

