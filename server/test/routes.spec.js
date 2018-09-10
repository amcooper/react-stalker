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
      expect( response.body[1] ).to.be.an( 'object' );
      expect( response.body[1].id ).to.be.a( 'number' );
      expect( response.body[1].celebrity ).to.be.a( 'string' );
      expect( response.body[1].celebrity ).to.equal( 'Allison Janney' );
      expect( response.body[1].stalker ).to.be.a( 'string' );
      expect( response.body[1].stalker ).to.equal( 'Aretha Cooper' );
      expect( response.body[1].date ).to.be.a( 'string' );
      // expect( response.body[1].date ).to.equal( Date(2018,3,21,11,59,59) );
      expect( response.body[1].location ).to.be.a( 'string' );
      expect( response.body[1].location ).to.equal( 'Philadelphia' );
      expect( response.body[1].comment ).to.be.a( 'string' );
      expect( response.body[1].comment ).to.equal( 'Congrats.' );
      expect( response.body[2] ).to.be.an( 'object' );
      expect( response.body[2].id ).to.be.a( 'number' );
      expect( response.body[2].celebrity ).to.be.a( 'string' );
      expect( response.body[2].celebrity ).to.equal( 'Mary J. Blige' );
      expect( response.body[2].stalker ).to.be.a( 'string' );
      expect( response.body[2].stalker ).to.equal( 'Alan Cooper' );
      expect( response.body[2].date ).to.be.a( 'string' );
      // expect( response.body[2].date ).to.equal( Date(2018,3,21,11,59,59) );
      expect( response.body[2].location ).to.be.a( 'string' );
      expect( response.body[2].location ).to.equal( 'Baltimore' );
      expect( response.body[2].comment ).to.be.a( 'string' );
      expect( response.body[2].comment ).to.equal( 'Extra foam' );
    });
  });

  describe( "GET /api/v1/sightings/1", function() {

    it( "should return the sighting whose id is 1", async () => {
      const response = await request( server ).get( "/api/v1/sightings/1" );
      expect( response.statusCode ).to.equal( 200 );
      expect( response.body ).to.be.an('object');
      expect( response.body.id ).to.be.a( 'number' );
      expect( response.body.celebrity ).to.be.a( 'string' );
      expect( response.body.celebrity ).to.equal( 'Rowan Atkinson' );
      expect( response.body.stalker ).to.be.a( 'string' );
      expect( response.body.stalker ).to.equal( 'Adam Cooper' );
      expect( response.body.date ).to.be.a( 'string' );
      // expect( response.body.date ).to.equal( Date(2018,3,21,11,59,59) );
      expect( response.body.location ).to.be.a( 'string' );
      expect( response.body.location ).to.equal( 'Brooklyn' );
      expect( response.body.comment ).to.be.a( 'string' );
      expect( response.body.comment ).to.equal( 'Mr. Bean!' );      
    });
  });

  describe( "POST /api/v1/sightings", function() {

    it( "should add a new sighting", async () => {});
  });

  describe( "PUT /api/v1/sightings/1", function() {

    it( "should change an existing sighting", async () => {});
  });

  describe( "DELETE /api/v1/sightings/1", function() {

    it( "should remove an existing sighting", async () => {});
  });
});
