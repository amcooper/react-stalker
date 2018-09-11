<<<<<<< HEAD
require( 'dotenv' ).config();
// const database = require('./database');
console.log(process.env.NODE_ENV);
const database = require( '../knexfile' )[process.env.NODE_ENV];
console.log(database);
const knex = require('knex')(database);
console.log( knex );
module.exports = require('bookshelf')(knex);
=======
const database = require( '../knexfile' )[ process.env.NODE_ENV ];
const knex = require('knex')(database);
module.exports = require('bookshelf')(knex);
>>>>>>> d26ea815dcedf3423dd2ce244b2e413135b84c2b
