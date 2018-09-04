
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sightings').del()
    .then(function () {
      // Inserts seed entries
      return knex('sightings').insert([
        {celebrity: 'Rowan Atkinson', stalker: 'Adam Cooper', date: '2018-03-21 11:59:59 -5:00', location: 'Brooklyn', comment: 'Mr. Bean!'},
        {celebrity: 'Allison Janney', stalker: 'Aretha Cooper', date: '2018-03-20 11:59:59 -5:00', location: 'Philadelphia', comment: 'Congrats.'},
        {celebrity: 'Mary J. Blige', stalker: 'Alan Cooper', date: '2018-03-2 11:59:59 -5:00', location: 'Baltimore', comment: 'Extra foam'}
      ]);
    });
};
