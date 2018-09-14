const sightingModel = require("./models/sighting");
const express = require("express");
const router = express.Router();

router.get("/sightings", (request, response, next) => {
  sightingModel
    .index()
    .then(res => response.json(res))
    .catch(e => next(e));
});

router.get("/sightings/:id", (request, response, next) => {
  sightingModel
    .show(request.params.id)
    .then(res => response.json(res[0]))
    .catch(e => next(e));
});

router.post("/sightings", (request, response, next) => {
  sightingModel
    .create(request.body)
    .then(res => response.json(res))
    .catch(e => next(e));
});

router.put("/sightings/:id", (request, response, next) => {
  sightingModel
    .update(request.params.id, request.body)
    .then(res_save => response.json(res_save))
    .catch(e_save => next(e_save));
});

router.delete("/sightings/:id", (request, response, next) => {
  sightingModel
    .destroy(request.params.id)
    .then(res_destroy => response.json(res_destroy))
    .catch(e_save => next(e_save));
});

module.exports = router;
