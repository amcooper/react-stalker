// require("dotenv").config();
const path = require("path");

module.exports = {
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
