process.env.NODE_ENV = "test";

const { expect } = require( "chai" );
// const should = chai.should();
const request = require( "supertest" );

const server = require( "../server" );
const knex = require( "../config/bookshelf" )["knex"];

describe( "API routes", function() {
  beforeEach( function( done ) {
    knex.migrate.rollback().then( function() {
      knex.migrate.latest().then( function() {
        return knex.seed.run().then( function() {
          done();
        });
      });
    });
  });

  afterEach( function(done) {
    knex.migrate.rollback().then( function() {
      done();
    });
  });
  
  after( function (done) {
    knex.destroy(done);
  });

  describe( "GET /api/v1/sightings", function() {

    it( "should return all sightings", async () => {
      const response = await request( server ).get( "/api/v1/sightings" );
      expect( response.statusCode ).to.equal( 200 );
      expect( response.body ).to.be.an('array');
      expect( response.body[0] ).to.be.an( 'object' );
      expect( response.body[0].id ).to.be.a( 'number' );
      expect( response.body[0].celebrity ).to.be.a( 'string' );
      expect( response.body[0].celebrity ).to.equal( 'Rowan Atkinson' );
      expect( response.body[0].stalker ).to.be.a( 'string' );
      expect( response.body[0].stalker ).to.equal( 'Adam Cooper' );
      expect( response.body[0].date ).to.be.a( 'string' );
      // expect( response.body[0].date ).to.equal( Date(2018,3,21,11,59,59) );
      expect( response.body[0].location ).to.be.a( 'string' );
      expect( response.body[0].location ).to.equal( 'Brooklyn' );
      expect( response.body[0].comment ).to.be.a( 'string' );
      expect( response.body[0].comment ).to.equal( 'Mr. Bean!' );
    });
  });
});
