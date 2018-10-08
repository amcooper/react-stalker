"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
const sightingsController = __importStar(require("../controllers/sightings"));
const express = require("express");
const router = express.Router();
router.get("/sightings", sightingsController.index);
router.get("/sightings/:id", sightingsController.show);
router.post("/sightings", sightingsController.create);
router.put("/sightings/:id", sightingsController.update);
router.delete("/sightings/:id", sightingsController.destroy);
module.exports = router;
