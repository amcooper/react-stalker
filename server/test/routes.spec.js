process.env.NODE_ENV = "test";

const chai = require( "chai" );
const should = chai.should();
const chaiHTTP = require( "chai-http" );

const server = require( "../server" );

chai.use( chaiHTTP );

describe( "API routes", function() {
  describe( "GET /api/v1/sightings", function() {

    after( async function() {
      // debugger;
      server.removeAllListeners();
      server.close();
    });

    it( "should return all sightings", async function() {
      // console.log( process.env.NODE_ENV );
      const response = await chai
        .request( server )
        .get( "/api/v1/sightings" );
      console.log( `
        **************
        *
        *`, response.status, `
        * 
      `);
      response.should.have.status(200);
      // debugger;
    });
  });
});
