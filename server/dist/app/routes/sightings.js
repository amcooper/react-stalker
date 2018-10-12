"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const sightings_1 = __importDefault(require("../controllers/sightings"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/sightings", sightings_1.default.index);
router.get("/sightings/:id", sightings_1.default.show);
router.post("/sightings", sightings_1.default.create);
router.put("/sightings/:id", sightings_1.default.update);
router.delete("/sightings/:id", sightings_1.default.destroy);
module.exports = router;
