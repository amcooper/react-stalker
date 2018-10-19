import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import sightingModel, { Sighting } from "../models/sighting";
    
const index = (request: Request, response: Response, next: NextFunction) =>
  sightingModel.index()
    .then((res: Sighting[]) => { return response.json(res); })
    .catch((e: any) => next(e));
  
const show = (request: Request, response: Response, next: NextFunction) => 
  sightingModel.show(request.params.id)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  
const create = (request: Request, response: Response, next: NextFunction) => 
  sightingModel.create(request.body)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  
const update = (request: Request, response: Response, next: NextFunction) => 
  sightingModel.update(request.params.id, request.body)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));
  
const destroy = (request: Request, response: Response, next: NextFunction) => 
  sightingModel.destroy(request.params.id)
    .then((res: Sighting[]) => response.json(res[0]))
    .catch((e: any) => next(e));

export default {index, show, create, update, destroy};