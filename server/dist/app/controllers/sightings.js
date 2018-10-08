const sightingModel = require("../models/sighting");
const express = require("express");
const index = (request, response, next) => {
  sightingModel
    .index()
    .then(res => response.json(res))
    .catch(e => next(e));
};
const show = (request, response, next) => {
  sightingModel
    .show(request.params.id)
    .then(res => response.json(res[0]))
    .catch(e => next(e));
};
const create = (request, response, next) => {
  sightingModel
    .create(request.body)
    .then(res => response.json(res))
    .catch(e => next(e));
};
const update = (request, response, next) => {
  sightingModel
    .update(request.params.id, request.body)
    .then(res_save => response.json(res_save))
    .catch(e_save => next(e_save));
};
const destroy = (request, response, next) => {
  sightingModel
    .destroy(request.params.id)
    .then(res_destroy => response.json(res_destroy))
    .catch(e_save => next(e_save));
};
module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
