require( 'dotenv' ).config();
// const database = require('./database');
console.log(process.env.NODE_ENV);
const database = require( '../knexfile' )[process.env.NODE_ENV];
console.log(database);
const knex = require('knex')(database);
console.log( knex );
module.exports = require('bookshelf')(knex);