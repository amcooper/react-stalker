const knex = require("../../config/database");

const index = () => knex("sightings").orderBy("created_at", "desc");

const show = id =>
  knex("sightings")
    .returning("*")
    .where("id", id);

const create = data => {
  if (!data.celebrity || !data.stalker || !data.location || !data.date) {
    return Promise.reject(
      new Error(
        "The celebrity, stalker, location, and date fields may not be blank. The record was not saved."
      )
    );
  } else {
    return knex("sightings")
      .returning("*")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
  }
};

const update = (id, data) => {
  const dataValuesArray = Object.values(data);
  if (dataValuesArray.map(value => Boolean(value)).includes(false)) {
    return Promise.reject(
      new Error(
        "The celebrity, stalker, location, and date fields may not be blank. The record was not updated."
      )
    );
  } else if (data.id) {
    return Promise.reject(
      new Error(
        "Database record id's are unique and cannot be changed. The record was not updated."
      )
    );
  } else {
    return knex("sightings")
      .returning("*")
      .where("id", id)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      });
  }
};

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
