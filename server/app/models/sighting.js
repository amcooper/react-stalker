const knex = require("../../config/database");

const index = () => knex("sightings");

const show = id =>
  knex("sightings")
    .returning("*")
    .where("id", id);

const create = data =>
  knex("sightings")
    .returning("*")
    .insert(data);

const update = (id, data) =>
  knex("sightings")
    .returning("*")
    .where("id", id)
    .update(data);

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
