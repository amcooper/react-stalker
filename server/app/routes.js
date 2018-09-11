const Sighting = require( './models/sighting' );
const express = require( 'express' );
const router = express.Router();

	router.get( '/sightings', ( request, response, next ) => {
		Sighting.fetchAll()
      .then( res => response.json( res ))
      .catch( e => next( e ));
	});

  router.get( '/sightings/:id', (request, response, next ) => {
    Sighting.where('id', request.params.id).fetch()
      .then( res => response.json( res ))
      .catch( e => next( e ));
  });

  router.post( '/sightings', ( request, response, next ) => {
    Sighting.forge( request.body )
      .save()
      .then( res => response.json( res ))
      .catch( e => next( e ));
  });

  router.put( '/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch =>
        res_fetch.set( request.body )
        .save()
        .then( res_save => response.json( res_save ))
				.catch( e_save => next( e_save ))
      )
      .catch( e_fetch => next( e_fetch ));
  });

  router.delete( '/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch =>
        res_fetch.destroy()
        .then( res_destroy => response.json( res_destroy ))
        .catch( e_save => next( e_save ))
      )
      .catch( e_fetch => next( e_fetch ));
  });

module.exports = router;
