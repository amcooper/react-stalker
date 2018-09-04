// Update with your config settings.
require( 'dotenv' ).load();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/react_stalker',
    // connection: {
    //   database: 'react_stalker',
    //   user:     'adamcooper',
    //   // password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/react_stalker',
    // connection: {
    //   database: 'react_stalker',
    //   user:     'adamcooper',
    //   // password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/react_stalker',
    // connection: {
    //   database: 'react_stalker',
    //   user:     'adamcooper',
    //   // password: 'password'
    // },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
