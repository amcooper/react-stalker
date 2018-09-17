const knex = require("../../config/database");

const index = () => knex("sightings").orderBy("created_at", "desc");

const show = id =>
  knex("sightings")
    .returning("*")
    .where("id", id);

const create = data =>
  knex("sightings")
    .returning("*")
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

const update = (id, data) =>
  knex("sightings")
    .returning("*")
    .where("id", id)
    .update({
      ...data,
      updated_at: new Date().toISOString()
    });

const destroy = id =>
  knex("sightings")
    .returning("*")
    .where("id", id)
    .del();

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
