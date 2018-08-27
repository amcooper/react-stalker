const Sighting = require( './models/sighting' );

module.exports = function( app ) {
	app.get( '/api/sightings', ( request, response, next ) => {
    console.log(process.env.DATABASE_URL);
		Sighting.fetchAll()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
	});

  app.get( '/api/sightings/:id', (request, response, next ) => {
    Sighting.where('id', request.params.id).fetch()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
  });

  app.post( '/api/sightings', ( request, response, next ) => {
    Sighting.forge( request.body )
      .save()
      .then( res => response.json( res ))
      .catch( e => console.error( e.stack ));
  });

  app.put( '/api/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch => 
        res_fetch.set( request.body )
        .save()
        .then( res_save => response.json( res_save ))
        .catch( e_save => console.error( e_save.stack ))
      )
      .catch( e_fetch => console.error( e_fetch.stack ));
  });

  app.delete( '/api/sightings/:id', ( request, response, next ) => {
    Sighting.where( 'id', request.params.id ).fetch()
      .then( res_fetch =>
        res_fetch.destroy()
        .then( res_destroy => response.json( res_destroy ))
        .catch( e_save => console.error( e_save.stack ))
      )
      .catch( e_fetch => console.error( e_fetch.stack ));
  });
};
