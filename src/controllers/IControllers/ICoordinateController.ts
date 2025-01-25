import { Request, Response } from "express";

export interface ICoordinateController {
  create(request: Request, response: Response): Promise<Response>;
  listAll(request: Request, response: Response): Promise<Response>;
}
