process.env.NODE_ENV = "test";

const { expect } = require( "chai" );
// const should = chai.should();
const request = require( "supertest" );

const server = require( "../server" );
const knex = require( "../config/bookshelf" )["knex"];

describe( "API routes", function() {
  describe( "GET /api/v1/sightings", function() {

    after( function (done) {
      knex.destroy(done);
    });

    it( "should return all sightings", async () => {
      const response = await request( server ).get( "/api/v1/sightings" );
      expect( response.statusCode ).to.equal( 200 );
      expect( response.body ).to.be.an('array');
      expect( response.body[0] ).to.be.an( 'object' );
      expect( response.body[0].id ).to.be.a( 'number' );
      expect( response.body[0].celebrity ).to.be.a( 'string' );
      expect( response.body[0].celebrity ).to.equal( 'Rowan Atkinson' );
      
    });
  });
});
