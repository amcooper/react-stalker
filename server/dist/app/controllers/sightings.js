"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const sighting_1 = __importDefault(require("../models/sighting"));
const index = (request, response, next) => {
  sighting_1.default
    .index()
    .then(res => response.json(res))
    .catch(e => next(e));
};
const show = (request, response, next) => {
  sighting_1.default
    .show(request.params.id)
    .then(res => response.json(res[0]))
    .catch(e => next(e));
};
const create = (request, response, next) => {
  sighting_1.default
    .create(request.body)
    .then(res => response.json(res))
    .catch(e => next(e));
};
const update = (request, response, next) => {
  sighting_1.default
    .update(request.params.id, request.body)
    .then(res_save => response.json(res_save))
    .catch(e_save => next(e_save));
};
const destroy = (request, response, next) => {
  sighting_1.default
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
