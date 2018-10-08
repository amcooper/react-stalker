import sightingModel from "../models/sighting";
import express, { NextFunction } from "express";

const index = (request: Request, response: Response, next: NextFunction): RequestHandlerParams => {
  sightingModel
    .index()
    .then((res: Sighting[]) => { return response.json(res); })
    .catch(e => next(e));
};

const show = (request: Request, response: Response, next: NextFunction) => {
  sightingModel
    .show(request.params.id)
    .then(res => response.json(res[0]))
    .catch(e => next(e));
};

const create = (request: Request, response: Response, next: NextFunction) => {
  sightingModel
    .create(request.body)
    .then(res => response.json(res))
    .catch(e => next(e));
};

const update = (request: Request, response: Response, next: NextFunction) => {
  sightingModel
    .update(request.params.id, request.body)
    .then(res_save => response.json(res_save))
    .catch(e_save => next(e_save));
};

const destroy = (request: Request, response: Response, next: NextFunction) => {
  sightingModel
    .destroy(request.params.id)
    .then(res_destroy => response.json(res_destroy))
    .catch(e_save => next(e_save));
};

export = {
  index,
  show,
  create,
  update,
  destroy
};
