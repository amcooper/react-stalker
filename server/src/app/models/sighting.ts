/// <reference path="../../../../node_modules/@types/knex/index.d.ts">

import knex from "../../config/database";
import Sighting from "../interfaces/sighting";

const index = () => knex("sightings").orderBy("created_at", "desc");

const show = (id: number) =>
  knex("sightings")
    .returning("*")
    .where("id", id);

const create = (data: Sighting): Promise<any>|knex.Knex.QueryBuilder<Sighting> => {
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

const update = (id: number, data: Sighting): Promise<any> | Knex.QueryBuilder<Sighting> => {
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

const destroy = (id: number) =>
  knex("sightings")
    .returning("*")
    .where("id", id)
    .del();

export /* let sightingModel = */ {
  index,
  show,
  create,
  update,
  destroy
};