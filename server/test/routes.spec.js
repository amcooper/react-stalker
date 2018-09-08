process.env.NODE_ENV = "test";

const chai = require( "chai" );
const should = chai.should();
const chaiHTTP = require( "chai-http" );

const server = require( "../server" );

chai.use( chaiHTTP );

describe( "API routes", function() {
  describe( "GET /api/v1/sightings", function() {
    it( "should return all sightings", function( done ) {
      chai.request( server )
        .get( "/api/v1/sightings" )
        .end( function( error, response ) {
          response.should.have.status(200);
          done();
        });
    })
  })
})
