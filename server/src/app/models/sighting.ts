import express from "express";
import knex from "../../config/database";
const router = express.Router();

interface Sighting {
    id: number,
    celebrity: string,
    stalker: string,
    location: string,
    date: Date,
    comment?: string
  };
    
router.get("/sightings", (request, response, next) => {
    return knex("sightings").orderBy("created_at", "desc")
    .then((res: Sighting[]) => { 
      return response.json(res);
    })
    .catch((e: any) => next(e));
  });
  
  router.get("/sightings/:id", (request, response, next) => {
    return knex("sightings")
    .returning("*")
    .where("id", request.params.id)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  });
  
router.post("/sightings", (request, response, next) => {
    const data = request.body;
    if (!data.celebrity || !data.stalker || !data.location) {
      return response.status(422).json({msg: "The celebrity, stalker, and location fields may not be blank. The record was not saved."});
    } else {
      return knex("sightings")
        .returning("*")
        .insert({
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .then((res: Sighting[]) => response.json(res[0]))
        .catch((e: any) => next(e));
    }  
  });
  
router.put("/sightings/:id", (request, response, next) => {
    const data = request.body;
    const dataValuesArray = Object.values(data);
    if (dataValuesArray.map(value => Boolean(value)).includes(false)) {
      return response.status(422).json({msg: "The celebrity, stalker, location, and date fields may not be blank. The record was not updated."});
    } else if (data.id) {
      return response.status(422).json({msg: "Database record id's are unique and cannot be changed. The record was not updated."});
    } else {
      return knex("sightings")
        .returning("*")
        .where("id", request.params.id)
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .then((res: Sighting[]) => response.json(res[0]))
        .catch((e: any) => next(e));
    }
  });
  
router.delete("/sightings/:id", (request, response, next) => {
    return knex("sightings")
    .returning("*")
    .where("id", request.params.id)
    .del()
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  });

export default router;