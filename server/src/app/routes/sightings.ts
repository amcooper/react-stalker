import express from "express";
import knex from "../../config/database";
import sightingsController from "../controllers/sightings";
const router = express.Router();

interface Sighting {
  id: number;
  celebrity: string;
  stalker: string;
  location: string;
  date: Date;
  comment?: string;
}

router.get("/sightings", sightingsController.index);
router.get("/sightings/:id", sightingsController.show);
router.post("/sightings", sightingsController.create);
router.put("/sightings/:id", sightingsController.update);
router.delete("/sightings/:id", sightingsController.destroy);

export default router;