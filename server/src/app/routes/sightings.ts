import * as sightingsController from "../controllers/sightings";
const express = require("express");
const router = express.Router();

router.get("/sightings", sightingsController.index);
router.get("/sightings/:id", sightingsController.show);
router.post("/sightings", sightingsController.create);
router.put("/sightings/:id", sightingsController.update);
router.delete("/sightings/:id", sightingsController.destroy);

export = router;
