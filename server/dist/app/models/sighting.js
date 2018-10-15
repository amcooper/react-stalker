"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const database_1 = __importDefault(require("../../config/database"));
class Sighting {}
const index = () =>
  database_1.default("sightings").orderBy("created_at", "desc");
const show = id =>
  database_1
    .default("sightings")
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
    return database_1
      .default("sightings")
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
    return database_1
      .default("sightings")
      .returning("*")
      .where("id", id)
      .update({
        ...data,
        updated_at: new Date().toISOString()
      });
  }
};
const destroy = id =>
  database_1
    .default("sightings")
    .returning("*")
    .where("id", id)
    .del();
module.exports = {
  Sighting,
  index,
  show,
  create,
  update,
  destroy
};
