import { Request, Response } from "express";
import * as services from "../services/players-service";
import { badRequest } from "../utils/http-helper";
import { StatisticsModel } from "../models/statistics-model";

export const getPlayer = async (req: Request, res: Response) => {
  const httpResponse = await services.getPlayerService();

  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const httpResponse = await services.getPlayerByIdService(id);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const postPlayer = async (req: Request, res: Response) => {
  const bodyValue = req.body;
  const httpResponse = await services.postPlayerService(bodyValue);

  if (!httpResponse) {
    const response = await badRequest();
    return res.status(response.statusCode).json(response.body);
  }

  res.status(httpResponse?.statusCode).json(httpResponse?.body);
};

export const updatePlayer = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const bodyValue: StatisticsModel = req.body;
  const httpResponse = await services.updatePlayerService(id, bodyValue);

  if (!httpResponse) {
    const response = await badRequest();
    return res.status(response.statusCode).json(response.body);
  }

  res.status(httpResponse.statusCode).json(httpResponse.body);
};

export const deletePlayer = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const httpResponse = await services.deletePlayerService(id);

  if (!httpResponse) {
    const response = await badRequest();
    return res.status(response.statusCode).json(response.body);
  }

  res.status(httpResponse?.statusCode).json(httpResponse?.body);
};
