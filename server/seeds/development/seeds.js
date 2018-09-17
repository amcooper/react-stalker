exports.seed = function(knex, Promise) {
  return knex("sightings")
    .del()
    .then(function() {
      return knex("sightings").insert([
        {
          celebrity: "Rowan Atkinson",
          stalker: "Adam Cooper",
          date: "2018-03-21 11:59:59 -5:00",
          location: "Brooklyn",
          comment: "Mr. Bean!",
          created_at: "2018-03-21 11:59:59 -5:00",
          updated_at: "2018-03-21 11:59:59 -5:00"
        },
        {
          celebrity: "Allison Janney",
          stalker: "Aretha Cooper",
          date: "2018-03-20 11:59:59 -5:00",
          location: "Philadelphia",
          comment: "Congrats.",
          created_at: "2018-03-24 11:59:59 -5:00",
          updated_at: "2018-03-24 11:59:59 -5:00"
        },
        {
          celebrity: "Mary J. Blige",
          stalker: "Alan Cooper",
          date: "2018-03-2 11:59:59 -5:00",
          location: "Baltimore",
          comment: "Extra foam",
          created_at: "2018-03-27 11:59:59 -5:00",
          updated_at: "2018-03-27 11:59:59 -5:00"
        }
      ]);
    });
};
