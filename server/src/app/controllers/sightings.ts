import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import knex from "../../config/database";

interface Sighting {
  id: number,
  celebrity: string,
  stalker: string,
  location: string,
  date: Date,
  comment?: string
};
    
const index = (request: Request, response: Response, next: NextFunction) =>
  knex("sightings").orderBy("created_at", "desc")
    .then((res: Sighting[]) => response.json(res))
    .catch((e: any) => next(e));
  
const show = (request: Request, response: Response, next: NextFunction) => 
  knex("sightings").where("id", request.params.id)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  
const create = (request: Request, response: Response, next: NextFunction) => {
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
}
  
const update = (request: Request, response: Response, next: NextFunction) => {
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
}
  
const destroy = (request: Request, response: Response, next: NextFunction) => 
  knex("sightings").returning("*").where("id", request.params.id).del()
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));

export default { index, show, create, update, destroy }