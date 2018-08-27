
exports.up = function(knex, Promise) {
  knex.schema.createTableIfNotExists( 'sightings', table => {
  	table.increments();
  	table.string( 'celebrity' );
  	table.string( 'stalker' );
  	table.timestamp( 'date' );
  	table.string( 'location' );
  	table.string( 'comment' );
  	table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('sightings');
};
