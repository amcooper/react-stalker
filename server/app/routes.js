const Sighting = require( './models/sighting' );
const express = require( 'express' );
const router = express.Router();

	router.get( '/sightings', ( request, response, next ) => {
		Sighting.fetchAll()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
	});

  router.get( '/sightings/:id', (request, response, next ) => {
    Sighting.where('id', request.params.id).fetch()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
  });

  router.post( '/sightings', ( request, response, next ) => {
    Sighting.forge( request.body )
      .save()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
  });

  router.put( '/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch =>
        res_fetch.set( request.body )
        .save()
        .then( res_save => response.json( res_save ))
        // .catch( e_save => console.error( e_save.stack ))
				.catch( e_save => next( e_save ))
      )
      .catch( e_fetch => console.error( e_fetch.stack ));
  });

  router.delete( '/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch =>
        res_fetch.destroy()
        .then( res_destroy => response.json( res_destroy ))
        .catch( e_save => console.error( e_save.stack ))
      )
      .catch( e_fetch => console.error( e_fetch.stack ));
  });

module.exports = router;
