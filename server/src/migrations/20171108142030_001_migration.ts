import * as Knex from "knex";

const up = (knex: Knex) => {
  return knex.schema.createTableIfNotExists("sightings", table => {
    table.increments();
    table.string("celebrity");
    table.string("stalker");
    table.timestamp("date");
    table.string("location");
    table.string("comment");
    table.timestamps();
  });
};

const down = (knex: Knex) => {
  return knex.schema.dropTableIfExists("sightings");
};

export = ({up, down});
