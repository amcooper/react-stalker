process.env.NODE_ENV = "test";

const chai = require( "chai" );
const should = chai.should();
const request = require( "supertest" );

const server = require( "../server" );
const knex = require( "../config/bookshelf" )["knex"];

describe( "API routes", function() {
  describe( "GET /api/v1/sightings", function() {
    after(function () {
      knex.destroy();
    });
    it( "should return all sightings", function( done ) {
      request( server )
        .get( "/api/v1/sightings" )
        .expect( 200, done );
    });
  });
});
